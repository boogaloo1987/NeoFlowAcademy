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
        container.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}" title="${teaserLabels.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
        container.hidden = false;
        btn.textContent = teaserLabels.hide;
      } else {
        container.hidden = true;
        container.innerHTML = "";
        btn.textContent = teaserLabels.show;
      }
    });
  });

  // Cartes vidéo : la vignette est remplacée par le lecteur au clic (rien n'est chargé depuis YouTube avant).
  document.querySelectorAll(".video-card[data-youtube]").forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("playing")) return;
      const frame = card.querySelector(".video-frame");
      const title = card.querySelector(".video-title")?.textContent || teaserLabels.title;
      frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${card.dataset.youtube}?autoplay=1&rel=0" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      card.classList.add("playing");
    });
  });
});
