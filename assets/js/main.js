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
  $('#stats').innerHTML = [
    [projects.length, 'projects documented'],
    [count('msc'), 'from the MSc at UniBE'],
    [count('bsc'), 'from the BSc at HEPIA'],
    [P.languages.length, 'languages spoken']
  ].map(([n, l]) => `<div class="stat"><b>${n}</b><span>${esc(l)}</span></div>`).join('');

  /* ---- about ---- */
  $('#aboutText').innerHTML = P.about.map((p) => `<p>${esc(p)}</p>`).join('');
  $('#langList').innerHTML = P.languages.map((l) => `<li><b>${esc(l.name)}</b><span>${esc(l.level)}</span></li>`).join('');

  /* ---- experience ---- */
  $('#timeline').innerHTML = P.experience.map((x) => `
    <li class="tl-item">
      <div class="tl-head"><h3>${esc(x.title)}</h3><span class="org">${esc(x.org)}</span></div>
      <div class="tl-when">${esc(x.period)} · ${esc(x.place)}</div>
      <ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
      ${x.project ? `<button class="tl-link" type="button" data-open="${esc(x.project)}">See the project ${icon('arrow')}</button>` : ''}
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
    const h = Math.max(...tops.map((t) => t.getBoundingClientRect().height));
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

  /* ---- reveal on scroll ---- */
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); revealer.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  window.observeReveal = (root = document) => root.querySelectorAll('.reveal:not(.in)').forEach((el) => revealer.observe(el));
  window.observeReveal();

  /* ---- loader: fade out as soon as the DOM is ready ---- */
  document.body.classList.add('loaded');
})();
