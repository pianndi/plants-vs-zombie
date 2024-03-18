class Seed {
  constructor(game, x, y, i) {
    const data = [
      {
        name: 'SunFlower',
        health: 3,
        cost: 50,
        projectile: null
      },
      {
        name: 'WallNut',
        health: 5,
        cost: 50,
        projectile: null
      },
      {
        name: 'PeaShooter',
        health: 3,
        cost: 100,
        projectile: {
          name: 'Pea',
          damage: 1
        }
      },
      {
        name: 'IcePea',
        health: 3,
        cost: 175,
        projectile: {
          name: 'IcePea',
          damage: 0.75
        }
      }
    ]
    this.game = game
    this.x = x
    this.y = y
    this.width = 50
    this.height = 70
    this.selected = false
    this.cost = data[i].cost
    this.img = document.querySelector(`img[src='design/source/Seeds/${data[i].name}Seed.png']`)
  }
  draw() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    if (this.selected) {
      this.game.ctx.strokeStyle = 'lime'
      this.game.ctx.lineWidth = 4
      this.game.ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
    if (this.game.sun < this.cost) {
      this.game.ctx.fillStyle = 'black'
      this.game.ctx.save()
      this.game.ctx.globalAlpha = 0.4
      this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
      this.game.ctx.restore()
    }
  }
}