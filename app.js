gsap.registerPlugin(ScrollTrigger);

gsap.to(camera.position, {
  z: 10,
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});