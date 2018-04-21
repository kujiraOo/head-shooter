class Bullet {
  constructor(x, y, damage, speed, direction) {
    this.speed = speed
    this.radius = 5
    this.damage = damage
    this.direction = direction
    this.x = x
    this.y = y
  }

  update() {
    this.y += this.speed * this.direction
  }
}

module.exports = Bullet
