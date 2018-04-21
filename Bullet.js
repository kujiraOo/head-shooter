const uuid = require('uuid/v1')

class Bullet {
  constructor(x, y, damage, speed, direction, socket) {
    console.log(x)

    this.speed = speed
    this.radius = 5
    this.damage = damage
    this.direction = direction
    this.x = x
    this.y = y
    this.socket = socket
    this.destroyed = false
    this.maxLifeTime = 1000
    this.lifeTime = 0
    this.id = uuid()
  }

  update() {
    if (!this.destroyed) {

      console.log(this.x, this.y)
      this.y += this.speed * this.direction

      // console.log(this.x)

      this.socket.emit('bulletUpdate', {x: this.x, y: this.y, id: this.id})
      this.socket.broadcast.emit('enemyBulletUpdate', {x: this.x, y: this.y, id: this.id})

      this.lifeTime++

      if (this.lifeTime >= this.maxLifeTime) {
        this.destroyed = true

        this.socket.emit('bulletDestroyed', {id: this.id})
        this.socket.broadcast.emit('enemyBulletDestroyed', {id: this.id})

        console.log('Bullet life time expired, destroying')
      }
    }
  }
}

module.exports = Bullet
