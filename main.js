class Game {
  constructor(canvas, context) {
    this.canvas = canvas
    this.ctx = context
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.bound = this.canvas.getBoundingClientRect()
    this.mouse = {
      x: 0,
      y: 0,
      width: 0.1,
      height: 0.1,
      active: false,
      selected: null
    }
    this.size = 85
    this.deltaTime = 1
    this.sun = 50
    this.timer = 0
    this.zombiesTimer = 0
    this.sunsTimer = 0
    this.score = 0
    this.perfectFrameTime = 1000 / 60
    this.shovel = new Shovel(this)
    this.grass = []
    this.projectiles = []
    this.suns = [new Sun(this)]
    this.zombies = [new Zombie(this, 0)]
    this.seeds = [...Array(4)].map((_, i) => new Seed(this, 192 + i * 60, 15, i))
    this.lawnMowers = [...Array(5)].map((_, i) => new LawnMower(this, i))
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 5; y++) {
        this.grass.push(new Grass(this, x * this.size + 90, y * (this.size + 5) + 118))
      }
    }
    window.addEventListener('resize', () => {
      this.bound = this.canvas.getBoundingClientRect()
    })
    cvs.addEventListener('mousedown', e => {
      this.mouse.active = true
      this.mouse.x = e.clientX - this.bound.left
      this.mouse.y = e.clientY - this.bound.top
      this.suns.forEach((sun, i) => {
        if (this.checkCollide(this.mouse, sun)) {
          this.sun += sun.value
          this.suns.splice(i, 1)
        }
      })
      this.grass.forEach((grass, i) => {
        if (this.shovel.selected && this.grass[i].active && this.checkCollide(this.mouse, grass)) {
          this.grass[i].active = null
        }
        if (!this.grass[i].active && this.checkCollide(this.mouse, grass)) {
          this.seeds.forEach((seed, index) => {
            if (seed.selected && this.sun >= seed.cost) {
              this.grass[i].active = new Plant(this, this.grass[i], index)
              this.sun -= seed.cost
            }
          })
        }
      })
      this.mouse.selected = null
      this.seeds.forEach((seed, i) => {
        if (!seed.selected && this.checkCollide(this.mouse, seed) && this.sun >= seed.cost) {
          this.seeds[i].selected = true
          this.mouse.selected = i
        } else {
          this.seeds[i].selected = false
        }
      })
      if (!this.shovel.selected && this.checkCollide(this.mouse, this.shovel)) {
        this.shovel.selected = true
      } else {
        this.shovel.selected = false

      }
    })
    cvs.addEventListener('mousemove', e => {
      this.mouse.x = e.clientX - this.bound.left
      this.mouse.y = e.clientY - this.bound.top
      console.log(this.mouse)
      this.grass.forEach((grass, i) => {
        if (this.shovel.selected && this.grass[i].active && this.checkCollide(this.mouse, grass)) {
          this.grass[i].hoverDelete = true;
        } else this.grass[i].hoverDelete = false;

        if (this.mouse.selected !== null && this.checkCollide(this.mouse, grass)) {
          this.grass[i].hover = new Plant(this, this.grass[i], this.mouse.selected)
        } else {
          this.grass[i].hover = false
        }
      })
    })
    cvs.addEventListener('mouseup', e => {
      this.mouse.x = e.clientX - this.bound.left
      this.mouse.y = e.clientY - this.bound.top
      this.mouse.active = false
    })
  }
  render() {
    this.update()
    this.grass.forEach(obj => obj.draw())
    this.seeds.forEach(obj => obj.draw())
    this.zombies.forEach(obj => obj.draw())
    this.lawnMowers.forEach(obj => obj.draw())
    this.projectiles.forEach((obj, i) => {
      obj.draw()
      if (obj.die) this.projectiles.splice(i, 1)
    })
    this.shovel.draw()
    this.ctx.fillStyle = 'black'
    this.ctx.font = 'bold 22px Arial'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseLine = 'middle'
    this.ctx.fillText(this.sun, 148, 90)
    this.ctx.fillStyle = 'white'
    this.ctx.font = 'bold 18px Arial'
    this.ctx.textAlign = 'left'
    this.ctx.textBaseLine = 'middle'
    this.ctx.fillText('PlayerName', 450, 35)
    this.ctx.fillText('Score  : ' + this.score, 450, 58)
    this.ctx.fillText(`Time    : ${Math.floor(this.timer / 60000).toString().padStart(2, '0')}:${(Math.round(this.timer / 1000) % 60).toString().padStart(2, '0')}`, 450, 80)
    // if (this.timer<3000){
    //     this.ctx.font = '50px Arial bold'
    //     this.ctx.fillText(Math.ceil(3-this.timer/1000),this.width/2,this.height/2)
    //   }
    this.suns.forEach(obj => obj.draw())

  }
  update() {
    if (this.zombiesTimer > 5000) {
      this.zombiesTimer = 0
      this.zombies.push(new Zombie(this, Math.floor(Math.random() * 5)))
      this.zombies.push(new Zombie(this, Math.floor(Math.random() * 5)))
      this.zombies.push(new Zombie(this, Math.floor(Math.random() * 5)))

    } else {
      this.zombiesTimer += this.deltaTime
    }
    if (this.suns.length < 2) {
      if (this.sunsTimer > 3000) {
        this.sunsTimer = 0
        this.suns.push(new Sun(this))

      } else {
        this.sunsTimer += this.deltaTime
      }
    }
  }
  checkCollide(a, b, scale = 1) {
    if (a.x < b.x + b.width * scale &&
      a.x + a.width * scale > b.x &&
      a.y < b.y + b.height * scale &&
      a.y + a.height * scale > b.y) {
      return true
    } else {
      return false
    }
  }
}

window.addEventListener('DOMContentLoaded', mulai)
function mulai() {
  const cvs = document.getElementById('cvs')
  const ctx = cvs.getContext('2d')
  cvs.width = 800
  cvs.height = 600

  const game = new Game(cvs, ctx)
  let lastTime = performance.now()
  requestAnimationFrame(animate)
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    game.timer += deltaTime
    game.deltaTime = deltaTime
    lastTime = timeStamp
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    game.render()
    requestAnimationFrame(animate)
  }
}