export default function Hero() {
  return (
    <section style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    }}>
      <p style={{ letterSpacing: 3, opacity: 0.7 }}>HELLO WORLD</p>
      <h1 style={{ fontSize: 64 }}>
        I’m <span style={{ color: "#7f8cff" }}>Praveen</span>
      </h1>
      <p>Electronics & Communication Engineer</p>
    </section>
  );
}