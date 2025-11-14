// Lazy-loading Video.js YouTube players
document.addEventListener("DOMContentLoaded", () => {
  const players = document.querySelectorAll("video[data-src]");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;
        const config = video.getAttribute("data-src");
        video.setAttribute("data-setup", config);
        video.removeAttribute("data-src");
        videojs(video);
        observer.unobserve(video);
      }
    });
  }, { threshold: 0.2 });

  players.forEach(v => observer.observe(v));
});

// Section fade-in animation
const sections = document.querySelectorAll(".section");

const secObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

sections.forEach(sec => secObserver.observe(sec));
