// Lazy-loading Video.js YouTube players
document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll("video[data-src]");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;
        const config = JSON.parse(video.getAttribute("data-src"));

        // Создаем Video.js плеер с правильной конфигурацией
        const player = videojs(video, config, function() {
          // На десктопе YouTube блокирует автоплей, оставляем видео с превью
          this.ready(() => {
            // Можно оставить превью, пользователь кликнет для воспроизведения
            this.poster(); 
          });
        });

        // Убираем data-src чтобы больше не обрабатывать
        video.removeAttribute("data-src");

        // Останавливаем наблюдение
        observer.unobserve(video);
      }
    });
  }, { threshold: 0.2 });

  videos.forEach(video => observer.observe(video));
});

// Section fade-in animation
const sections = document.querySelectorAll(".section");

const secObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

sections.forEach(sec => secObserver.observe(sec));
