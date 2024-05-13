import {
  ChannelOptions,
  useChannel,
} from 'web/lib/supabase/realtime/use-channel'

type BroadcastPayload = { [k: string]: any }
type BroadcastMessage = { event: string; payload: BroadcastPayload }
type BroadcastOptions = ChannelOptions & {
  onMessage: (message: BroadcastMessage) => void
}

export function useBroadcast(channelId: string, opts: BroadcastOptions) {
  const { onEnabled, onMessage, ...rest } = opts
  const channel = useChannel(channelId, {
    onEnabled: (chan) => {
      for (const event of Object.keys(onMessage)) {
        chan.on('broadcast', { event }, (response: any) => {
          onMessage(response.payload)
        })
      }
      onEnabled?.(chan)
    },
    ...rest,
  })
  return channel
}
