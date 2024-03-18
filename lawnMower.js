class LawnMower {
  constructor(game, i) {
    this.game = game
    this.width = 85
    this.height = 90
    this.x = 5
    this.y = 118 + i * this.height
    this.img = document.querySelector('img[src="design/source/General/lawnmowerIdle.gif"]')
    this.speed = 0
    this.active = true
  }
  draw() {
    if (this.active) {

      this.game.zombies.forEach((zombie, i) => {
        if (this.game.checkCollide(this, zombie, 0.75)) {
          this.img = document.querySelector('img[src="design/source/General/lawnmowerActivated.gif"]')
          this.speed = 0.5

          this.game.zombies.splice(i, 1)
          this.game.score++
        }
      })
      if (this.x > this.game.width) {
        this.speed = 0
        this.y = -this.game.height
        this.active = false
      }
    }
    this.x += this.speed * this.game.deltaTime
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}