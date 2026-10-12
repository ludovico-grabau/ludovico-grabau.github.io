/* Page chrome and the CV sections rendered from data/profile.js. */
(function () {
  'use strict';
  const P = window.PROFILE;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (id, cls = '') => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  window.UI = { $, esc, icon };

  /* ---- theme: follows the OS until the visitor picks one ---- */
  const root = document.documentElement;
  $('#themeToggle').addEventListener('click', () => {
    const current = root.dataset.theme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    const next = current === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* private mode: theme just won't persist */ }
  });

  /* ---- navigation ---- */
  const nav = $('#nav');
  const burger = $('#burger');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  $('#menu').addEventListener('click', (e) => {
    if (e.target.closest('a')) { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  });

  // logo: a signal crosses the perceptron once after load and once each time the pointer enters it
  const mesh = $('.brand .mesh'), lastNode = mesh.querySelector('.nodes circle:last-child');
  const fire = () => { mesh.classList.remove('firing'); void mesh.getBoundingClientRect(); mesh.classList.add('firing'); };
  mesh.addEventListener('animationend', (e) => { if (e.target === lastNode) mesh.classList.remove('firing'); });
  $('.brand').addEventListener('mouseenter', fire);
  setTimeout(fire, 1100);

  const toTop = $('#toTop');
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 10);
    toTop.classList.toggle('show', y > 700);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0 }));

  // highlight the menu entry of the section in view
  const links = [...document.querySelectorAll('.menu a')];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((a) => { const s = document.querySelector(a.getAttribute('href')); if (s) spy.observe(s); });

  /* ---- hero ---- */
  document.querySelectorAll('[data-bind]').forEach((el) => { if (P[el.dataset.bind]) el.textContent = P[el.dataset.bind]; });
  if (P.cv) { const b = $('#cvBtn'); b.href = P.cv; b.hidden = false; }
  const projects = (window.PROJECTS || []).filter(Boolean);
  const count = (lvl) => projects.filter((p) => p.level === lvl).length;
  $('#badgeCount').textContent = projects.length;
  // approximate years of programming, counted from PROFILE.codingSince
  $('#yearsCount').textContent = `~${new Date().getFullYear() - P.codingSince}`;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const statsBox = $('#stats');
  // each box links to its section; the project counts open the collection with the matching degree filter
  statsBox.innerHTML = [
    [projects.length, 'projects documented', '#projects', 'all'],
    [count('msc'), 'from the MSc at UniBE', '#projects', 'msc'],
    [count('bsc'), 'from the BSc at HEPIA', '#projects', 'bsc'],
    [P.languages.length, 'languages spoken', '#languages']
  ].map(([n, l, href, level]) => `<a class="stat" href="${href}"${level ? ` data-filter-level="${level}"` : ''}>
      <span>${esc(l)}</span><b data-count="${n}">${reduceMotion.matches ? n : 0}</b>${icon('arrow', 'go')}</a>`).join('');
  // the numbers count up like a monitor readout the first time they are seen
  const counter = new IntersectionObserver((entries) => {
    if (!entries.some((en) => en.isIntersecting)) return;
    counter.disconnect();
    const nums = [...statsBox.querySelectorAll('[data-count]')];
    const t0 = performance.now() + 700;  // starts as the strip finishes fading in
    const tick = (t) => {
      const k = Math.min(1, Math.max(0, (t - t0) / 1100)), e = 1 - Math.pow(1 - k, 3);
      nums.forEach((b) => { b.textContent = Math.round(e * b.dataset.count); });
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, { threshold: 0.4 });
  if (!reduceMotion.matches) counter.observe(statsBox);

  /* ---- about ---- */
  $('#aboutText').innerHTML = P.about.map((p) => `<p>${esc(p)}</p>`).join('');
  $('#langList').innerHTML = P.languages.map((l) => `<li><b>${esc(l.name)}</b><span>${esc(l.level)}</span></li>`).join('');

  /* ---- experience ---- */
  $('#timeline').innerHTML = P.experience.map((x) => `
    <li class="tl-item reveal">
      <div class="tl-when"><span class="tl-date">${esc(x.period)}</span><span class="tl-place">${esc(x.place)}</span></div>
      <div class="tl-node" aria-hidden="true"></div>
      <article class="tl-card">
        <div class="tl-head"><h3>${esc(x.title)}</h3><span class="org">${esc(x.org)}</span></div>
        <ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
        ${x.project ? `<button class="tl-link" type="button" data-open="${esc(x.project)}">See the project ${icon('arrow')}</button>` : ''}
      </article>
    </li>`).join('');

  /* ---- education ---- */
  $('#eduGrid').innerHTML = P.education.map((d) => `
    <article class="edu reveal">
      <div class="edu-top">
        <span class="period">${esc(d.period)} · ${esc(d.place)}</span>
        <h3>${esc(d.degree)}</h3>
        <span class="school">${esc(d.school)}</span>
        <p class="thesis"><b>Thesis:</b> ${esc(d.thesis)}</p>
        <div class="edu-cta"><button class="btn btn-ghost" type="button" data-open="${esc(d.thesisProject)}">Open the thesis ${icon('arrow')}</button></div>
      </div>
      <details>
        <summary>Courses taken (${d.courses.reduce((n, t) => n + t.list.length, 0)})</summary>
        ${d.courses.map((t) => `<div class="term"><h4>${esc(t.term)}</h4><ul class="tag-list">${t.list.map((c) => `<li class="chip">${esc(c)}</li>`).join('')}</ul></div>`).join('')}
      </details>
    </article>`).join('');

  // Side by side, both boxes get the same top height so their "Courses taken" lines align;
  // each box still grows on its own when its course list is opened.
  function alignEdu() {
    const tops = [...document.querySelectorAll('#eduGrid .edu-top')];
    tops.forEach((t) => { t.style.minHeight = ''; });
    const sideBySide = getComputedStyle($('#eduGrid')).gridTemplateColumns.trim().split(/\s+/).length > 1;
    if (!sideBySide || tops.length < 2) return;
    const h = Math.max(...tops.map((t) => t.offsetHeight));  // layout height: ignores the reveal's scale
    tops.forEach((t) => { t.style.minHeight = `${h}px`; });
  }
  alignEdu();
  window.addEventListener('resize', alignEdu);
  if (document.fonts) document.fonts.ready.then(alignEdu);

  /* ---- contact ---- */
  const L = P.links;
  const short = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');  // label shown for a link
  const contactItems = [
    L.email && ['mail', `mailto:${L.email}`, L.email],
    L.linkedin && ['linkedin', L.linkedin, short(L.linkedin)],
    L.github && ['github', L.github, short(L.github)]
  ].filter(Boolean);
  $('#contactLinks').innerHTML = contactItems.map(([i, href, label]) =>
    `<a href="${esc(href)}" ${href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${icon(i, i === 'mail' ? '' : 'solid')}<span>${esc(label)}</span></a>`).join('');
  $('#footerSocial').innerHTML = contactItems.map(([i, href]) =>
    `<a class="icon-btn" href="${esc(href)}" aria-label="${i}" ${href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${icon(i, i === 'mail' ? '' : 'solid')}</a>`).join('');
  $('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = `Portfolio contact from ${f.get('name')}`;
    const body = `${f.get('message')}\n\n${f.get('name')}\n${f.get('email')}`;
    window.location.href = `mailto:${L.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
  $('#year').textContent = new Date().getFullYear();

  /* ---- scroll-linked details: timeline progress, vital-sign pulse paused off screen ---- */
  const hero = $('.hero'), timeline = $('#timeline');
  const clamp01 = (v) => Math.min(1, Math.max(0, v));
  let queued = false;
  function frame() {
    queued = false;
    // read everything first, then write, so one frame never forces two layouts
    const vh = window.innerHeight;
    const heroBottom = hero.getBoundingClientRect().bottom;
    const tl = timeline.getBoundingClientRect(), line = vh * 0.62;
    const lit = [...timeline.children].map((li) => li.getBoundingClientRect().top + 24 < line);
    hero.classList.toggle('offscreen', heroBottom < 0);
    timeline.style.setProperty('--tl-p', clamp01((line - tl.top) / tl.height).toFixed(3));
    [...timeline.children].forEach((li, i) => li.classList.toggle('lit', lit[i]));
  }
  window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(frame); } }, { passive: true });
  window.addEventListener('resize', frame);
  window.addEventListener('load', frame);
  frame();

  /* ---- reveal on scroll ---- */
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); revealer.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  window.observeReveal = (root = document) => root.querySelectorAll('.reveal:not(.in)').forEach((el) => revealer.observe(el));
  window.observeReveal();

  /* ---- loader: fade out as soon as the DOM is ready ---- */
  document.body.classList.add('loaded');
})();
