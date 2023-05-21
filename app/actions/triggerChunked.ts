import { pusherServer } from '@/app/libs/pusher'

export async function triggerChunked(channel: any, event: any, data: any) {
  const chunkSize = 9000 // artificially small! Set it to more like 9000

  const str = JSON.stringify(data)
  const msgId = Math.random() + ''
  for (var i = 0; i * chunkSize < str.length; i++) {
    const startIndex = i * chunkSize // Índice de início do chunk
    // TODO: use pusher.triggerBatch for better performance
    await pusherServer.trigger(channel, 'chunked-' + event, {
      id: msgId,
      index: i,
      chunk: str.slice(startIndex, startIndex + chunkSize),
      final: chunkSize * (i + 1) >= str.length,
    })
  }
}
