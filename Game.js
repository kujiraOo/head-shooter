const Player = require('./Player')

class Game {
  constructor(io) {

    this.io = io

    this.handlePlayerConnection()

    setInterval(() => {
      this.update()
    }, 1000/30)

    console.log('Game')
  }

  handlePlayerConnection() {
    this.io.on('connection', (socket) => {
      if (!this.player1) {
        this.player1 = new Player(socket, 55, 1, 1)

        console.log('Player 1 connected', socket.id)
      } else if (!this.player2) {
        this.player2 = new Player(socket, 500 - 55, -1, 2)

        console.log('Player 2 connected', socket.id)
      }

      if (this.player2) {
        this.player2.enemy = this.player1
      }

      if (this.player1) {
        this.player1.enemy = this.player2
      }

      socket.on('disconnect', () => {
        console.log('disc socket', socket.id)
        console.log('player1', this.player1 && this.player1.socket.id)
        console.log('player2', this.player2 && this.player2.socket.id)

        if (this.player1 && this.player1.socket.id === socket.id) {
          this.player1 = null
          console.log('Player 1 disconnected')
        } else if (this.player2 && this.player2.socket.id === socket.id) {
          this.player2 = null
          console.log('Player 2 disconnected')
        }
      })
    })
  }

  update() {
    if (this.player1) {
      this.player1.update()
    }

    if (this.player2) {
      this.player2.update()
    }
  }
}

module.exports = Game
