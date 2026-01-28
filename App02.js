import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const click = e => {
    for (let i = 0; i < 10; i++) {
      const spark = document.createElement("div");
      spark.style.position = "fixed";
      spark.style.left = e.clientX + "px";
      spark.style.top = e.clientY + "px";
      spark.style.width = "4px";
      spark.style.height = "4px";
      spark.style.background = "#7f8cff";
      spark.style.borderRadius = "50%";
      document.body.appendChild(spark);

      spark.animate(
        [
          { transform: "translate(0,0)", opacity: 1 },
          { transform: `translate(${Math.random()*50-25}px,${Math.random()*50-25}px)`, opacity: 0 }
        ],
        { duration: 500 }
      );

      setTimeout(() => spark.remove(), 500);
    }
  };

  return (
    <div
      onClick={click}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%,-50%)",
        width: 26,
        height: 26,
        border: "1px solid #7f8cff",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          background: "#7f8cff",
          borderRadius: "50%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)"
        }}
      />
    </div>
  );
}