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
      const videoSrc = btn.dataset.video;
      const container = document.getElementById(btn.dataset.target);
      if ((!videoId && !videoSrc) || !container) return;

      if (container.hidden) {
        // data-video : fichier hébergé sur le site ; data-youtube : lecteur YouTube
        container.innerHTML = videoSrc
          ? `<video src="${videoSrc}" title="${teaserLabels.title}" controls autoplay playsinline preload="metadata"></video>`
          : `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}" title="${teaserLabels.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
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
  document.querySelectorAll(".video-card[data-youtube], .video-card[data-video]").forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("playing")) return;
      const frame = card.querySelector(".video-frame");
      const title = card.querySelector(".video-title")?.textContent || teaserLabels.title;
      if (card.dataset.video) {
        frame.innerHTML = `<video src="${card.dataset.video}" title="${title}" controls autoplay playsinline></video>`;
        card.classList.add("playing");
        return;
      }
      frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${card.dataset.youtube}?autoplay=1&rel=0" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      card.classList.add("playing");
    });
  });
  // Agenda : une date passée rejoint automatiquement « Déjà joué » (la plus récente en premier)
  const today = new Date().toISOString().slice(0, 10);
  document.querySelectorAll("#agenda").forEach((section) => {
    const next = section.querySelector(".agenda:not(.agenda-passe)");
    const past = section.querySelector(".agenda-passe");
    if (!next) return;
    next.querySelectorAll("li[data-date]").forEach((li) => {
      if (li.dataset.date < today && past) past.prepend(li);
    });
    if (!next.children.length) section.querySelector(".agenda-vide")?.removeAttribute("hidden");
  });

  // Vidéo de fond de l'accueil : bouton Pause/Lecture, et pas de lecture auto si l'utilisateur réduit les animations.
  const fond = document.getElementById("fond-video");
  const pause = document.getElementById("video-pause");
  if (fond && pause) {
    const labels = isEnglish ? { pause: "Pause", play: "Play" } : { pause: "Pause", play: "Lecture" };
    const sync = () => {
      pause.textContent = fond.paused ? labels.play : labels.pause;
      pause.setAttribute("aria-pressed", String(fond.paused));
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) fond.pause();
    pause.addEventListener("click", () => { fond.paused ? fond.play() : fond.pause(); });
    fond.addEventListener("play", sync);
    fond.addEventListener("pause", sync);
    sync();
  }
});
