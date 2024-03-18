class Zombie {
  constructor(game, y) {
    this.game = game;
    this.sw = 92
    this.sh = 138
    this.ratio = 0.75
    this.width = this.sw * this.ratio
    this.height = this.sh * this.ratio
    this.x = this.game.width
    this.y = 100 + y * 90
    this.img = document.querySelector('img[src="design/source/Zombie.png"]')
    this.frameX = 0
    this.frameY = 0
    this.totalFrame = 33
    this.animationTimer = 0
    this.animationInterval = 50
    this.speed = 0.02
    this.health = 5
    this.attackTimer = 0;
    this.attackCooldown = 800;
    this.slow = false
    this.slowTimer = 0
    this.slowCooldown = 1500
  }
  draw() {
    if (this.x < -this.width) {
      this.game.gameOver = true
    }
    if (this.slow) {
      this.speed = 0.01
      this.animationInterval = 70
    }
    else {
      this.speed = 0.02
      this.animationInterval = 50
    }
    this.game.grass.forEach(((plant, i) => {
      if (this.game.checkCollide(this, plant, 0.75) && plant.active) {
        this.speed = 0
        if (this.attackTimer > this.attackCooldown) {
          this.game.grass[i].active.health -= 1
          this.attackTimer = 0
        } else {
          this.attackTimer += this.game.deltaTime
        }

        if (plant.active.health <= 0) {
          this.game.grass[i].active = false
          this.speed = 0.02
        }
      }
    }))
    if (this.animationTimer > this.animationInterval) {
      this.frameX++
      this.animationTimer = 0;
      if (this.frameX > this.totalFrame) this.frameX = 0
    } else {
      this.animationTimer += this.game.deltaTime
    }
    if (this.slowTimer > this.slowCooldown) {
      this.slowTimer = 0;
      this.slow = false
    } else {
      this.slowTimer += this.game.deltaTime
    }
    this.x -= this.speed * this.game.deltaTime
    this.game.ctx.drawImage(this.img, this.frameX * this.sw, this.frameY * this.sh, this.sw, this.sh, this.x, this.y, this.width, this.height)
    this.game.ctx.fillStyle = 'red'
    this.game.ctx.textBaseLine = 'bottom'
    if (this.slow) {
      this.game.ctx.fillStyle = 'blue'
      this.game.ctx.save()
      this.game.ctx.globalAlpha = 0.3
      this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
      this.game.ctx.restore()
    }
    this.game.ctx.fillText(this.health * 10, this.x + this.width / 2, this.y + this.height)
  }
}