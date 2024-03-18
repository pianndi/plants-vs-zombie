class Shovel {
  constructor(game) {
    this.game = game
    this.img = document.querySelector('img[src="design/source/General/Shovel.png"]')
    this.ratio = 0.5
    this.x = 640
    this.y = 14
    this.width = this.img.width * this.ratio
    this.height = this.img.height * this.ratio
    this.selected = false
  }
  draw() {
    this.game.ctx.fillStyle = 'red'
    if (this.selected) this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}