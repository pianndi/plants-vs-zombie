class Sun {
  constructor(game, x = false, y = false, value = 25) {
    this.game = game
    this.img = document.querySelector('img[src="design/source/General/Sun.png"]')
    this.width = this.img.width * 0.75
    this.height = this.img.height * 0.75
    this.x = x ? x : Math.random() * (this.game.width - this.width - 100) + 100
    this.y = y ? y : -this.height
    this.speed = 0;
    this.value = value
    this.rotationAngle = 0; // Initialize rotation angle
    this.rotationSpeed = 0.001; // Set rotation speed
  }
  draw() {
    if (this.y < this.game.height - this.height * 1.5) {
      this.speed += 0.0005
      this.y += this.speed * this.game.deltaTime
    }
    this.rotationAngle += this.rotationSpeed * this.game.deltaTime;
    this.game.ctx.save();
    this.game.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    this.game.ctx.rotate(this.rotationAngle);
    this.game.ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
    this.game.ctx.restore();
  }
}