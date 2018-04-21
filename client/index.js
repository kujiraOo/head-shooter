console.log('ok')


console.log(io)

const socket = io()

socket.on('connect', () => {
  console.log('connected')

  socket.emit('playerInputUpdate', {x: 0})
})
