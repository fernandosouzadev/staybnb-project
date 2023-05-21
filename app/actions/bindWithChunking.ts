export function bindWithChunking(channel: any, event: any, callback: any) {
  channel.bind(event, callback)

  var events: any = {}

  channel.bind('chunked-' + event, (data: any) => {
    if (!events.hasOwnProperty(data.id)) {
      events[data.id] = { chunks: [], receivedFinal: false }
    }
    var ev = events[data.id]
    ev.chunks[data.index] = data.chunk
    if (data.final) ev.receivedFinal = true
    if (
      ev.receivedFinal &&
      ev.chunks.length === Object.keys(ev.chunks).length
    ) {
      callback(JSON.parse(ev.chunks.join('')))
      delete events[data.id]
    }
  })
}
