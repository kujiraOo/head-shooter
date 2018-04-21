const Bullet = require('./Bullet')

class Player {
  constructor(socket, y, enemy, direction) {
    this.socket = socket
    this.shootRechargeTime = 10
    this.shootCooldown = 10
    this.radius = 20
    this.y = y
    this.bullets = []
    this.hp = 100
    this.enemy = enemy
    this.direction = direction
    this.damage = 10
    this.bulletSpeed = 10

    socket.on('playerInputUpdate', ({x}) => {
      this.x = x

      socket.broadcast('enemyInputUpdate', {x})
    })
  }

  update() {
    this.shoot()
    this.updateBullets()
    this.checkCollision()
  }

  updateBullets() {
    for (let i = 0; i < this.bullets; i++) {
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

      socket.emit('enemyBulletInstantiated', bullet)
    } else {
      this.shootCooldown++
    }
  }

  hit(damage) {
    this.hp -= damage

    if (this.hp <= 0) {
      this.socket.emit('playerDead')
      this.socket.broadcast('enemyDead')

      console.log('Player dead')
    }
  }

  checkCollision() {
    if (this.enemy) {
      for (let i = 0; i < this.enemy.bullets.length; i++) {
        const enemyBullet = this.enemy.bullets[i]

        const dx = this.x - enemyBullet.y
        const dy = this.y = enemyBullet.y

        if (Math.sqrt(dx * dx + dy * dy) < (enemyBullet.radius * enemyBullet.radius + this.radius * this.radius)) {
          this.hit(enemyBullet.damage)

          this.enemy.bullets.splice(i, 1)

          enemyBullet.destroyed = true

          this.socket.emit('bulletDestroyed')
          this.socket.broadcast('enemyBulletDestroyed')
        }
      }
    }
  }
}

module.exports = Player
