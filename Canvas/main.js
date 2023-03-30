const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerWidth;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;
ctx.globalCompositeOperation = 'luminosity';

let hue = 0;
let sat = 100;
let direction = true;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e) {
  if (!isDrawing) return; //stops function from running when isDrawing == false;

  ctx.strokeStyle = `hsl(${hue}, ${sat}%, 50%)`;
  hue++;

  if (ctx.lineWidth >= 50 || ctx.lineWidth < 5) {
    direction = !direction;
  }

  if (direction == true) {
    ctx.lineWidth = ctx.lineWidth + 0.1;
  }
  else {
    ctx.lineWidth = ctx.lineWidth - 0.1;
  }

  console.log(ctx.lineWidth);
  sat = sat + (Math.random() * 10) - 5;
  ctx.beginPath();
  //start from:
  ctx.moveTo(lastX, lastY);
  //move to: 
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];


}
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);