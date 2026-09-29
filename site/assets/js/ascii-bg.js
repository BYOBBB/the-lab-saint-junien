/* The Lab - fond « dither » animé du haut de page (version d'essai)
   Réglages adoucis par rapport à l'original (scintillement, glitch, trame) pour le confort visuel.
   Recréation Canvas2D du réglage « Surf BG 2 » de 21st.dev/community/ascii :
   photo d'origine (90 %) + trame dither inversée en cellules de 18 px sur 48 % des cellules,
   fusion overlay, teinte #241447 (violet de la marque, assombri) à 45 %, puis vignette, lignes de balayage, aberration
   chromatique, halo, grain et glitch, animé en « flicker ».
   Performance : tout ce qui est coûteux (trame, halo, aberration) est pré-calculé une fois
   par taille d'écran en 3 variantes ; chaque image ne fait que superposer des calques.
   L'animation s'arrête quand le haut de page n'est plus visible. */
(function () {
  "use strict";

  var P = {
    cell: 18,            // taille des cellules
    sub: 3,              // taille d'un point de trame dans la cellule
    coverage: 0.32,      // part des cellules dessinées (0.48 à l'origine, adouci)
    invert: true,
    edge: 0.4,           // accentuation des contours
    contrast: 1.5,
    bgOpacity: 0.9,
    tint: "#241447",
    tintOpacity: 0.45,
    vignette: 0.3,
    scan: 0.14,
    chroma: 0.2,
    bloom: 0.35,
    grain: 0.25,
    glitch: 0.05,
    flicker: 0.2,
    fps: 24
  };
  var BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

  var canvas = document.querySelector(".ascii-bg");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var W = 0, H = 0, base, over, variants = [], grains = [], images = {};
  var running = false, visible = true, raf = 0, last = 0, vi = 0, gi = 0;

  function mk(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function rand(seed) { var x = Math.sin(seed * 12.9898) * 43758.5453; return x - Math.floor(x); }

  function load(src) {
    if (images[src]) return images[src];
    images[src] = new Promise(function (res, rej) {
      var i = new Image();
      i.decoding = "async";
      i.onload = function () { res(i); };
      i.onerror = rej;
      i.src = src;
    });
    return images[src];
  }

  function cover(c, img, w, h) {
    var s = Math.max(w / img.width, h / img.height);
    var dw = img.width * s, dh = img.height * s;
    c.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  }

  function build(img) {
    W = canvas.width = Math.max(1, Math.round(canvas.clientWidth));
    H = canvas.height = Math.max(1, Math.round(canvas.clientHeight));

    /* Photo plein cadre */
    var photo = mk(W, H);
    cover(photo.getContext("2d"), img, W, H);

    /* Fond : photo à 90 % sur un fond sombre */
    base = mk(W, H);
    var b = base.getContext("2d");
    b.fillStyle = "#140d22";
    b.fillRect(0, 0, W, H);
    b.globalAlpha = P.bgOpacity;
    b.drawImage(photo, 0, 0);

    /* Luminance moyenne par cellule (réduction de la photo à 1 pixel par cellule) */
    var cols = Math.ceil(W / P.cell), rows = Math.ceil(H / P.cell);
    var small = mk(cols, rows);
    var sc = small.getContext("2d", { willReadFrequently: true });
    sc.imageSmoothingQuality = "high";
    sc.drawImage(photo, 0, 0, cols, rows);
    var px = sc.getImageData(0, 0, cols, rows).data;
    var L = new Float32Array(cols * rows), C = new Uint8ClampedArray(cols * rows * 3);
    for (var i = 0; i < cols * rows; i++) {
      var r = px[i * 4], g = px[i * 4 + 1], bl = px[i * 4 + 2];
      L[i] = Math.min(1, Math.max(0, ((0.2126 * r + 0.7152 * g + 0.0722 * bl) / 255 - 0.5) * P.contrast + 0.5));
      /* couleur du point : couleur de la cellule éclaircie */
      C[i * 3] = r + (255 - r) * 0.6; C[i * 3 + 1] = g + (255 - g) * 0.6; C[i * 3 + 2] = bl + (255 - bl) * 0.6;
    }
    var T = new Float32Array(cols * rows);
    for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++) {
      var k = y * cols + x;
      var ex = Math.abs(L[y * cols + Math.min(cols - 1, x + 1)] - L[y * cols + Math.max(0, x - 1)]);
      var ey = Math.abs(L[Math.min(rows - 1, y + 1) * cols + x] - L[Math.max(0, y - 1) * cols + x]);
      var v = Math.min(1, L[k] + (ex + ey) * P.edge);
      T[k] = P.invert ? 1 - v : v;
    }

    /* 3 variantes de trame (cellules tirées différemment) avec aberration et halo intégrés */
    variants = [];
    for (var n = 0; n < 3; n++) {
      var raw = mk(W, H), rc = raw.getContext("2d");
      var id = rc.createImageData(W, H), d = id.data;
      for (var cy = 0; cy < rows; cy++) for (var cx = 0; cx < cols; cx++) {
        var ci = cy * cols + cx;
        if (rand(ci * 7.13 + n * 101.7) > P.coverage) continue;
        var lum = T[ci];
        if (lum < 0.04) continue;
        var x0 = cx * P.cell, y0 = cy * P.cell;
        var x1 = Math.min(W, x0 + P.cell - 1), y1 = Math.min(H, y0 + P.cell - 1);
        for (var yy = y0; yy < y1; yy++) {
          var sy = ((yy - y0) / P.sub | 0) & 3;
          for (var xx = x0; xx < x1; xx++) {
            var sx = ((xx - x0) / P.sub | 0) & 3;
            if (BAYER[sy * 4 + sx] / 16 >= lum) continue;
            var o = (yy * W + xx) * 4;
            d[o] = C[ci * 3]; d[o + 1] = C[ci * 3 + 1]; d[o + 2] = C[ci * 3 + 2]; d[o + 3] = 255;
          }
        }
      }
      rc.putImageData(id, 0, 0);

      var v = mk(W, H), vc = v.getContext("2d");
      /* aberration chromatique : copies rouge et bleue décalées */
      var off = Math.max(1, Math.round(P.chroma * 5));
      ["#ff2d55", "#2d7bff"].forEach(function (col, j) {
        var t = mk(W, H), tc = t.getContext("2d");
        tc.drawImage(raw, 0, 0);
        tc.globalCompositeOperation = "source-in";
        tc.fillStyle = col;
        tc.fillRect(0, 0, W, H);
        vc.globalAlpha = 0.55;
        vc.globalCompositeOperation = "lighter";
        vc.drawImage(t, j === 0 ? -off : off, 0);
      });
      vc.globalAlpha = 1;
      vc.globalCompositeOperation = "source-over";
      vc.drawImage(raw, 0, 0);
      /* halo (bloom) */
      vc.globalCompositeOperation = "lighter";
      vc.globalAlpha = P.bloom * 0.7;
      vc.filter = "blur(" + Math.round(P.cell * 0.45) + "px)";
      vc.drawImage(raw, 0, 0);
      vc.filter = "none";
      variants.push(v);
    }

    /* Calque du dessus : lignes de balayage + vignette */
    over = mk(W, H);
    var oc = over.getContext("2d");
    oc.fillStyle = "rgba(0,0,0," + P.scan * 0.55 + ")";
    for (var sl = 0; sl < H; sl += 3) oc.fillRect(0, sl, W, 1);
    var gr = oc.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.25, W / 2, H / 2, Math.hypot(W, H) * 0.6);
    gr.addColorStop(0, "rgba(0,0,0,0)");
    gr.addColorStop(1, "rgba(0,0,0," + P.vignette * 1.6 + ")");
    oc.fillStyle = gr;
    oc.fillRect(0, 0, W, H);

    /* Grain : 3 tuiles de bruit qui alternent */
    if (!grains.length) {
      for (var g2 = 0; g2 < 3; g2++) {
        var gt = mk(160, 160), gc = gt.getContext("2d"), gd = gc.createImageData(160, 160);
        for (var q = 0; q < gd.data.length; q += 4) {
          var nv = Math.random() * 255;
          gd.data[q] = gd.data[q + 1] = gd.data[q + 2] = nv; gd.data[q + 3] = 255;
        }
        gc.putImageData(gd, 0, 0);
        grains.push(ctx.createPattern(gt, "repeat"));
      }
    }
  }

  function draw() {
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.drawImage(base, 0, 0);

    /* flicker : on change parfois de variante et l'intensité vacille */
    if (Math.random() < 0.04 + P.flicker * 0.15) vi = (vi + 1 + (Math.random() * 2 | 0)) % variants.length;
    ctx.globalCompositeOperation = "overlay";
    ctx.globalAlpha = 1 - P.flicker * 0.35 * Math.random();
    ctx.drawImage(variants[vi], 0, 0);
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = 0.15;
    ctx.drawImage(variants[vi], 0, 0);

    /* glitch : quelques bandes horizontales décalées de temps en temps */
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    if (Math.random() < P.glitch * 0.6) {
      var n = 1;
      for (var i = 0; i < n; i++) {
        var y = Math.random() * H, h = 3 + Math.random() * 10, dx = (Math.random() - 0.5) * 20;
        ctx.drawImage(canvas, 0, y, W, h, dx, y, W, h);
      }
    }

    /* teinte indigo en overlay */
    ctx.globalCompositeOperation = "overlay";
    ctx.globalAlpha = P.tintOpacity;
    ctx.fillStyle = P.tint;
    ctx.fillRect(0, 0, W, H);

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.drawImage(over, 0, 0);

    /* grain */
    ctx.globalCompositeOperation = "overlay";
    ctx.globalAlpha = P.grain * 0.5;
    ctx.fillStyle = grains[gi = (gi + 1) % grains.length];
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
  }

  function loop(t) {
    raf = requestAnimationFrame(loop);
    if (t - last < 1000 / P.fps) return;
    last = t;
    draw();
  }
  function start() { if (!running && visible && !reduce && variants.length) { running = true; raf = requestAnimationFrame(loop); } }
  function stop() { running = false; cancelAnimationFrame(raf); }

  function source() {
    return window.innerWidth < window.innerHeight ? canvas.dataset.srcPortrait : canvas.dataset.src;
  }
  function init() {
    load(source()).then(function (img) {
      stop();
      build(img);
      draw();
      canvas.classList.add("is-ready");
      start();
    });
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) {
      visible = e[0].isIntersecting;
      if (visible) start(); else stop();
    }).observe(canvas);
  }

  var rt = 0, lastW = window.innerWidth;
  window.addEventListener("resize", function () {
    /* sur téléphone, la barre d'adresse change la hauteur au scroll : on ne reconstruit
       que si la largeur change */
    if (window.innerWidth === lastW && Math.abs(canvas.clientHeight - H) < 120) return;
    lastW = window.innerWidth;
    clearTimeout(rt);
    rt = setTimeout(init, 200);
  });

  init();
})();
