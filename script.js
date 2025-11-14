// Ленивое подключение YouTube видео через Video.js
document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll("video[data-youtube]");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;
        const videoId = video.getAttribute("data-youtube");

        // Создаем Video.js плеер
        videojs(video, {
          techOrder: ["youtube"],
          sources: [{
            type: "video/youtube",
            src: `https://www.youtube.com/watch?v=${videoId}`
          }],
          youtube: {
            modestbranding: true,
            rel: 0,
            showinfo: false
          },
          controls: true,
          preload: "auto",
          fluid: true
        });

        video.removeAttribute("data-youtube");
        observer.unobserve(video);
      }
    });
  }, { threshold: 0.2 });

  videos.forEach(video => observer.observe(video));
});

// Анимация появления секций
const sections = document.querySelectorAll(".section");

const secObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

sections.forEach(sec => secObserver.observe(sec));
