const Bullet = require('./Bullet')

class Player {
  constructor(socket, y, direction, id) {
    this.socket = socket
    this.shootRechargeTime = 20
    this.shootCooldown = 20
    this.radius = 20
    this.x = 30
    this.y = y
    this.bullets = []
    this.hp = 100
    this.direction = direction
    this.damage = 10
    this.bulletSpeed = 10
    this.id = id

    socket.emit('playerInitialized', id)

    socket.on('playerInputUpdate', ({x}) => {
      this.x = x

      this.socket.broadcast.emit('enemyInputUpdate', {x})
    })
  }

  update() {
    this.shoot()
    this.updateBullets()
    this.checkCollision()
  }

  updateBullets() {
    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i]

      bullet.update()
    }
  }

  shoot() {
    if (this.shootCooldown >= this.shootRechargeTime) {
      this.shootCooldown = 0

      const bullet = new Bullet(this.x, this.y, this.damage, this.bulletSpeed, this.direction, this.socket)

      this.bullets.push(bullet)

      console.log("Player shoots")

      this.socket.broadcast.emit('enemyBulletInstantiated', {x: bullet.x, y: bullet.y, id: bullet.id})
      this.socket.emit('bulletInstantiated', {x: bullet.x, y: bullet.y, id: bullet.id})
    } else {
      this.shootCooldown++
    }
  }

  hit(damage) {
    this.hp -= damage

    this.socket.emit('hit', {hp: this.hp})
    this.socket.broadcast.emit('enemyHit', {hp: this.hp})

    console.log(this.hp)

    if (this.hp <= 0) {
      this.socket.emit('playerDead')
      this.socket.broadcast.emit('enemyDead')

      console.log('Player dead')
    }
  }

  checkCollision() {
    if (this.enemy) {
      for (let i = 0; i < this.enemy.bullets.length; i++) {
        const enemyBullet = this.enemy.bullets[i]

        const dx = this.x - enemyBullet.x
        const dy = this.y - enemyBullet.y

        console.log(Math.sqrt(dx * dx + dy * dy), this.radius)

        if (Math.sqrt(dx * dx + dy * dy) < this.radius) {
          this.hit(enemyBullet.damage)

          this.enemy.bullets.splice(i, 1)

          enemyBullet.destroyed = true

          this.socket.emit('bulletDestroyed')
          this.socket.broadcast.emit('enemyBulletDestroyed')
        }
      }
    }
  }
}

module.exports = Player
