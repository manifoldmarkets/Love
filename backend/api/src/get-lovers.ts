import { type APIHandler } from 'api/helpers/endpoint'
import { createSupabaseDirectClient } from 'shared/supabase/init'
import { convertRow } from 'shared/love/supabase'

export const getLovers: APIHandler<'get-lovers'> = async (_props, _auth) => {
  const pg = createSupabaseDirectClient()

  const lovers = await pg.map(
    `select lovers.*, name, username, users.data as user
    from lovers
    join users on users.id = lovers.user_id
    where
      looking_for_matches = true
      and pinned_url is not null
      and (data->>'isBannedFromPosting' != 'true' or data->>'isBannedFromPosting' is null)
    order by created_time desc
    `,
    [],
    convertRow
  )

  return {
    status: 'success',
    lovers: lovers,
  }
}
