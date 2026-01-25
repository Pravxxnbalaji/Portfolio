const bar = document.querySelector(".bottom-bar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    bar.style.display = "flex";
  } else {
    bar.style.display = "none";
  }
});