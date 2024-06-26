// eslint-disable-next-line no-restricted-imports
import * as amplitude from '@amplitude/analytics-browser'
import { ENV, ENV_CONFIG } from 'common/envs/constants'
import { db } from 'web/lib/supabase/db'
import { removeUndefinedProps } from 'common/util/object'
import { getIsNative } from '../native/is-native'
import { run, SupabaseClient } from 'common/supabase/utils'
import { Json } from 'common/supabase/schema'

amplitude.init(ENV_CONFIG.amplitudeApiKey, undefined)

type EventIds = {
  contractId?: string | null
  commentId?: string | null
  adId?: string | null
}

type EventData = Record<string, Json | undefined>

export async function track(name: string, properties?: EventIds & EventData) {
  const deviceId = amplitude.getDeviceId()
  const sessionId = amplitude.getSessionId()
  const userId = amplitude.getUserId()
  const isNative = getIsNative()

  // mqp: did you know typescript can't type `const x = { a: b, ...c }` correctly?
  // see https://github.com/microsoft/TypeScript/issues/27273
  const allProperties = Object.assign(properties ?? {}, {
    isNative,
    deviceId,
    sessionId,
  })

  const { contractId, adId, commentId, ...data } = allProperties
  try {
    if (ENV !== 'PROD') {
      console.log(name, userId, allProperties)
      await insertUserEvent(name, data, db, userId, contractId, commentId, adId)
      return
    }
    await Promise.all([
      amplitude.track(name, removeUndefinedProps(allProperties)).promise,
      insertUserEvent(name, data, db, userId, contractId, commentId, adId),
    ])
  } catch (e) {
    console.log('error tracking event:', e)
  }
}

// Convenience functions:

export const trackCallback =
  (eventName: string, eventProperties?: any) => () => {
    track(eventName, eventProperties)
  }

export const withTracking =
  (
    f: (() => void) | (() => Promise<void>),
    eventName: string,
    eventProperties?: any
  ) =>
  async () => {
    const promise = f()
    track(eventName, eventProperties)
    await promise
  }

export function identifyUser(userId: string | null) {
  if (userId) {
    amplitude.setUserId(userId)
  } else {
    amplitude.setUserId(null as any)
  }
}

export async function setUserProperty(property: string, value: string) {
  const identifyObj = new amplitude.Identify()
  identifyObj.set(property, value)
  await amplitude.identify(identifyObj).promise
}

export async function setOnceUserProperty(property: string, value: string) {
  const identifyObj = new amplitude.Identify()
  identifyObj.setOnce(property, value)
  await amplitude.identify(identifyObj).promise
}

function insertUserEvent(
  name: string,
  data: EventData,
  db: SupabaseClient,
  userId?: string | null,
  contractId?: string | null,
  commentId?: string | null,
  adId?: string | null
) {
 if (
    (name === 'click market card feed' ||
      name === 'click market card welcome topic section' ||
      name === 'bet' ||
      name === 'copy market link' ||
      name === 'comment' ||
      name === 'repost' ||
      name === 'like') &&
    contractId
  ) {
    const feedReason = data?.feedReason as string
    const isCardClick = name.includes('click market card')
    const kind =
      name === 'copy market link'
        ? 'page share'
        : name === 'like' && feedReason
        ? 'card like'
        : name === 'like'
        ? 'page like'
        : name === 'comment'
        ? 'page comment'
        : name === 'repost'
        ? 'page repost'
        : !!data?.isPromoted && isCardClick
        ? 'promoted click'
        : isCardClick
        ? 'card click'
        : data?.location === 'feed card' ||
          data?.location === 'feed' ||
          !!feedReason
        ? 'card bet'
        : 'page bet'
  }
  return run(
    db.from('user_events').insert({
      name,
      data: removeUndefinedProps(data) as Record<string, Json>,
      user_id: userId,
      contract_id: contractId,
      comment_id: commentId,
      ad_id: adId,
    })
  )
}
