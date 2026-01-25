const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.addEventListener("click", e => {
  for (let i = 0; i < 12; i++) {
    const spark = document.createElement("div");
    spark.style.position = "fixed";
    spark.style.left = e.clientX + "px";
    spark.style.top = e.clientY + "px";
    spark.style.width = "4px";
    spark.style.height = "4px";
    spark.style.background = "#6c63ff";
    spark.style.borderRadius = "50%";
    document.body.appendChild(spark);

    spark.animate(
      [
        { transform: "translate(0,0)", opacity: 1 },
        { transform: `translate(${Math.random()*60-30}px,${Math.random()*60-30}px)`, opacity: 0 }
      ],
      { duration: 600 }
    );

    setTimeout(() => spark.remove(), 600);
  }
});