class Grass {
  constructor(game, x, y) {
    this.game = game
    this.img = document.querySelector('img[src="design/source/General/Grass.bmp"]')
    this.x = x
    this.y = y
    this.width = 85
    this.height = 90
    this.active = false
    this.hover = false
    this.hoverDelete = false
  }
  draw() {
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    if (this.hover) {
      this.game.ctx.save()
      this.game.ctx.globalAlpha = 0.5
      this.game.ctx.drawImage(this.hover.img, 0, 0, this.hover.sw, this.hover.sh, this.hover.x, this.hover.y, this.hover.width, this.hover.height)
      this.game.ctx.restore()
    }
    if (this.active) {
      this.active.draw()
      if (this.hoverDelete) {
        this.game.ctx.save()
        this.game.ctx.fillStyle = 'red'
        this.game.ctx.globalAlpha = 0.5
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.game.ctx.restore()
      }
    }
  }

}