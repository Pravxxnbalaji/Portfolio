const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

let offset = 0;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 1;

  const size = 40;
  offset += 0.3;

  for (let x = -canvas.height; x < canvas.width; x += size) {
    ctx.beginPath();
    ctx.moveTo(x + offset, 0);
    ctx.lineTo(x + canvas.height + offset, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y < canvas.height; y += size) {
    ctx.beginPath();
    ctx.moveTo(0, y + offset);
    ctx.lineTo(canvas.width, y + offset);
    ctx.stroke();
  }

  requestAnimationFrame(drawGrid);
}

drawGrid();