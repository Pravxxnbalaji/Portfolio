const c = document.getElementById("bg");
const ctx = c.getContext("2d");

function resize() {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let dots = Array.from({ length: 120 }, () => ({
  x: Math.random() * c.width,
  y: Math.random() * c.height,
  r: Math.random() * 2,
  dx: Math.random() - 0.5,
  dy: Math.random() - 0.5
}));

function animate() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = "rgba(108,99,255,0.7)";

  dots.forEach(d => {
    d.x += d.dx;
    d.y += d.dy;
    if (d.x < 0 || d.x > c.width) d.dx *= -1;
    if (d.y < 0 || d.y > c.height) d.dy *= -1;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();