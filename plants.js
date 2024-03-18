class Projectile {
  constructor(game, x, y, attributes) {
    this.game = game
    this.img = document.querySelector(`img[src="design/source/General/${attributes.name}.png"]`)
    this.ratio = 0.5
    this.x = x
    this.y = y
    this.width = this.img.width * this.ratio
    this.height = this.img.height * this.ratio
    this.speed = 0.25
    this.damage = attributes.damage
    this.die = false
  }
  draw() {
    if (!this.die) {
      this.game.zombies.forEach((zombie, i) => {
        if (!this.die && this.game.checkCollide(this, zombie)) {
          this.game.zombies[i].health -= this.damage
          this.die = true
          if (this.game.zombies[i].health <= 0) {
            this.game.zombies.splice(i, 1)
            this.game.score++
          }
        }
      })
      this.x += this.speed * this.game.deltaTime
      this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
  }
}
class Plant {
  constructor(game, parent, index) {
    const data = [
      {
        name: 'SunFlower',
        health: 3,
        totalFrames: 24,
        frameInterval: 60,
        projectile: null
      },
      {
        name: 'WallNut',
        health: 5,
        totalFrames: 33,
        projectile: null
      },
      {
        name: 'PeaShooter',
        health: 3,
        sw: 124,
        sh: 133,
        totalFrames: 31,
        projectile: {
          name: 'Pea',
          damage: 1
        }
      },
      {
        name: 'IcePea',
        health: 3,
        totalFrames: 30,
        projectile: {
          name: 'IcePea',
          damage: 0.75
        }
      }
    ]
    this.game = game
    this.parent = parent
    this.x = this.parent.x
    this.y = this.parent.y
    this.width = this.parent.width
    this.height = this.parent.height
    this.health = data[index].health
    this.img = document.querySelector(`img[src='design/source/${data[index].name}.png']`)
    this.sw = data[index]?.sw || 125
    this.sh = data[index]?.sh || 135
    this.frame = 0;
    this.totalFrames = data[index].totalFrames
    this.animationTimer = 0;
    this.animationInterval = data[index]?.frameInterval || 100;
    this.attackTimer = 0;
    this.attackInterval = 1500
    this.projectile = data[index]?.projectile || null
    this.attack = false
    this.index = index
  }
  draw() {
    if (this.animationTimer > this.animationInterval) {
      this.frame++
      this.animationTimer = 0;
      if (this.frame >= this.totalFrames) this.frame = 0
    } else {
      this.animationTimer += this.game.deltaTime
    }
    if (this.projectile) {
      this.attack = false
      this.game.zombies.forEach((zombie) => {
        if (zombie.y < this.y + this.height * 0.75 && zombie.height * 0.75 + zombie.y > this.y && zombie.x < this.game.width - zombie.width / 2) {
          this.attack = true
        }
      })
      if (this.attack && this.attackTimer > this.attackInterval) {
        this.attackTimer = 0
        this.game.projectiles.push(new Projectile(this.game, this.x + this.width * 0.75, this.y + this.height / 8, this.projectile))
      } else this.attackTimer += this.game.deltaTime
    }
    if (this.index == 0) {
      if (this.attackTimer > 10000) {
        this.attackTimer = 0
        this.game.suns.push(new Sun(this.game, this.x, this.y, 50))
      } else this.attackTimer += this.game.deltaTime
    }

    this.game.ctx.drawImage(this.img, this.frame * this.sw, 0, this.sw, this.sh, this.x, this.y, this.width, this.height)
    this.game.ctx.fillStyle = 'red'
    this.game.ctx.textAlign = 'center'
    this.game.ctx.textBaseLine = 'bottom'
    this.game.ctx.fillText(this.health * 10, this.x + this.width / 2, this.y + this.height)
  }
}