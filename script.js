var canvas = document.getElementById('particle')
var ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = []
let l = 95

function randNum(min, max, b) {
  let num = Math.random() * (max - min) + min
  if(Math.round(num) == 0 && b == true) {
    return 1
  } else if(Math.round(num) == -0 && b == true) {
    return -1
  } else{
    return num
  }
}

for (let i = 0; i < 250; i++) {
  particles[i] = {
    particleSize: Math.round(randNum(1, 4, true)),
    particleSpeedX: randNum(-1, 1, false),
    particleSpeedY: randNum(-1, 1, false),
    w: 0,
    h: 0,
  }
}

for (let i = 0; i < particles.length; i++) {
  particles[i].w = randNum(1, window.innerWidth - 1, true)
  particles[i].h = randNum(1, window.innerHeight - 1, true)
  ctx.beginPath();
  ctx.arc(particles[i].w, particles[i].h, 2, 0, Math.PI * 2)
  ctx.fillStyle = "green"
  ctx.fill();
}

function drawArc(num) {
  particles[num].w += particles[num].particleSpeedX
  particles[num].h += particles[num].particleSpeedY
  ctx.beginPath();
  ctx.arc(particles[num].w, particles[num].h, 2, 0, Math.PI * 2)
  ctx.fillStyle = 'rgb(128, 0, 0)'
  ctx.fill()
}

function drawLines(num) {
  for (let index = 0; index < particles.length; index++) {
    let x1, x2, y1, y2, length, color
    x1 = particles[num].w
    y1 = particles[num].h
    x2 = particles[index].w
    y2 = particles[index].h
    length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    length2 = Math.sqrt(Math.pow(x2 - x1, 2) - Math.pow(y2 - y1, 2))
    color = 1 - length / l
    if (length < l) {
      ctx.strokeStyle = 'rgba(128, 0, 0, '+color+')'
      ctx.beginPath()
      ctx.moveTo(particles[index].w, particles[index].h);
      ctx.lineTo(particles[num].w, particles[num].h);
      ctx.closePath()
      ctx.stroke()
    }
  }
}

function draw() {
  ctx.fillStyle = "#1E1E1E"
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
  for (let i = 0; i < particles.length; i++) {
    if (particles[i].w + particles[i].particleSpeedX <= 0 || particles[i].w + particles[i].particleSpeedX >= window.innerWidth) {
      particles[i].particleSpeedX = particles[i].particleSpeedX * -1
    } else if (particles[i].h + particles[i].particleSpeedY <= 0 || particles[i].h + particles[i].particleSpeedY >= window.innerHeight) {
      particles[i].particleSpeedY = particles[i].particleSpeedY * -1
    }

  drawLines(i)
    
  drawArc(i)

  }
}

setInterval(() => {
  draw()
}, 20);
