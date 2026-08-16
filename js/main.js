document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const isEnglish = document.documentElement.lang === "en";
  const teaserLabels = isEnglish
    ? { show: "Watch the teaser", hide: "Hide the teaser", title: "Video teaser" }
    : { show: "Voir le teaser", hide: "Masquer le teaser", title: "Teaser vidéo" };

  document.querySelectorAll(".teaser-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const videoId = btn.dataset.youtube;
      const container = document.getElementById(btn.dataset.target);
      if (!videoId || !container) return;

      if (container.hidden) {
        container.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" title="${teaserLabels.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
        container.hidden = false;
        btn.textContent = teaserLabels.hide;
      } else {
        container.hidden = true;
        container.innerHTML = "";
        btn.textContent = teaserLabels.show;
      }
    });
  });
});
