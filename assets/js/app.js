/* ==========================================================================
   REAL OLIMPIA TERLIZZI — logica del sito (vanilla JS, zero dipendenze)
   Legge i contenuti da assets/js/data.js e popola le pagine.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------ UTILITY */
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const has = (v) => v !== null && v !== undefined && v !== "";
  const val = (v, fb) => (has(v) ? v : (fb === undefined ? "&ndash;" : fb));

  const MESI = ["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"];
  const MESI_LUNGHI = ["gennaio","febbraio","marzo","aprile","maggio","giugno",
                       "luglio","agosto","settembre","ottobre","novembre","dicembre"];
  const GIORNI = ["Domenica","Lunedi","Martedi","Mercoledi","Giovedi","Venerdi","Sabato"];

  const parseData = (s) => {
    if (!s) return null;
    const d = new Date(String(s).replace(" ", "T"));
    return isNaN(d.getTime()) ? null : d;
  };
  const fmtGiorno = (d) => (d ? String(d.getDate()).padStart(2, "0") : "--");
  const fmtMese   = (d) => (d ? MESI[d.getMonth()] : "");
  const fmtLungo  = (d) => (d ? `${GIORNI[d.getDay()]} ${d.getDate()} ${MESI_LUNGHI[d.getMonth()]} ${d.getFullYear()}` : "");
  const fmtOra    = (d) => (d ? `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}` : "");

  const isNoi = (nome) => /real\s*olimpia/i.test(String(nome || ""));
  const mq = (q) => (typeof window.matchMedia === "function" ? window.matchMedia(q) : { matches: false });
  const desktop = () => mq("(min-width:1024px)").matches;
  const motionOk = () => !mq("(prefers-reduced-motion:reduce)").matches;

  const ICONE = {
    calendario:'<svg viewBox="0 0 24 24"><path d="M7 2v2H4v18h16V4h-3V2h-2v2H9V2H7zm11 8v10H6V10h12z"/></svg>',
    luogo:'<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>',
    trofeo:'<svg viewBox="0 0 24 24"><path d="M18 3V1H6v2H2v4a5 5 0 004 4.9A6 6 0 0011 16v3H7v2h10v-2h-4v-3a6 6 0 005-4.1A5 5 0 0022 7V3h-4zM4 7V5h2v4.8A3 3 0 014 7zm16 0a3 3 0 01-2 2.8V5h2v2z"/></svg>',
    casa:'<svg viewBox="0 0 24 24"><path d="M12 3l9 8h-3v10h-5v-6h-2v6H6V11H3z"/></svg>',
    maglia:'<svg viewBox="0 0 24 24"><path d="M9 2L4 4.5 5.5 10 8 9.3V22h8V9.3l2.5.7L20 4.5 15 2a3 3 0 01-6 0z"/></svg>',
    palla:'<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2.2l3 2.2-1.1 3.4h-3.8L9 6.4l3-2.2zM5 9.8l2.8-.9 1.2 3.4-2.4 2.3-2-2.3.4-2.5zm2.7 8.2l1-2.9h6.6l1 2.9A7.8 7.8 0 0112 20a7.8 7.8 0 01-4.3-2zm9-3.4l-2.4-2.3 1.2-3.4 2.8.9.4 2.5-2 2.3z"/></svg>',
    lista:'<svg viewBox="0 0 24 24"><path d="M4 5h16v3H4zm0 5.5h16v3H4zM4 16h16v3H4z"/></svg>',
    menu:'<svg viewBox="0 0 24 24"><path d="M3 6h18v2.4H3zm0 5.3h18v2.4H3zM3 16.6h18V19H3z"/></svg>',
    foto:'<svg viewBox="0 0 24 24"><path d="M21 5H3v14h18V5zm-2 10.5L15.5 11 12 15l-2-2.4L6.5 17H19v-1.5zM8 10a1.6 1.6 0 100-3.2A1.6 1.6 0 008 10z"/></svg>',
    ig:'<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.23 1 .5 1.4.95.45.44.72.83.95 1.4.17.4.36 1 .42 2.2.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2a3.8 3.8 0 01-.95 1.4c-.44.45-.83.72-1.4.95-.4.17-1 .36-2.2.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42a3.8 3.8 0 01-1.4-.95 3.8 3.8 0 01-.95-1.4c-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.23-.6.5-1 .95-1.4.44-.45.83-.72 1.4-.95.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2zm0 3.2a6.6 6.6 0 100 13.2 6.6 6.6 0 000-13.2zm0 10.9a4.3 4.3 0 110-8.6 4.3 4.3 0 010 8.6zm8.4-11.2a1.54 1.54 0 11-3.08 0 1.54 1.54 0 013.08 0z"/></svg>',
    fb:'<svg viewBox="0 0 24 24"><path d="M14 9h3V6h-3a4 4 0 00-4 4v2H8v3h2v7h3v-7h2.5l.5-3H13v-2a1 1 0 011-1z"/></svg>',
    su:'<svg viewBox="0 0 24 24"><path d="M12 5l8 8-1.4 1.4L12 7.8l-6.6 6.6L4 13z"/></svg>',
    mail:'<svg viewBox="0 0 24 24"><path d="M2 4h20v16H2V4zm2 2v.6l8 5.4 8-5.4V6H4zm0 3v9h16V9l-8 5.4L4 9z"/></svg>'
  };

  /* -------------------------------------------------- 1. NAV / UI GLOBALE */
  function initNav() {
    const toggle = $(".nav-toggle");
    const nav = $(".nav");
    if (!toggle || !nav) return;

    const backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    document.body.appendChild(backdrop);

    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      backdrop.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    backdrop.addEventListener("click", () => setOpen(false));
    $$(".nav__list a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    window.addEventListener("resize", () => { if (window.innerWidth > 900) setOpen(false); });
  }

  function initHeaderScroll() {
    const header = $(".site-header");
    const top = $(".to-top");
    if (!header && !top) return;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (header) header.classList.toggle("is-scrolled", y > 40);
        if (top) top.classList.toggle("is-visible", y > 600);
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (top) top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: motionOk() ? "smooth" : "auto" }));
  }

  function initReveal() {
    const els = $$(".reveal");
    if (!els.length) return;
    if (!CONFIG.features.revealAnimazioni || !desktop() || !motionOk() || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach((el) => io.observe(el));
  }

  function initStatBars() {
    const bars = $$(".stat-bar__fill");
    if (!bars.length) return;
    const set = (b) => { b.style.width = (b.dataset.value || 0) + "%"; };
    if (!("IntersectionObserver" in window) || !motionOk()) { bars.forEach(set); return; }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { set(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.3 });
    bars.forEach((b) => io.observe(b));
  }

  /* ----------------------------------------- 2. TESTI GLOBALI E SEGNAPOSTO */
  function fillGlobals() {
    $$("[data-site]").forEach((el) => {
      const map = {
        nome: SITE.nome, nomeBreve: SITE.nomeBreve, stagione: SITE.stagione,
        campionato: SITE.campionato, girone: SITE.girone, citta: SITE.citta,
        stadio: SITE.stadio.nome, stadioCitta: SITE.stadio.citta,
        stadioIndirizzo: SITE.stadio.indirizzo, stadioNota: SITE.stadio.nota,
        email: SITE.contatti.email, telefono: SITE.contatti.telefono,
        anno: String(new Date().getFullYear()), soprannome: SITE.soprannome
      };
      const v = map[el.dataset.site];
      if (has(v)) el.textContent = v;
      else if (el.dataset.siteHide === "true") el.hidden = true;
    });

    $$("[data-href]").forEach((el) => {
      const map = {
        instagram: SITE.social.instagram, facebook: SITE.social.facebook,
        email: "mailto:" + SITE.contatti.email,
        telefono: SITE.contatti.telefono ? "tel:" + SITE.contatti.telefono.replace(/\s/g, "") : "",
        maps: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(SITE.stadio.mapsQuery),
        tuttocampo: CONFIG.tuttocampoUrl || "https://www.tuttocampo.it"
      };
      const v = map[el.dataset.href];
      if (has(v)) el.setAttribute("href", v); else el.remove();
    });

    $$("[data-tc]").forEach((f) => {
      f.src = CONFIG.tuttocampoWidget + "/" + f.dataset.tc + "/" + CONFIG.tuttocampoId;
    });
  }

  /* ------------------------------------------- 3. PARTITE / PROSSIMA GARA */
  const partiteOrdinate = () =>
    (typeof PARTITE !== "undefined" ? PARTITE.slice() : [])
      .filter((p) => parseData(p.data))
      .sort((a, b) => parseData(b.data) - parseData(a.data));

  function classeEsito(p) {
    if (p.esito === "V") return "match-row--w";
    if (p.esito === "P") return "match-row--l";
    if (p.esito === "N") return "match-row--d";
    return "match-row--next";
  }

  function generaUrlTuttocampo(p) {
    if (!p) return CONFIG.tuttocampoUrl || "https://www.tuttocampo.it";
    if (p.urlTuttocampo) return p.urlTuttocampo;
    let stagione = "2026-27";
    if (p.data) {
      const parts = String(p.data).split("-");
      if (parts.length >= 2) {
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10);
        if (!isNaN(y) && !isNaN(m)) {
          if (m >= 7) {
            stagione = y + "-" + String((y + 1) % 100).padStart(2, "0");
          } else {
            stagione = (y - 1) + "-" + String(y % 100).padStart(2, "0");
          }
        }
      }
    }
    const numGiornata = p.giornata ? (String(p.giornata).match(/\d+/) || [""])[0] : "";
    const slugify = (str) =>
      String(str || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    const slugCasa = slugify(p.casa);
    const slugOspite = slugify(p.ospite);
    if (numGiornata && slugCasa && slugOspite) {
      return "https://www.tuttocampo.it/" + stagione + "/Puglia/BA/PrimaCategoria/GironeA/Partita/" + numGiornata + ".1/" + slugCasa + "-" + slugOspite;
    }
    if (numGiornata) {
      return "https://www.tuttocampo.it/" + stagione + "/Puglia/BA/PrimaCategoria/GironeA/Giornata/" + numGiornata;
    }
    return "https://www.tuttocampo.it/" + stagione + "/Puglia/PrimaCategoria/GironeA/Risultati";
  }

  const urlTuttocampo = (p) => generaUrlTuttocampo(p);

  function rigaPartita(p) {
    const d = parseData(p.data);
    const giocata = has(p.gc) && has(p.go);
    const score = giocata
      ? '<span class="match-row__score">' + p.gc + " - " + p.go + "</span>"
      : '<span class="match-row__score match-row__score--tbd">' + (d && fmtOra(d) !== "00:00" ? fmtOra(d) : "da giocare") + "</span>";

    const meta = esc(p.comp || "") +
      (p.giornata ? " &middot; " + esc(p.giornata) : "") +
      (p.campo ? " &middot; " + esc(p.campo) : "");

    const linkPartita = urlTuttocampo(p);
    const cliccabile = CONFIG.features.partiteCliccabili && has(linkPartita);
    const etichetta = esc(p.casa) + " contro " + esc(p.ospite);

    return '<div class="match-row ' + classeEsito(p) + (cliccabile ? " match-row--link" : "") + ' reveal">' +
      (cliccabile
        ? '<a class="match-row__stretch" href="' + esc(linkPartita) + '" target="_blank" rel="noopener" ' +
          'aria-label="Apri la partita su Tuttocampo: ' + etichetta + '"></a>'
        : "") +
      '<span class="match-row__date"><b>' + fmtGiorno(d) + "</b><span>" + fmtMese(d) + " " + (d ? d.getFullYear() : "") + "</span></span>" +
      "<span>" +
        '<span class="match-row__teams">' +
          '<span class="match-row__team' + (isNoi(p.casa) ? " home" : "") + '">' + crest(p.casa, 26) + "<span>" + esc(p.casa) + "</span></span>" +
          '<span class="match-row__sep">vs</span>' +
          '<span class="match-row__team' + (isNoi(p.ospite) ? " home" : "") + '">' + crest(p.ospite, 26) + "<span>" + esc(p.ospite) + "</span></span>" +
        "</span>" +
        '<span class="match-row__meta">' + meta +
          (p.marcatori ? "<br><b>Marcatori:</b> " + esc(p.marcatori) : "") +
        "</span>" +
      "</span>" +
      '<span class="match-row__actions">' +
        score +
        '<span class="match-row__links">' +
          (cliccabile ? '<span class="match-row__cta">Partita &rarr;</span>' : "") +
          '<a class="match-row__tc" href="' + esc(urlTuttocampo(p)) + '" target="_blank" rel="noopener" ' +
          'title="Apri su Tuttocampo">TC</a>' +
        "</span>" +
      "</span>" +
    "</div>";
  }

  function renderPartite() {
    const box = $('[data-render="partite"]');
    if (!box) return;
    const limite = parseInt(box.dataset.limite || "0", 10);
    let lista = partiteOrdinate();
    if (limite > 0) lista = lista.slice(0, limite);
    box.innerHTML = lista.length
      ? lista.map(rigaPartita).join("")
      : '<p class="muted">Calendario in arrivo: appena la stagione parte, i risultati compaiono qui.</p>';
  }

  function renderForma() {
    const box = $('[data-render="forma"]');
    if (!box) return;
    const ultime = partiteOrdinate().filter((p) => has(p.esito)).slice(0, 5).reverse();
    if (!ultime.length) { box.innerHTML = '<span class="muted">&ndash;</span>'; return; }
    box.innerHTML = ultime.map((p) => {
      const c = p.esito === "V" ? "v" : p.esito === "N" ? "n" : "p";
      const tit = esc(p.casa) + " " + val(p.gc, "") + "-" + val(p.go, "") + " " + esc(p.ospite);
      return '<i class="' + c + '" title="' + tit + '">' + p.esito + "</i>";
    }).join("");
  }

  const slug = (s) => String(s || "")
    .toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  function iniziali(nome, max) {
    return String(nome || "?").trim().split(/\s+/)
      .filter((w) => w.length > 2 || /^[A-Z]/.test(w))
      .map((w) => w[0]).join("").slice(0, max || 3).toUpperCase();
  }

  /* Logo squadra: 1) file locale assets/images/squadre/<slug>.png
                   2) indirizzo indicato in LOGHI_SQUADRE
                   3) tondo con le iniziali (fallback automatico via onerror) */
  function crest(nome, dim) {
    const d = dim || 60;
    if (isNoi(nome)) return '<img src="assets/images/logo.png" alt="' + esc(nome) + '" width="' + d + '" height="' + d + '" loading="lazy">';
    const ini = iniziali(nome);
    const ph = '<span class="crest-ph" aria-hidden="true" style="width:' + d + "px;height:" + d + 'px">' + esc(ini) + "</span>";
    if (!CONFIG.features.logoAvversarie) return ph;
    const tabella = (typeof LOGHI_SQUADRE !== "undefined" ? LOGHI_SQUADRE : {});
    const esterno = tabella[nome] || tabella[String(nome || "").trim()];
    const catena = ["assets/images/squadre/" + slug(nome) + ".png"];
    if (has(esterno)) catena.push(esterno);
    const fb = "this.onerror=null;this.outerHTML=" + JSON.stringify(ph) + ";";
    const passo = catena.length > 1
      ? "this.onerror=function(){" + fb + "};this.src=" + JSON.stringify(catena[1]) + ";"
      : fb;
    return '<img class="crest-img" src="' + esc(catena[0]) + '" alt="' + esc(nome) +
           '" width="' + d + '" height="' + d + '" loading="lazy" onerror="' + esc(passo) + '">';
  }

  function countdownHtml() {
    const celle = ["giorni", "ore", "minuti", "secondi"].map((u) =>
      '<div class="countdown__cell"><b data-cd="' + u + '">00</b><span>' + u + "</span></div>").join("");
    return '<div class="countdown" data-countdown>' + celle + "</div>";
  }

  function avviaCountdown(target) {
    const set = (u, v) => { const el = $('[data-cd="' + u + '"]'); if (el) el.textContent = String(v).padStart(2, "0"); };
    let timer = null;
    const tick = () => {
      let diff = Math.max(0, target - new Date());
      const g = Math.floor(diff / 86400000); diff -= g * 86400000;
      const o = Math.floor(diff / 3600000);  diff -= o * 3600000;
      const m = Math.floor(diff / 60000);    diff -= m * 60000;
      const s = Math.floor(diff / 1000);
      set("giorni", g); set("ore", o); set("minuti", m); set("secondi", s);
      if (target - new Date() <= 0 && timer) clearInterval(timer);
    };
    tick();
    timer = setInterval(tick, 1000);
  }

  function renderProssima() {
    const box = $('[data-render="prossima"]');
    if (!box) return;
    const p = (typeof PROSSIMA_PARTITA !== "undefined" && PROSSIMA_PARTITA) ? PROSSIMA_PARTITA : null;

    if (p) {
      const d = parseData(p.data);
      const conCd = CONFIG.features.countdown && d && d > new Date();
      box.innerHTML =
        '<div class="match-card__top">' +
          '<span class="match-card__label">Prossima partita</span>' +
          '<span class="badge badge--rosso">' + esc(p.giornata || SITE.campionato) + "</span>" +
        "</div>" +
        '<div class="match-card__teams">' +
          '<div class="match-card__team">' + crest(p.casa) + "<b>" + esc(p.casa) + "</b></div>" +
          '<div class="match-card__vs">VS</div>' +
          '<div class="match-card__team">' + crest(p.ospite) + "<b>" + esc(p.ospite) + "</b></div>" +
        "</div>" +
        '<div class="match-card__meta">' +
          "<div>" + ICONE.calendario + "<span>" + fmtLungo(d) + (fmtOra(d) ? " &middot; ore " + fmtOra(d) : "") + "</span></div>" +
          "<div>" + ICONE.luogo + "<span>" + esc(p.campo || SITE.stadio.nome + ", " + SITE.stadio.citta) + "</span></div>" +
          "<div>" + ICONE.trofeo + "<span>" + esc(p.competizione || SITE.campionato) + "</span></div>" +
        "</div>" + (conCd ? countdownHtml() : "");
      if (conCd) avviaCountdown(d);
      return;
    }

    const u = partiteOrdinate()[0];
    const sp = typeof STAGIONE_PRECEDENTE !== "undefined" ? STAGIONE_PRECEDENTE : null;
    let html =
      '<div class="match-card__top">' +
        '<span class="match-card__label">Calendario in definizione</span>' +
        '<span class="badge badge--blu">' + esc(SITE.stagione) + "</span>" +
      "</div>";
    if (u) {
      html +=
        '<div class="match-card__teams">' +
          '<div class="match-card__team">' + crest(u.casa) + "<b>" + esc(u.casa) + "</b></div>" +
          '<div class="match-card__vs">' + val(u.gc, "") + "-" + val(u.go, "") + "</div>" +
          '<div class="match-card__team">' + crest(u.ospite) + "<b>" + esc(u.ospite) + "</b></div>" +
        "</div>" +
        '<div class="match-card__meta">' +
          "<div>" + ICONE.calendario + "<span>Ultima gara disputata: " + fmtLungo(parseData(u.data)) + "</span></div>" +
          "<div>" + ICONE.trofeo + "<span>" + esc(u.comp || "") + "</span></div>" +
          (sp ? "<div>" + ICONE.luogo + "<span>" + esc(sp.etichetta) + ": " + sp.posizione + "&deg; posto con " + sp.punti + " punti</span></div>" : "") +
        "</div>";
    } else {
      html += '<p class="muted">Il calendario ufficiale sara pubblicato a breve.</p>';
    }
    html += '<p class="muted" style="margin-top:18px;font-size:.85rem">Appena pubblicato il calendario ' +
            esc(SITE.stagione) + ", qui compaiono avversario, data e countdown della prossima gara.</p>";
    box.innerHTML = html;
  }

  /* ----------------------------------------------------- 4. ROSA E STAFF */
  const SILHOUETTE =
    '<svg class="player__silhouette" viewBox="0 0 100 120" aria-hidden="true">' +
    '<circle cx="50" cy="30" r="20"/><path d="M50 55c-20 0-34 14-34 33v32h68V88c0-19-14-33-34-33z"/></svg>';

  const RUOLI = ["Tutti", "Portiere", "Difensore", "Centrocampista", "Attaccante", "Movimento"];

  function cardGiocatore(g, i) {
    const nomeCompleto = (g.nome || "") + " " + (g.cognome || "");
    const foto = has(g.foto)
      ? '<img src="' + esc(g.foto) + '" alt="' + esc(nomeCompleto) + '" loading="lazy">'
      : SILHOUETTE;
    return '<button class="player reveal" data-delay="' + (i % 4) + '" data-giocatore="' + i + '" type="button" aria-label="Scheda di ' + esc(nomeCompleto) + '">' +
      '<span class="player__num">' + (has(g.numero) ? g.numero : "") + "</span>" +
      '<span class="player__media">' + foto + "</span>" +
      '<span class="player__info">' +
        '<span class="player__role">' + esc(g.ruolo || "Rosa") + (g.capitano ? " &middot; Capitano" : "") + "</span>" +
        '<span class="player__name">' + esc(g.cognome || "") + "<small>" + esc(g.nome || "") + "</small></span>" +
        '<span class="player__stats">' +
          "<div>Pres.<b>" + val(g.presenze) + "</b></div>" +
          "<div>Gol<b>" + val(g.gol) + "</b></div>" +
          "<div>Anno<b>" + val(g.anno) + "</b></div>" +
        "</span>" +
      "</span></button>";
  }

  function renderRosa() {
    const box = $('[data-render="rosa"]');
    if (!box) return;
    const rosa = typeof ROSA !== "undefined" ? ROSA : [];
    const filtri = $('[data-render="filtri-ruolo"]');

    const disegna = (ruolo) => {
      const lista = rosa.filter((g) => ruolo === "Tutti" || g.ruolo === ruolo);
      box.innerHTML = lista.length
        ? lista.map(cardGiocatore).join("")
        : '<p class="muted">Nessun giocatore in questa categoria.</p>';
      /* ricollega i riferimenti reali (l indice deve puntare alla rosa completa) */
      $$("[data-giocatore]", box).forEach((btn, k) => {
        btn.dataset.giocatore = String(rosa.indexOf(lista[k]));
        btn.addEventListener("click", () => apriModale(rosa[rosa.indexOf(lista[k])]));
      });
      initReveal();
    };

    if (filtri) {
      const presenti = RUOLI.filter((r) => r === "Tutti" || rosa.some((g) => g.ruolo === r));
      filtri.innerHTML = presenti.map((r, i) =>
        '<button type="button" class="' + (i === 0 ? "is-active" : "") + '" data-ruolo="' + r + '">' + r + "</button>").join("");
      $$("button", filtri).forEach((b) => b.addEventListener("click", () => {
        $$("button", filtri).forEach((x) => x.classList.remove("is-active"));
        b.classList.add("is-active");
        disegna(b.dataset.ruolo);
      }));
    }
    disegna("Tutti");

    const avviso = $('[data-render="avviso-rosa"]');
    if (avviso && typeof ROSA_IN_AGGIORNAMENTO !== "undefined" && !ROSA_IN_AGGIORNAMENTO) avviso.hidden = true;
  }

  function apriModale(g) {
    let modal = $("#modale-giocatore");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "modale-giocatore";
      modal.className = "modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.innerHTML = '<div class="modal__box"><button class="modal__close" type="button" aria-label="Chiudi">&times;</button><div data-modal-content></div></div>';
      document.body.appendChild(modal);
      modal.addEventListener("click", (e) => { if (e.target === modal) chiudiModale(); });
      $(".modal__close", modal).addEventListener("click", chiudiModale);
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") chiudiModale(); });
    }
    const nomeCompleto = (g.nome || "") + " " + (g.cognome || "");
    $("[data-modal-content]", modal).innerHTML =
      '<div class="modal__head">' +
        '<span class="num">' + (has(g.numero) ? g.numero : "&mdash;") + "</span>" +
        "<div><div style=\"font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:#F03A48;font-weight:700\">" +
          esc(g.ruolo || "Rosa") + (g.capitano ? " &middot; Capitano" : "") + "</div>" +
          '<h2 style="font-size:2rem;margin-top:4px">' + esc(nomeCompleto) + "</h2></div>" +
      "</div>" +
      '<div class="modal__grid">' +
        "<div><span>Presenze</span><b>" + val(g.presenze) + "</b></div>" +
        "<div><span>Gol</span><b>" + val(g.gol) + "</b></div>" +
        "<div><span>Anno</span><b>" + val(g.anno) + "</b></div>" +
        "<div><span>Piede</span><b>" + val(g.piede) + "</b></div>" +
        "<div><span>Altezza</span><b>" + val(g.altezza) + "</b></div>" +
      "</div>" +
      '<div class="modal__body">' +
        "<p>" + (has(g.nota) ? esc(g.nota) : "Scheda in aggiornamento: statistiche e dati anagrafici saranno completati durante la stagione.") + "</p>" +
      "</div>";
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    $(".modal__close", modal).focus();
  }

  function chiudiModale() {
    const m = $("#modale-giocatore");
    if (!m) return;
    m.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function renderStaff() {
    const box = $('[data-render="staff"]');
    if (!box || typeof STAFF === "undefined") return;
    box.innerHTML = STAFF.map((s, i) => {
      const ini = String(s.nome || "?").trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
      const av = has(s.foto)
        ? '<img src="' + esc(s.foto) + '" alt="' + esc(s.nome) + '" loading="lazy">'
        : esc(ini);
      return '<div class="staff reveal" data-delay="' + (i % 4) + '">' +
        '<div class="staff__avatar">' + av + "</div>" +
        "<div><div class=\"staff__role\">" + esc(s.ruolo) + "</div>" +
        '<div class="staff__name">' + esc(s.nome) + "</div>" +
        (has(s.bio) ? '<p class="muted" style="font-size:.86rem;margin-top:6px">' + esc(s.bio) + "</p>" : "") +
        "</div></div>";
    }).join("");
  }

  function renderStoria() {
    const box = $('[data-render="storia"]');
    if (!box || typeof STORIA === "undefined") return;
    box.innerHTML = STORIA.map((t) =>
      '<li class="reveal"><div class="anno">' + esc(t.anno) + "</div>" +
      '<h3 style="font-size:1.15rem;margin:4px 0 6px">' + esc(t.titolo) + "</h3>" +
      "<p>" + esc(t.testo) + "</p></li>").join("");
  }

  function renderSponsor() {
    const box = $('[data-render="sponsor"]');
    if (box && typeof SPONSOR !== "undefined") {
      box.innerHTML = SPONSOR.map((s) => {
        const inner = has(s.logo)
          ? '<img src="' + esc(s.logo) + '" alt="' + esc(s.nome) + '" loading="lazy">'
          : '<span class="sponsor-tile__txt">' + esc(s.nome) + "</span>";
        const cls = "sponsor-tile reveal" + (s.tipo === "main" ? " sponsor-tile--main" : "");
        return has(s.url)
          ? '<a class="' + cls + '" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + inner + "</a>"
          : '<div class="' + cls + '">' + inner + "</div>";
      }).join("");
    }

    const pack = $('[data-render="pacchetti"]');
    if (pack && typeof PACCHETTI_SPONSOR !== "undefined") {
      pack.innerHTML = PACCHETTI_SPONSOR.map((p, i) =>
        '<div class="card reveal" data-delay="' + (i % 4) + '"><div class="card__body">' +
        '<div class="badge ' + (i === 0 ? "badge--rosso" : i === 1 ? "badge--oro" : "badge--blu") + '">' + esc(p.titolo) + "</div>" +
        '<ul style="margin-top:14px;display:grid;gap:8px;font-size:.92rem">' +
        p.voci.map((v) => '<li style="display:flex;gap:8px"><span style="color:#D81E2C;font-weight:800">&#10003;</span><span>' + esc(v) + "</span></li>").join("") +
        "</ul></div></div>").join("");
    }

    const mq = $('[data-render="marquee"]');
    if (mq && typeof SPONSOR !== "undefined" && SPONSOR.length) {
      const nomi = SPONSOR.map((s) => "<span>" + esc(s.nome) + "</span>").join("");
      mq.innerHTML = nomi + nomi;
    }
  }

  function renderFaq() {
    const box = $('[data-render="faq"]');
    if (!box || typeof FAQ === "undefined") return;
    box.innerHTML = FAQ.map((f) =>
      '<details class="acc reveal"><summary>' + esc(f.d) + "</summary>" +
      '<div class="acc__body">' + esc(f.r) + "</div></details>").join("");
  }

  /* ---------------------------------------------- galleria + lightbox */
  let LB = null, LB_LISTA = [], LB_IDX = 0;

  function creaLightbox() {
    if (LB) return LB;
    LB = document.createElement("div");
    LB.className = "lightbox";
    LB.innerHTML =
      '<img alt="">' +
      '<button class="lightbox__close" type="button" aria-label="Chiudi">&times;</button>' +
      '<button class="lightbox__prev" type="button" aria-label="Foto precedente">&lsaquo;</button>' +
      '<button class="lightbox__next" type="button" aria-label="Foto successiva">&rsaquo;</button>';
    document.body.appendChild(LB);
    LB.addEventListener("click", (e) => { if (e.target === LB) chiudiLightbox(); });
    $(".lightbox__close", LB).addEventListener("click", chiudiLightbox);
    $(".lightbox__prev", LB).addEventListener("click", () => vaiLightbox(-1));
    $(".lightbox__next", LB).addEventListener("click", () => vaiLightbox(1));
    document.addEventListener("keydown", (e) => {
      if (!LB.classList.contains("is-open")) return;
      if (e.key === "Escape") chiudiLightbox();
      if (e.key === "ArrowLeft") vaiLightbox(-1);
      if (e.key === "ArrowRight") vaiLightbox(1);
    });
    return LB;
  }

  function mostraLightbox(lista, idx) {
    LB_LISTA = lista; LB_IDX = idx;
    const box = creaLightbox();
    const img = $("img", box);
    img.src = lista[idx].src;
    img.alt = lista[idx].alt || "";
    box.classList.add("is-open");
    document.body.style.overflow = "hidden";
    const nav = lista.length > 1;
    $(".lightbox__prev", box).hidden = !nav;
    $(".lightbox__next", box).hidden = !nav;
  }

  function vaiLightbox(d) {
    if (!LB_LISTA.length) return;
    LB_IDX = (LB_IDX + d + LB_LISTA.length) % LB_LISTA.length;
    mostraLightbox(LB_LISTA, LB_IDX);
  }

  function chiudiLightbox() {
    if (!LB) return;
    LB.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function renderGalleria() {
    const box = $('[data-render="galleria"]');
    if (!box) return;
    const g = (typeof GALLERIA !== "undefined" ? GALLERIA : []).filter((f) => has(f && f.src));
    if (!g.length) {
      box.innerHTML = '<p class="muted">Galleria in allestimento: carica le foto in ' +
        "<code>assets/images/gallery/</code> e aggiungile alla lista <code>GALLERIA</code> in <code>data.js</code>.</p>";
      return;
    }
    box.innerHTML = g.map((f, i) =>
      '<figure class="reveal" data-foto="' + i + '" tabindex="0" role="button" aria-label="Apri la foto">' +
      '<img src="' + esc(f.src) + '" alt="' + esc(f.alt || SITE.nome) + '" loading="lazy">' +
      (has(f.alt) ? "<figcaption>" + esc(f.alt) + "</figcaption>" : "") +
      "</figure>").join("");
    const lista = g.map((f) => ({ src: f.src, alt: f.alt || SITE.nome }));
    $$("[data-foto]", box).forEach((fig) => {
      const apri = () => mostraLightbox(lista, parseInt(fig.dataset.foto, 10));
      fig.addEventListener("click", apri);
      fig.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); apri(); } });
    });
    initReveal();
  }

  /* ------------------------------------------------------------- video */
  function idYoutube(u) {
    const s = String(u || "");
    const m = s.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : (/^[A-Za-z0-9_-]{11}$/.test(s) ? s : "");
  }

  function renderVideo() {
    const box = $('[data-render="video"]');
    if (!box) return;
    const v = (typeof VIDEO !== "undefined" ? VIDEO : []).filter((x) => idYoutube(x && (x.url || x.id)));
    if (!v.length) {
      box.innerHTML = '<p class="muted">Nessun video pubblicato: aggiungi i link YouTube alla lista ' +
        "<code>VIDEO</code> in <code>data.js</code> e compaiono qui.</p>";
      return;
    }
    box.innerHTML = v.map((x, i) => {
      const id = idYoutube(x.url || x.id);
      return '<div class="reveal" data-delay="' + (i % 4) + '">' +
        '<div class="video-card"><iframe src="https://www.youtube-nocookie.com/embed/' + esc(id) +
        '" title="' + esc(x.titolo || "Video") + '" loading="lazy" allowfullscreen ' +
        'allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>' +
        (has(x.titolo) ? '<p style="margin-top:10px;font-weight:600">' + esc(x.titolo) + "</p>" : "") +
        "</div>";
    }).join("");
    initReveal();
  }

  function renderRiepilogo() {
    const box = $('[data-render="riepilogo"]');
    if (!box || typeof STAGIONE_PRECEDENTE === "undefined") return;
    const s = STAGIONE_PRECEDENTE;
    const giocate = partiteOrdinate().filter((p) => has(p.esito));
    const v = giocate.filter((p) => p.esito === "V").length;
    const n = giocate.filter((p) => p.esito === "N").length;
    const pp = giocate.filter((p) => p.esito === "P").length;
    box.innerHTML =
      "<div><b>" + s.posizione + "&deg;</b><span>Posizione " + esc(s.etichetta) + "</span></div>" +
      "<div><b>" + s.punti + "</b><span>Punti</span></div>" +
      "<div><b>" + s.giornate + "</b><span>Giornate</span></div>" +
      "<div><b>" + (v + n + pp) + "</b><span>Gare in archivio</span></div>";
  }

  /* -------------------------------------------------------- 5. NOTIZIE RSS */
  function testoNotizia(n) {
    return ((n.titolo || "") + " " + (n.estratto || "") + " " + (n.categorie || []).join(" ")).toLowerCase();
  }

  function contiene(txt, parole) {
    return (parole || []).some((k) => txt.indexOf(String(k).toLowerCase()) !== -1);
  }

  function stripTag(html) {
    const d = document.createElement("div");
    d.innerHTML = String(html || "");
    return (d.textContent || "").replace(/\s+/g, " ").trim();
  }

  async function leggiFeed(fonte) {
    const tentativi = fonte.cors
      ? [fonte.url].concat(CONFIG.news.proxy.map((p) => p + encodeURIComponent(fonte.url)))
      : CONFIG.news.proxy.map((p) => p + encodeURIComponent(fonte.url)).concat([fonte.url]);

    for (const url of tentativi) {
      try {
        const r = await fetch(url, { cache: "no-store" });
        if (!r.ok) continue;
        const txt = await r.text();
        const xml = new DOMParser().parseFromString(txt, "text/xml");
        if (xml.querySelector("parsererror")) continue;
        const items = Array.from(xml.querySelectorAll("item, entry"));
        if (!items.length) continue;
        return items.map((it) => {
          const g = (t) => { const e = it.querySelector(t); return e ? e.textContent : ""; };
          const link = g("link") || (it.querySelector("link") ? it.querySelector("link").getAttribute("href") : "");
          const thumb = it.querySelector("thumbnail, content[url], enclosure");
          return {
            titolo: stripTag(g("title")),
            url: String(link || "").trim(),
            data: g("pubDate") || g("published") || g("updated") || "",
            estratto: stripTag(g("description") || g("summary")).slice(0, 220),
            img: thumb ? (thumb.getAttribute("url") || "") : "",
            fonte: fonte.nome,
            sezioneSport: fonte.sezioneSport,
            categorieSport: fonte.categorieSport,
            categorie: Array.from(it.querySelectorAll("category")).map((c) => c.textContent.trim())
          };
        });
      } catch (e) { /* prova la sorgente successiva */ }
    }
    return [];
  }

  function filtraNotizie(lista, soloReal) {
    const c = CONFIG.news;
    return lista.filter((n) => {
      if (!n.titolo || !n.url) return false;
      const txt = testoNotizia(n);
      if (c.soloSport) {
        /* se la fonte ha una sezione sport nell indirizzo, quella e autorevole:
           evita che le parole chiave generiche facciano passare la cronaca */
        if (n.sezioneSport) {
          if (n.url.indexOf(n.sezioneSport) === -1) return false;
        } else {
          const byCat = n.categorieSport && contiene((n.categorie || []).join(" ").toLowerCase(), n.categorieSport);
          const byKey = contiene(txt, c.paroleChiaveSport);
          if (!byCat && !byKey) return false;
        }
      }
      if (soloReal && !contiene(txt, c.paroleChiave)) return false;
      return true;
    });
  }

  function cardNotizia(n, i) {
    const d = parseData(n.data) || (n.data ? new Date(n.data) : null);
    const dataTxt = d && !isNaN(d) ? fmtLungo(d) : "";
    const media = has(n.img)
      ? '<img src="' + esc(n.img) + '" alt="" loading="lazy">'
      : '<span class="ph"><img src="assets/images/logo.png" alt="" loading="lazy"></span>';
    return '<article class="card news-card reveal" data-delay="' + (i % 4) + '">' +
      '<a href="' + esc(n.url) + '" target="_blank" rel="noopener">' +
        '<div class="news-card__media">' + media + "</div></a>" +
      '<div class="news-card__body">' +
        '<div class="news-card__date">' + esc(dataTxt) + (n.fonte ? " &middot; " + esc(n.fonte) : "") + "</div>" +
        '<h3 class="news-card__title"><a href="' + esc(n.url) + '" target="_blank" rel="noopener">' + esc(n.titolo) + "</a></h3>" +
        (has(n.estratto) ? '<p class="news-card__excerpt">' + esc(n.estratto) + "&hellip;</p>" : "") +
        '<a class="news-card__more" href="' + esc(n.url) + '" target="_blank" rel="noopener">Leggi l\u0027articolo &rarr;</a>' +
      "</div></article>";
  }

  async function renderNotizie() {
    const box = $('[data-render="notizie"]');
    if (!box) return;
    const limite = parseInt(box.dataset.limite || "0", 10) || CONFIG.news.maxNotizie;
    const stato = $('[data-render="notizie-stato"]');
    let soloReal = CONFIG.news.soloRealOlimpia;

    const fisse = (typeof NOTIZIE_FISSE !== "undefined" ? NOTIZIE_FISSE : []).slice();
    box.innerHTML = '<p class="muted">Caricamento notizie&hellip;</p>';

    let raccolte = [];
    try {
      const attive = CONFIG.news.fonti.filter((f) => f.attiva !== false);
      const risultati = await Promise.all(attive.map(leggiFeed));
      raccolte = risultati.reduce((a, b) => a.concat(b), []);
    } catch (e) { raccolte = []; }

    const disegna = () => {
      let lista = filtraNotizie(raccolte, soloReal).concat(fisse);
      /* deduplica per url */
      const visti = {};
      lista = lista.filter((n) => {
        const k = String(n.url || n.titolo).replace(/\/$/, "");
        if (visti[k]) return false; visti[k] = 1; return true;
      });
      lista.sort((a, b) => {
        const da = parseData(a.data) || new Date(a.data || 0);
        const db = parseData(b.data) || new Date(b.data || 0);
        return (isNaN(db) ? 0 : db) - (isNaN(da) ? 0 : da);
      });
      lista = lista.slice(0, limite);

      box.innerHTML = lista.length
        ? lista.map(cardNotizia).join("")
        : '<p class="muted">Nessuna notizia disponibile in questo momento.</p>';
      initReveal();

      if (stato) {
        const daFeed = raccolte.length;
        const nomiFonti = CONFIG.news.fonti.filter((f) => f.attiva !== false).map((f) => esc(f.nome)).join(" e ");
        stato.innerHTML = daFeed
          ? "Notizie da " + nomiFonti +
            ' &middot; filtro attivo: <b>' + (soloReal ? "solo Real Olimpia" : "tutto lo sport") + "</b>"
          : "Feed non raggiungibili in questo momento: sono mostrate le notizie salvate nel sito.";
      }
    };

    disegna();

    const btn = $('[data-render="notizie-toggle"]');
    if (btn) {
      const aggiorna = () => {
        btn.textContent = soloReal ? "Mostra tutto lo sport" : "Mostra solo Real Olimpia";
        btn.setAttribute("aria-pressed", soloReal ? "true" : "false");
      };
      aggiorna();
      btn.addEventListener("click", () => { soloReal = !soloReal; aggiorna(); disegna(); });
    }
  }

  /* ------------------------------------------------------- 6. INSTAGRAM */
  function embedIg(url) {
    const clean = String(url).split("?")[0].replace(/\/+$/, "");
    return clean + "/embed/";
  }

  function renderInstagram() {
    const box = $('[data-render="instagram"]');
    if (!box) return;
    if (!CONFIG.features.instagram || !has(SITE.social.instagramUser)) { box.remove(); return; }
    const user = SITE.social.instagramUser;
    const post = (SITE.social.instagramPost || []).filter(has);
    const link = SITE.social.instagram || "https://www.instagram.com/" + user + "/";

    let corpo;
    if (post.length) {
      corpo = '<div class="ig-grid">' + post.map((u, i) =>
        '<iframe src="' + esc(embedIg(u)) + '" title="Post Instagram ' + (i + 1) +
        '" loading="lazy" scrolling="no" allowtransparency="true"></iframe>').join("") + "</div>";
    } else {
      corpo = '<iframe class="ig-profilo" src="https://www.instagram.com/' + encodeURIComponent(user) +
        '/embed/" title="Profilo Instagram ' + esc(SITE.nome) + '" loading="lazy" scrolling="no" allowtransparency="true"></iframe>';
    }

    box.innerHTML =
      '<div class="widget__head"><h3>Ultimi post</h3><span class="badge">@' + esc(user) + "</span></div>" +
      corpo +
      '<div class="widget__note">Instagram non mostra sempre l anteprima nei riquadri incorporati: ' +
      '<a href="' + esc(link) + '" target="_blank" rel="noopener" style="color:#0B2C6B;font-weight:700">apri il profilo</a> per vedere tutto.</div>';
  }

  /* ------------------------------------------------------- 7. MODULO FORM */
  function initForm() {
    const form = $('[data-render="form-contatti"]');
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const corpo =
        "Nome: " + (d.get("nome") || "") + "\n" +
        "Email: " + (d.get("email") || "") + "\n" +
        "Telefono: " + (d.get("telefono") || "") + "\n" +
        "Motivo: " + (d.get("motivo") || "") + "\n\n" +
        (d.get("messaggio") || "");
      const oggetto = "[Sito] " + (d.get("motivo") || "Richiesta di contatto");
      window.location.href = "mailto:" + SITE.contatti.email +
        "?subject=" + encodeURIComponent(oggetto) + "&body=" + encodeURIComponent(corpo);
    });
  }


  /* --------------------------------------- barra inferiore (mobile)
     Costruita dalle prime voci attive di PAGINE, come una app.        */
  const ICONA_PAGINA = {
    "index.html": "casa", "squadra.html": "maglia", "risultati.html": "palla",
    "classifica.html": "lista", "news.html": "lista", "media.html": "foto",
    "societa.html": "lista", "stadio.html": "luogo", "sponsor.html": "trofeo",
    "contatti.html": "mail"
  };

  function initTabbar() {
    if ($(".tabbar")) return;
    const pagine = (typeof PAGINE !== "undefined" ? PAGINE : []).filter((p) => p.attiva !== false);
    if (pagine.length < 2) return;

    const priorita = ["index.html", "risultati.html", "classifica.html", "squadra.html", "news.html", "media.html"];
    const scelte = [];
    priorita.forEach((f) => {
      const pg = pagine.find((p) => p.file === f);
      if (pg && scelte.length < 4) scelte.push(pg);
    });
    pagine.forEach((pg) => { if (scelte.length < 4 && scelte.indexOf(pg) === -1) scelte.push(pg); });

    const bar = document.createElement("nav");
    bar.className = "tabbar";
    bar.setAttribute("aria-label", "Navigazione rapida");
    bar.innerHTML = scelte.map((pg) => {
      const ico = ICONE[ICONA_PAGINA[pg.file] || "lista"] || ICONE.lista;
      return '<a href="' + esc(pg.file) + '">' + ico + "<span>" + esc(pg.voce || pg.file) + "</span></a>";
    }).join("") +
      '<button type="button" data-tab-menu aria-label="Apri il menu completo">' + ICONE.menu + "<span>Menu</span></button>";
    document.body.appendChild(bar);

    /* evidenzia la voce corrente */
    let file = window.location.pathname.split("/").pop();
    if (!file) file = "index.html";
    $$("a", bar).forEach((a2) => {
      if (a2.getAttribute("href") === file) a2.setAttribute("aria-current", "page");
    });

    const btn = $("[data-tab-menu]", bar);
    btn.addEventListener("click", () => {
      const t = $(".nav-toggle");
      if (t) t.click();
    });
  }

  /* ------------------------------------------- ordine e stato pagine
     Legge PAGINE da data.js: riordina il menu, rimuove le voci disattivate
     e nasconde ogni link interno che punta a una pagina spenta.           */
  function applicaPagine() {
    if (typeof PAGINE === "undefined" || !Array.isArray(PAGINE)) return;
    const ordine = PAGINE.map((x) => x.file);
    const spente = PAGINE.filter((x) => x.attiva === false).map((x) => x.file);
    const soloFile = (h) => String(h || "").split("/").pop().split("#")[0];

    const lista = $(".nav__list");
    if (lista) {
      const voci = $$("li", lista);
      const perFile = {};
      voci.forEach((li) => {
        const a = $("a", li);
        if (a) perFile[soloFile(a.getAttribute("href"))] = li;
      });
      PAGINE.forEach((pg) => {
        const li = perFile[pg.file];
        if (!li) return;
        if (pg.attiva === false) { li.remove(); return; }
        if (has(pg.voce)) { const a = $("a", li); if (a) a.textContent = pg.voce; }
        lista.appendChild(li);              /* riordina secondo PAGINE */
      });
      /* voci non elencate in PAGINE restano in coda: le rimuoviamo per coerenza */
      $$("li", lista).forEach((li) => {
        const a = $("a", li);
        if (a && ordine.indexOf(soloFile(a.getAttribute("href"))) === -1) li.remove();
      });
    }

    if (!spente.length) return;
    $$('a[href]').forEach((a) => {
      const f = soloFile(a.getAttribute("href"));
      if (!f || spente.indexOf(f) === -1) return;
      const li = a.closest("li");
      const btn = a.classList.contains("btn");
      if (li) li.remove();
      else if (btn) a.remove();
      else a.setAttribute("hidden", "hidden");
    });
    /* se la pagina aperta e' disattivata, avvisa senza rompere nulla */
    const corrente = soloFile(window.location.pathname) || "index.html";
    if (spente.indexOf(corrente) !== -1) {
      const main = $("#main");
      if (main) main.insertAdjacentHTML("afterbegin",
        '<div class="wrap" style="padding-top:20px"><p class="badge badge--rosso">' +
        "Questa pagina e disattivata in data.js (PAGINE): non e raggiungibile dal menu.</p></div>");
    }
  }

  /* --- evidenzia la voce di menu della pagina corrente --- */
  function initNavActive() {
    let file = window.location.pathname.split("/").pop();
    if (!file || file === "") file = "index.html";
    document.querySelectorAll(".nav__list a, .footer__links a").forEach((a) => {
      const href = (a.getAttribute("href") || "").split("/").pop().split("#")[0];
      if (href && href === file) a.setAttribute("aria-current", "page");
    });
  }

  /* --------------------------------------------------------- 8. AVVIO */
  function init() {
    initNav();
    applicaPagine();
    initTabbar();
    initNavActive();
    initHeaderScroll();
    fillGlobals();
    renderProssima();
    renderPartite();
    renderForma();
    renderRosa();
    renderStaff();
    renderStoria();
    renderSponsor();
    renderFaq();
    renderGalleria();
    renderVideo();
    renderRiepilogo();
    renderInstagram();
    initForm();
    initReveal();
    initStatBars();
    renderNotizie();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
