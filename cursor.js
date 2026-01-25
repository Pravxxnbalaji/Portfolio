const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.addEventListener("click", e => {
  const ripple = document.createElement("div");
  ripple.style.position = "fixed";
  ripple.style.left = e.clientX + "px";
  ripple.style.top = e.clientY + "px";
  ripple.style.width = "20px";
  ripple.style.height = "20px";
  ripple.style.border = "1px solid #b3a7ff";
  ripple.style.borderRadius = "50%";
  ripple.style.transform = "translate(-50%,-50%)";
  document.body.appendChild(ripple);

  ripple.animate(
    [{ transform: "scale(1)", opacity: 1 },
     { transform: "scale(4)", opacity: 0 }],
    { duration: 500 }
  );

  setTimeout(() => ripple.remove(), 500);
});