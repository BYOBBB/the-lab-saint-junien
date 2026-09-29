/* The Lab - maquette démo : accordéon, bandeau, animations GSAP, boutique à défilement horizontal */
(function () {
  "use strict";

  /* Accordéon horizontal des rayons (desktop) : survol, clic ou clavier */
  var items = document.querySelectorAll(".acc-item");
  function openItem(item) {
    items.forEach(function (el) { el.classList.toggle("is-open", el === item); });
  }
  items.forEach(function (item) {
    item.addEventListener("click", function () { openItem(item); });
    item.addEventListener("focus", function () { openItem(item); });
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openItem(item); }
    });
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      item.addEventListener("mouseenter", function () { openItem(item); });
    }
  });

  /* Bandeau défilant : animation en pause quand il n'est pas visible (économise le processeur) */
  var marquee = document.querySelector(".marquee");
  if (marquee && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      marquee.classList.toggle("is-off", !entries[0].isIntersecting);
    }).observe(marquee);
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("motion");

  /* Retour sur la page : le navigateur restaure la position de scroll (ou saute à #infos)
     avant que la section boutique ait pris sa vraie hauteur, d'où un affichage décalé.
     On prend la main : départ en haut, puis on rejoint l'ancre une fois les mesures justes. */
  var hashTarget = null;
  try { hashTarget = location.hash && document.querySelector(location.hash); } catch (e) { /* ancre invalide */ }
  ScrollTrigger.clearScrollMemory("manual");
  window.scrollTo(0, 0);

  /* Hero : les lignes du titre montent depuis leur masque, puis le reste suit */
  var tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });
  tl.from(".hero-title .line > span", { yPercent: 110, opacity: 0, stagger: 0.12 })
    .from(".eyebrow, .hero-sub, .hero-ctas", { y: 20, opacity: 0, stagger: 0.08, duration: 0.9 }, "-=0.8");
  var heroMedia = document.querySelector(".hero-media");
  if (heroMedia) tl.from(heroMedia, { y: 60, opacity: 0, scale: 0.94, duration: 1.4 }, "-=1.1");

  /* Manifeste : les mots s'allument au fil du scroll pour guider la lecture */
  var text = document.querySelector("[data-scrub]");
  if (text) {
    Array.prototype.slice.call(text.childNodes).forEach(function (node) {
      if (node.nodeType !== 3 || !node.textContent.trim()) return;
      var frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(function (part) {
        if (!part.trim()) { frag.appendChild(document.createTextNode(part)); return; }
        var w = document.createElement("span");
        w.className = "w";
        w.textContent = part;
        frag.appendChild(w);
      });
      node.replaceWith(frag);
    });
    gsap.set(text.querySelectorAll(".inline-img"), { opacity: 0.14 });
    gsap.to(text.querySelectorAll(".w, .inline-img"), {
      opacity: 1,
      stagger: 0.05,
      ease: "none",
      scrollTrigger: { trigger: text, start: "top 80%", end: "bottom 45%", scrub: true }
    });
  }

  /* Hero : la photo glisse un peu moins vite que la page, pour la profondeur */
  if (heroMedia) {
    gsap.to(heroMedia.querySelector("img"), {
      yPercent: 12, scale: 1.08, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
  }

  var mm = gsap.matchMedia();

  /* Boutique (grand écran) : la section se fige et les portants défilent à l'horizontale,
     comme si on longeait la boutique */
  mm.add("(min-width: 769px)", function () {
    var track = document.querySelector(".pan-track");
    if (!track) return;
    var section = document.querySelector(".boutique");
    /* Hauteur de la section = un écran + le parcours horizontal (+ une courte pause au début).
       Le contenu est collé en haut par le CSS (position: sticky) : pas de pin GSAP,
       donc rien ne peut se détacher de la page. */
    var HOLD = 0.12; // part du défilement où la section est collée mais immobile
    var dist = 0;
    var measure = function () {
      dist = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.setProperty("--pan-h", Math.round(window.innerHeight + dist / (1 - HOLD)) + "px");
    };
    /* Position des photos recalculée en direct à partir de la place réelle de la section
       à l'écran (et non d'une mesure faite au chargement, qui devient fausse si la page
       change de hauteur). La section se colle, reste immobile un court instant, puis les
       photos suivent la molette 1 pour 1 et la page reprend avec la dernière photo. */
    var ticking = false;
    var update = function () {
      ticking = false;
      var r = section.getBoundingClientRect();
      var total = r.height - window.innerHeight;
      var p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      var q = Math.max(0, (p - HOLD) / (1 - HOLD));
      gsap.set(track, { x: -dist * q, force3D: true });
    };
    var onScroll = function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    var onResize = function () { measure(); update(); };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    return function () {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      section.style.removeProperty("--pan-h");
      gsap.set(track, { clearProps: "transform" });
    };
  });

  /* Grand logotype : les lettres montent une à une au fil du scroll */
  gsap.from(".wordmark-text span", {
    yPercent: 100, opacity: 0, stagger: 0.08, ease: "power3.out",
    scrollTrigger: { trigger: ".wordmark", start: "top 85%", end: "bottom 70%", scrub: 0.6 }
  });

  /* Titres de section : apparition douce, une seule fois */
  gsap.utils.toArray(".section-title, .cta-title, .bento .cell, .infos-grid > div").forEach(function (el) {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 1, ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true }
    });
  });

  /* Remesurer quand la police et les images sont là (elles changent les hauteurs),
     puis rejoindre l'ancre demandée dans l'URL */
  function settle() {
    ScrollTrigger.refresh();
    if (hashTarget) {
      window.scrollTo({ top: hashTarget.getBoundingClientRect().top + window.scrollY - 96, behavior: "instant" });
    }
  }
  var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  if (document.readyState === "complete") fontsReady.then(settle);
  else window.addEventListener("load", function () { fontsReady.then(settle); }, { once: true });

  /* Si la hauteur de la page change après coup (police, photos, fenêtre), les déclencheurs
     GSAP gardent d'anciennes positions : on les remesure dès que la hauteur bouge. */
  if ("ResizeObserver" in window) {
    var lastH = 0, rTimer = 0;
    new ResizeObserver(function () {
      var h = document.documentElement.scrollHeight;
      if (Math.abs(h - lastH) < 2) return;
      lastH = h;
      clearTimeout(rTimer);
      rTimer = setTimeout(function () { ScrollTrigger.refresh(); }, 150);
    }).observe(document.body);
  }

  /* Retour arrière depuis une autre page (cache du navigateur) : remesurer */
  window.addEventListener("pageshow", function (e) { if (e.persisted) ScrollTrigger.refresh(); });
})();
