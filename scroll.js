const bar = document.querySelector(".bottom-bar");

window.addEventListener("scroll", () => {
  bar.style.display = window.scrollY > 300 ? "flex" : "none";
});