/* ═══════════════════════════════════════════════════════════
   TEMPLATE « SITE IMMERSIF » — content.js
   ► L'UNIQUE FICHIER À RÉÉCRIRE pour produire un nouveau site.
   Renommer en content.js dans le projet cible. La partie
   « injection » en bas de fichier est le moteur de remplissage :
   la copier TELLE QUELLE, ne réécrire que window.SITE_CONTENT.

   Schéma narratif (rôle de conversion de chaque bloc) :
   1. ACCROCHE       — hook : promesse + identité en 3 secondes
   2. POSITIONNEMENT — positioning : ce que je fais, pour qui, où
   3. DÉMARCHE       — manifesto : pourquoi moi (différenciation)
   4. PREUVE         — proof : réalisations (masonry) OU features (bento)
   5. DEVISE         — motto : 3 mots-clés géants + légendes
   6-7. PROCESSUS    — universes : « X en 3 étapes » + visuels posés
   8. PREUVE SOCIALE — testimonial : un client parle
   9. OBJECTIONS     — objections : « Pas de… Juste… »
   10. CONVERSION    — contact : e-mail + réassurance
   ═══════════════════════════════════════════════════════════ */

window.SITE_CONTENT = {

  brand: {
    name: 'The Lab',
    title: 'Friperie vintage — The Lab — Saint-Junien',
    description: 'The Lab, friperie vintage place Guy Mocquet à Saint-Junien : des pièces de seconde main choisies une à une, vérifiées, à prix de friperie.',
    kicker: 'THE LAB — FRIPERIE VINTAGE, SAINT-JUNIEN',
    copyright: '© 2026 — SAINT-JUNIEN, FRANCE',
    signature: 'GENUINE VINTAGE STORE',
    socials: [
      { label: 'INSTAGRAM ↗', url: 'https://www.instagram.com/thelab.vintage/' }
    ]
  },

  nav: { proof: 'PIÈCES', universes: 'MÉTHODE', cta: 'VENIR' },

  hook: {
    line1: 'Du vintage choisi,',
    line2a: 'pièce par',
    line2b: 'pièce.',
    image: 'images/hero.jpg',
    imageAlt: 'Portant de vestes et chemises vintage aux couleurs variées',
    floaters: [
      'images/fl-01.jpg',
      'images/fl-02.jpg',
      'images/fl-03.jpg',
      'images/fl-04.jpg',
      'images/fl-05.jpg',
      'images/fl-06.jpg',
      'images/fl-07.jpg',
      'images/fl-08.jpg',
      'images/fl-09.jpg',
      'images/fl-10.jpg'
    ]
  },

  positioning: 'Friperie vintage — place Guy Mocquet.',

  manifesto: {
    text: 'Chez The Lab, rien n’arrive en rayon par hasard. Chaque pièce est choisie à la main, vérifiée, puis prête à [[revivre chez vous]]. Du vrai vintage, à prix de friperie.'
  },

  proof: {
    layout: 'masonry',
    kicker: 'LA SÉLECTION',
    title: 'Ce qu’on chine pour vous',
    sub: 'Denim, vestes, chemises et sweats — souvent une seule pièce de chaque.',
    meta: 'HUIT PIÈCES — ARRIVAGES RÉGULIERS',
    projects: [
      { img: 'images/piece-01.jpg', title: 'Veste en jean', meta: 'DENIM — VESTE' },
      { img: 'images/piece-02.jpg', title: 'Ensemble denim', meta: 'DENIM — SET' },
      { img: 'images/piece-03.jpg', title: 'Le rayon couleurs', meta: 'RAYON — CHEMISES' },
      { img: 'images/piece-04.jpg', title: 'Surchemise', meta: 'PIÈCE — UNIQUE' },
      { img: 'images/piece-05.jpg', title: 'Veste oversize', meta: 'DENIM — PORTÉ' },
      { img: 'images/piece-06.jpg', title: 'L’arrivage', meta: 'TRI — EN COURS' },
      { img: 'images/piece-07.jpg', title: 'Blouson', meta: 'VESTE — PORTÉ' },
      { img: 'images/piece-08.jpg', title: 'Le rayon denim', meta: 'RAYON — DENIM' }
    ],
    features: []
  },

  motto: {
    kicker: 'CE QUI FAIT UNE PIÈCE THE LAB',
    words: [
      { word: 'Chinée', hint: 'Repérée à la main, une par une.' },
      { word: 'Vérifiée', hint: 'Coutures, zips, taches : contrôlée avant le rayon.' },
      { word: 'Abordable', hint: 'Le vintage, à prix de friperie.' }
    ]
  },

  universes: {
    introA: 'Une',
    introB: 'pièce,',
    introC: '3 étapes.',
    cta: 'Passer en boutique →',
    image: 'images/processus.jpg',
    items: [
      { name: 'On chine', meta: 'ÉTAPE — 01', desc: 'Chaque pièce est sélectionnée pour sa matière, sa coupe et son époque.' },
      { name: 'On vérifie', meta: 'ÉTAPE — 02', desc: 'Chaque vêtement est contrôlé et préparé avant d’arriver en rayon.' },
      { name: 'Vous trouvez', meta: 'ÉTAPE — 03', desc: 'Place Guy Mocquet, vous fouillez, vous essayez, et vous repartez avec une pièce que personne d’autre n’aura.' }
    ]
  },

  testimonial: {
    kicker: 'PREMIÈRE VISITE, SAINT-JUNIEN',
    figure: '12',
    unit: '€',
    quote: 'Je suis venue pour regarder, je suis repartie avec une veste en jean que je porte tous les jours. Depuis, je repasse à chaque arrivage.',
    author: 'CAMILLE — CLIENTE'
  },

  objections: {
    items: ['Pas de neuf.', 'Pas de série.', 'Pas de frime.'],
    finale: 'Juste du vintage,',
    pill: 'bien choisi.'
  },

  contact: {
    kicker: 'UNE PIÈCE VOUS A TAPÉ DANS L’ŒIL ?',
    email: 'contact@thelab-vintage.fr',
    reassurance: 'PLACE GUY MOCQUET — 87200 SAINT-JUNIEN'
  },

  trail: [
    'images/trail-01.jpg', 'images/trail-02.jpg', 'images/trail-03.jpg', 'images/trail-04.jpg', 'images/trail-05.jpg', 'images/trail-06.jpg', 'images/trail-07.jpg', 'images/trail-08.jpg', 'images/trail-09.jpg', 'images/trail-10.jpg', 'images/trail-11.jpg', 'images/trail-12.jpg', 'images/trail-13.jpg', 'images/trail-14.jpg', 'images/trail-15.jpg', 'images/trail-16.jpg', 'images/trail-17.jpg', 'images/trail-18.jpg', 'images/trail-19.jpg', 'images/trail-20.jpg'
  ]
};

/* ═══════════════════════════════════════════════════════════
   INJECTION — NE PAS MODIFIER (remplit le DOM avant app.js)
   ═══════════════════════════════════════════════════════════ */
(() => {
  const C = window.SITE_CONTENT;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const set = (sel, txt) => { const el = $(sel); if (el) el.textContent = txt; };

  document.title = C.brand.title;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', C.brand.description);

  // chrome
  set('.loader-wordmark', C.brand.name);
  set('.dock-wordmark', C.brand.name);
  set('.dock-link[href="#travaux"]', C.nav.proof);
  set('.dock-link[href="#explorer"]', C.nav.universes);
  set('.dock-cta', C.nav.cta);

  // 1 · accroche
  set('#heroKicker', C.brand.kicker);
  set('#heroLine1', C.hook.line1);
  const hls = $$('#heroLine2 .hl');
  if (hls.length === 2) { hls[0].textContent = C.hook.line2a; hls[1].textContent = C.hook.line2b; }
  const g1 = $('#grow1 img');
  if (g1) { g1.src = C.hook.image; g1.alt = C.hook.imageAlt; }
  $$('.floaters .fl img').forEach((img, i) => { if (C.hook.floaters[i]) img.src = C.hook.floaters[i]; });

  // 2 · positionnement (un span par mot)
  const intro = $('#spotIntro');
  if (intro) intro.innerHTML = C.positioning.split(' ').map((w) => `<span>${w}</span>`).join(' ');

  // 3 · démarche
  const fill = $('#fillText');
  if (fill) {
    fill.innerHTML = C.manifesto.text.replace(
      /\[\[(.+?)\]\]/,
      '<span class="boxed" id="boxedPhrase">$1<svg class="box-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path id="boxPath" d="M50,6 C88,4 98,22 97,50 C96,82 76,96 49,95 C16,94 3,76 4,48 C5,18 20,7 50,6 Z"/></svg></span>'
    );
  }

  // 4 · preuve : masonry (8 photos) ou bento (4 features big/tall/tall/big)
  const head = $$('.coll-head > *');
  if (head.length === 4) {
    head[0].textContent = C.proof.kicker;
    head[1].textContent = C.proof.title;
    head[2].textContent = C.proof.sub;
    head[3].textContent = C.proof.meta;
  }
  const grid = $('#collGrid');
  if (grid && C.proof.layout === 'bento') {
    grid.className = 'bento-grid';
    grid.innerHTML = C.proof.features.map((f) =>
      `<figure class="card${f.size ? ' b-' + f.size : ''}"><div class="card-img"><img src="${f.illu}" alt="${f.title}"></div><figcaption>${f.title}<span class="mono">${f.meta}</span></figcaption></figure>`
    ).join('');
  } else if (grid) {
    grid.className = 'coll-grid';
    const SPEEDS = [-0.05, 0.06, -0.028, 0.085];
    grid.innerHTML = SPEEDS.map((s, ci) =>
      `<div class="col" data-pspeed="${s}">` +
      C.proof.projects.slice(ci * 2, ci * 2 + 2).map((p) =>
        `<figure class="card"><div class="card-img"><img src="${p.img}" alt="${p.title} — ${p.meta}"></div><figcaption>${p.title}<span class="mono">${p.meta}</span></figcaption></figure>`
      ).join('') + '</div>'
    ).join('');
  }

  // 5 · devise (train de mots-clés)
  set('#mottoKicker', C.motto.kicker);
  const mtrack = $('#mottoTrack');
  if (mtrack) mtrack.innerHTML = C.motto.words.map((w) => `<span class="mw">${w.word}</span>`).join('');

  // 6-7 · processus immersif (visuels posés un à un)
  set('#nw1', C.universes.introA);
  set('#nw2', C.universes.introB);
  set('#nw3', C.universes.introC);
  const g2 = $('#grow2 img');
  if (g2) g2.src = C.universes.image || (C.universes.items[0] || {}).img || g2.src;
  const psteps = $('#psteps');
  if (psteps) {
    psteps.innerHTML = C.universes.items.map((u) =>
      `<div class="pstep"><span class="pstep-meta mono ash">${u.meta}</span><h3>${u.name}</h3><p>${u.desc || ''}</p></div>`
    ).join('');
  }
  const sCta = $('#stepsCtaLink');
  if (sCta) sCta.childNodes[0].textContent = C.universes.cta;

  // 8 · preuve sociale — le chiffre qui frappe
  set('#figKicker', C.testimonial.kicker || '');
  const figM = String(C.testimonial.figure || '').trim().match(/^([^\d.,+-]*[+\u2212-]?)\s*(-?[\d.,]+)/);
  set('#figPre', figM ? figM[1] : '');
  set('#figVal', figM ? figM[2] : '');
  set('#figUnit', C.testimonial.unit || '');
  set('#quoteText', C.testimonial.quote);
  set('#quoteAuthor', C.testimonial.author);

  // 9 · objections
  C.objections.items.forEach((t, i) => set('#fs' + (i + 1), t));
  const fs4 = $('#fs4');
  if (fs4) {
    fs4.innerHTML = `${C.objections.finale} <span class="pill" id="pillPhrase">${C.objections.pill}<svg class="pill-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path id="pillPath" d="M50,6 C88,4 98,22 97,50 C96,82 76,96 49,95 C16,94 3,76 4,48 C5,18 20,7 50,6 Z"/></svg></span>`;
  }
  $$('#trail img').forEach((img, i) => { img.src = C.trail[i % C.trail.length]; });

  // 10 · conversion
  set('.footer-kicker', C.contact.kicker);
  const mail = $('.footer-mail');
  if (mail) { mail.href = 'mailto:' + C.contact.email; mail.querySelector('.footer-mail-text').textContent = C.contact.email; }
  set('.footer-reassurance', C.contact.reassurance);
  const fname = $('#footerName');
  if (fname) { fname.textContent = C.brand.name; fname.setAttribute('aria-label', C.brand.name); }
  const bottom = $$('.footer-bottom > p');
  if (bottom.length === 3) {
    bottom[0].textContent = C.brand.copyright;
    bottom[1].innerHTML = C.brand.socials.map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join('&nbsp;&nbsp;&nbsp;');
    bottom[2].textContent = C.brand.signature;
  }
})();
