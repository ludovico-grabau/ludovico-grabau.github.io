/* Project collection: featured cards, filters, grid, project viewer, lightbox. */
(function () {
  'use strict';
  const { $, esc, icon } = window.UI;
  const PROJECTS = (window.PROJECTS || []).filter(Boolean);  // tolerate a stray comma in data/projects.js
  const MEDIA = window.MEDIA || {};
  const DOMAINS = window.DOMAINS || [];
  const byId = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));
  const LEVEL = { msc: 'MSc · UniBE', bsc: 'BSc · HEPIA', personal: 'Personal & work' };
  const FEATURED_MAIN = ['msc-thesis', 'bsc-thesis'];
  const FEATURED_SMALL = ['unibe-cv-epipolar', 'unibe-cg-raytracer', 'unibe-nlp-llm', 'sealos-kernel'];
  // Projects that were split into several cards: old links open the first new card.
  const RENAMED = {
    'yoctos-kernel': 'sealos-kernel',
    'unibe-computer-vision': 'unibe-cv-epipolar', 'unibe-deep-learning': 'unibe-dl-captioning',
    'unibe-computer-graphics': 'unibe-cg-raytracer', 'unibe-neurotechnology': 'unibe-neuro-imu',
    'unibe-omics': 'unibe-omics-genomics', 'unibe-reinforcement-learning': 'unibe-rl-mountaincar',
    'network-security': 'sr-dns', 'sr-attacks': 'sr-dns', 'infosec-crypto': 'ssi-pgp',
    'concurrency-c': 'concurrency-shortest-paths', 'distributed-systems': 'distributed-broadcast',
    'android-apps': 'android-findmygoomba', 'math-labs': 'math-fourier', 'unibe-machine-learning': 'unibe-ml-regression'
  };

  const media = (p) => MEDIA[p.id] || [];
  const visuals = (p) => media(p).filter((m) => m.type !== 'file');
  const files = (p) => media(p).filter((m) => m.type === 'file');
  const fmtSize = (b) => (b > 1e6 ? (b / 1e6).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1e3)) + ' kB');
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  /* ---------- covers ---------- */
  function coverPick(p) {
    const v = visuals(p);
    return v.find((m) => m.type === 'image' || m.type === 'video') || v.find((m) => m.type === 'code');
  }
  const coverClass = (p) => { const m = coverPick(p); return m && m.fit === 'contain' ? 'cover contain' : 'cover'; };
  function coverHTML(p, size = 'thumb') {
    const v = visuals(p);
    const pic = v.find((m) => m.type === 'image' || m.type === 'video');
    if (pic) {
      const src = size === 'full' ? (pic.poster || pic.src) : pic.thumb;
      return `<img src="${esc(src)}" alt="${esc(pic.caption || p.title)}" loading="lazy" decoding="async">`;
    }
    const code = v.find((m) => m.type === 'code');
    if (code) return `<div class="code-cover" aria-hidden="true">${code.lines.slice(0, 18).join('\n')}</div>`;
    return `<div class="title-cover"><span>${esc(p.coverText || p.course || p.title)}</span></div>`;
  }

  function badges(p) {
    const level = p.level === 'personal' ? '' : `<span class="badge">${esc(LEVEL[p.level])}</span>`;
    return `<div class="badge-row"><span class="badge ${p.kind === 'Thesis' ? 'thesis' : ''}">${esc(p.kind)}</span>${level}</div>`;
  }

  /* ---------- featured ---------- */
  function featureCard(p, big) {
    const metrics = big ? (p.metrics || []).map((m) => `<span class="chip accent">${esc(m)}</span>`).join('') : '';
    return `<button class="feature reveal" type="button" data-open="${p.id}">
      <div class="${coverClass(p)}">${coverHTML(p, big ? 'full' : 'thumb')}</div>
      <div class="body">
        <span class="meta">${esc(p.kind)} · ${esc(p.institution)} · ${esc(p.period)}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        ${big ? `<div class="metrics">${metrics}</div>` : ''}
      </div>
    </button>`;
  }
  $('#featuredMain').innerHTML = FEATURED_MAIN.map((id) => byId[id]).filter(Boolean).map((p) => featureCard(p, true)).join('');
  $('#featuredSmall').innerHTML = FEATURED_SMALL.map((id) => byId[id]).filter(Boolean).map((p) => featureCard(p, false)).join('');

  /* ---------- search index ---------- */
  const hay = Object.fromEntries(PROJECTS.map((p) => [p.id, norm([
    p.title, p.summary, p.course, p.institution, p.kind, p.team, LEVEL[p.level], (p.tech || []).join(' '), (p.domains || []).join(' '),
    (p.description || []).join(' '), (p.parts || []).map((x) => x.title + ' ' + x.text).join(' '), (p.highlights || []).join(' ')
  ].join(' '))]));
  const matches = (p, q) => norm(q).split(/\s+/).filter(Boolean).every((w) => hay[p.id].includes(w));

  /* ---------- skills (from the profile), linked to the projects that mention them ---------- */
  // A skill such as "AWS · GCP · Azure" or "C / C++" is a list of terms; a project matches if its text
  // contains one of them as a whole word or phrase (so "Java" does not match "JavaScript").
  const skillTerms = (s) => s.split(/\s*(?:[\/·(),&]|\band\b)\s*/).map((x) => x.trim()).filter(Boolean);
  const termRe = {};
  const wordRe = (t) => termRe[t] || (termRe[t] = new RegExp('(^|[^a-z0-9+#])' +
    norm(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+') + '(?=$|[^a-z0-9+#])'));
  const usesSkill = (p, skill) => skillTerms(skill).some((t) => wordRe(t).test(hay[p.id]));
  $('#skillsGrid').innerHTML = window.PROFILE.skills.map((g) => `
    <div class="panel skill-group reveal"><h3>${esc(g.group)}</h3><ul class="tag-list">${g.items.map((s) => {
      const n = PROJECTS.filter((p) => usesSkill(p, s)).length;
      return n > 0
        ? `<li><button class="chip" type="button" data-skill="${esc(s)}" title="${n} project${n > 1 ? 's' : ''}">${esc(s)} <small>${n}</small></button></li>`
        : `<li class="chip">${esc(s)}</li>`;
    }).join('')}</ul></div>`).join('');

  /* ---------- filters & grid ---------- */
  const state = { level: 'all', domain: null, q: '', skill: null, sort: 'new' };
  const grid = $('#grid');
  $('#domainChips').innerHTML = DOMAINS.map((d) => `<button class="chip" type="button" data-domain="${esc(d)}" aria-pressed="false">${esc(d)}</button>`).join('');

  function filtered() {
    let list = PROJECTS.filter((p) => (state.level === 'all' || p.level === state.level) &&
      (!state.domain || (p.domains || []).includes(state.domain)) &&
      (state.skill ? usesSkill(p, state.skill) : (!state.q || matches(p, state.q))));
    const cmp = { new: (a, b) => b.date.localeCompare(a.date), old: (a, b) => a.date.localeCompare(b.date), az: (a, b) => a.title.localeCompare(b.title) }[state.sort];
    return list.sort(cmp);
  }

  function card(p) {
    return `<li><button class="card" type="button" data-open="${p.id}">
      <div class="${coverClass(p)}">${coverHTML(p)}${badges(p)}</div>
      <div class="body">
        <h3>${esc(p.title)}</h3>
        <span class="meta">${esc(p.course || p.institution)} · ${esc(p.period)}</span>
        <p>${esc(p.summary)}</p>
        <ul class="tag-list">${(p.tech || []).slice(0, 4).map((t) => `<li class="chip">${esc(t)}</li>`).join('')}</ul>
      </div>
    </button></li>`;
  }

  let current = [];
  function render() {
    current = filtered();
    grid.innerHTML = current.map(card).join('');
    $('#empty').hidden = current.length > 0;
    $('#resultCount').textContent = `${current.length} of ${PROJECTS.length} projects`;
  }
  const pressOnly = (group, pred) => group.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(pred(x))));

  $('#levelFilter').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    state.level = b.dataset.level;
    pressOnly($('#levelFilter'), (x) => x === b);
    render();
  });
  $('#domainChips').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    state.domain = state.domain === b.dataset.domain ? null : b.dataset.domain;
    pressOnly($('#domainChips'), (x) => x.dataset.domain === state.domain);
    render();
  });
  let timer;
  $('#search').addEventListener('input', (e) => { clearTimeout(timer); timer = setTimeout(() => { state.q = e.target.value.trim(); state.skill = null; render(); }, 120); });
  $('#sort').addEventListener('change', (e) => { state.sort = e.target.value; render(); });
  document.addEventListener('click', (e) => {
    const s = e.target.closest('[data-skill]'); if (!s) return;
    Object.assign(state, { q: s.dataset.skill, skill: s.dataset.skill, level: 'all', domain: null });
    $('#search').value = state.q;
    pressOnly($('#levelFilter'), (x) => x.dataset.level === 'all');
    pressOnly($('#domainChips'), () => false);
    render();
    $('#projects').scrollIntoView();
  });
  render();

  /* ---------- project dialog ---------- */
  const dlg = $('#projectDialog');
  let open = null, idx = 0, lastFocus = null;

  function mediaStage(m) {
    if (!m) return '';
    if (m.type === 'image') return `<img src="${esc(m.src)}" alt="${esc(m.caption)}" width="${m.w}" height="${m.h}" data-zoom>`;
    if (m.type === 'video') return `<video src="${esc(m.src)}" poster="${esc(m.poster)}" controls playsinline muted loop preload="metadata"></video>`;
    if (m.type === 'code') return `<div class="code-view"><div class="code-head"><span>${esc(m.file)}</span><span>lines ${m.start}–${m.start + m.lines.length - 1}</span></div>
      <pre style="--start:${m.start - 1}"><code>${m.lines.map((l) => `<span class="ln">${l}</span>`).join('')}</code></pre></div>`;
    return '';
  }
  function thumbHTML(m, i) {
    const inner = m.type === 'code' ? `<span class="t-label">&lt;/&gt;<br>${esc(m.lang)}</span>`
      : `<img src="${esc(m.thumb)}" alt="" loading="lazy">${m.type === 'video' ? '<span class="play-mark">▶</span>' : ''}`;
    return `<button type="button" data-i="${i}" aria-label="Show item ${i + 1}" aria-current="${i === idx}">${inner}</button>`;
  }
  function showItem(i) {
    const v = visuals(open);
    if (!v.length) return;
    idx = (i + v.length) % v.length;
    const m = v[idx];
    dlg.querySelector('.stage-inner').innerHTML = mediaStage(m);
    dlg.querySelector('.stage').classList.toggle('is-code', m.type === 'code');
    dlg.querySelector('.stage').classList.toggle('is-light', m.fit === 'contain');
    dlg.querySelector('.caption').innerHTML = `<span class="count">${idx + 1} / ${v.length}</span>${esc(m.caption || '')}`;
    dlg.querySelectorAll('.thumbs button').forEach((b) => b.setAttribute('aria-current', String(+b.dataset.i === idx)));
    const strip = dlg.querySelector('.thumbs'), tb = strip && strip.querySelector(`button[data-i="${idx}"]`);
    if (tb) {  // scroll the strip only, never the dialog
      const l = tb.offsetLeft - strip.offsetLeft, r = l + tb.offsetWidth;
      if (l < strip.scrollLeft) strip.scrollLeft = l - 8;
      else if (r > strip.scrollLeft + strip.clientWidth) strip.scrollLeft = r - strip.clientWidth + 8;
    }
  }

  function openProject(id, push = true) {
    const p = byId[id]; if (!p) return;
    open = p; idx = 0;
    const order = current.length && current.some((x) => x.id === id) ? current : PROJECTS;
    const pos = order.findIndex((x) => x.id === id);
    const prev = order[(pos - 1 + order.length) % order.length], next = order[(pos + 1) % order.length];
    const v = visuals(p), f = files(p);
    const facts = [['Where', p.institution], ['Course', p.course], ['When', p.period], ['Team', p.team]].filter(([, x]) => x);
    dlg.innerHTML = `
      <div class="dlg-bar">
        <span class="crumb">${esc(LEVEL[p.level])} · ${esc(p.kind)}</span>
        <button class="icon-btn" type="button" data-nav="${prev.id}" aria-label="Previous project">${icon('left')}</button>
        <button class="icon-btn" type="button" data-nav="${next.id}" aria-label="Next project">${icon('right')}</button>
        <button class="icon-btn" type="button" data-close aria-label="Close">${icon('x')}</button>
      </div>
      <div class="dlg-body">
        <header class="dlg-head">
          <ul class="tag-list">${(p.domains || []).map((d) => `<li class="chip accent">${esc(d)}</li>`).join('')}</ul>
          <h2 id="dlgTitle">${esc(p.title)}</h2>
          <p class="summary">${esc(p.summary)}</p>
          <div class="facts">${facts.map(([k, x]) => `<span><b>${k}:</b> ${esc(x)}</span>`).join('')}</div>
        </header>
        ${v.length ? `<div class="viewer">
          <div class="stage">${v.length > 1 ? `<button class="icon-btn nav-btn prev" type="button" data-step="-1" aria-label="Previous image">${icon('left')}</button>
            <button class="icon-btn nav-btn next" type="button" data-step="1" aria-label="Next image">${icon('right')}</button>` : ''}
            <div class="stage-inner" style="display:contents"></div></div>
          <div class="caption"></div>
          ${v.length > 1 ? `<div class="thumbs">${v.map(thumbHTML).join('')}</div>` : ''}
        </div>` : ''}
        <div class="dlg-cols">
          <div class="prose">
            ${(p.description || []).map((x) => `<p>${esc(x)}</p>`).join('')}
            ${p.highlights ? `<h3>Highlights</h3><ul class="highlights">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}
            ${p.parts ? `<h3>${p.kind === 'Coursework' || p.kind === 'Lab series' ? 'What I did' : 'Parts'}</h3><div class="parts">${p.parts.map((x) => `<div class="part"><h4>${esc(x.title)}</h4><p>${esc(x.text)}</p></div>`).join('')}</div>` : ''}
          </div>
          <aside class="side">
            <div><h3>Tech</h3><ul class="tag-list">${(p.tech || []).map((x) => `<li class="chip">${esc(x)}</li>`).join('')}</ul></div>
            ${(f.length || p.links) ? `<div><h3>Documents &amp; links</h3><div class="links">
              ${f.map((d) => `<a href="${esc(d.src)}" target="_blank" rel="noopener">${icon('file')}<span>${esc(d.label)}</span><small>${fmtSize(d.size)}</small></a>`).join('')}
              ${(p.links || []).map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener">${icon('ext')}<span>${esc(l.label)}</span></a>`).join('')}
            </div></div>` : ''}
          </aside>
        </div>
        <div class="dlg-foot">
          <button class="btn btn-ghost" type="button" data-nav="${prev.id}">${icon('left')}<span>${esc(prev.title)}</span></button>
          <button class="btn btn-ghost" type="button" data-nav="${next.id}"><span>${esc(next.title)}</span>${icon('right')}</button>
        </div>
      </div>`;
    if (!dlg.open) { lastFocus = document.activeElement; dlg.showModal(); document.body.style.overflow = 'hidden'; }
    dlg.scrollTop = 0;
    showItem(0);
    const target = '#project/' + id;
    if (push && location.hash !== target) {
      // first project opened from the page: push; browsing between projects: replace
      if (pushed) history.replaceState({ project: id }, '', target);
      else { history.pushState({ project: id }, '', target); pushed = true; }
    }
    document.title = `${p.title} | Ludovico Grabau`;
  }

  let pushed = false;           // did we add the #project/ history entry ourselves?
  let closingFromHistory = false;
  function closeProject() { if (dlg.open) dlg.close(); }
  dlg.addEventListener('close', () => {
    dlg.querySelectorAll('video').forEach((v) => v.pause());
    document.body.style.overflow = '';
    document.title = 'Ludovico Grabau | Medical AI & ML Engineer';
    if (!closingFromHistory && location.hash.startsWith('#project/')) {
      if (pushed) history.back();                                   // return to where the visitor was
      else history.replaceState({}, '', location.pathname + location.search + '#projects');  // landed on a deep link
    }
    pushed = false; closingFromHistory = false;
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
    open = null;
  });
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) return closeProject();               // click on the backdrop
    const el = e.target.closest('[data-close],[data-nav],[data-step],.thumbs button,[data-zoom]');
    if (!el) return;
    if (el.hasAttribute('data-close')) closeProject();
    else if (el.dataset.nav) openProject(el.dataset.nav);
    else if (el.dataset.step) showItem(idx + +el.dataset.step);
    else if (el.dataset.i) showItem(+el.dataset.i);
    else if (el.hasAttribute('data-zoom')) openLightbox(visuals(open)[idx]);
  });
  dlg.addEventListener('keydown', (e) => {
    if (!open || e.target.closest('input,textarea,video')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); showItem(idx + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); showItem(idx - 1); }
  });

  document.addEventListener('click', (e) => {
    const o = e.target.closest('[data-open]');
    if (o && !dlg.contains(o)) openProject(o.dataset.open);
  });

  /* ---------- deep links: #project/<id> ---------- */
  function route() {
    const m = location.hash.match(/^#project\/([\w-]+)$/);
    const id = m && (byId[m[1]] ? m[1] : RENAMED[m[1]]);
    if (id && byId[id]) {
      if (id !== m[1]) history.replaceState(history.state, '', '#project/' + id);
      openProject(id, false);
    }
    else if (dlg.open) { closingFromHistory = true; dlg.close(); }
  }
  window.addEventListener('popstate', route);
  route();

  /* ---------- lightbox (a second modal dialog, stacked above the project) ---------- */
  const lb = $('#lightbox');
  function openLightbox(m) {
    if (!m || m.type !== 'image') return;
    $('#lbImg').src = m.src; $('#lbImg').alt = m.caption || ''; $('#lbCap').textContent = m.caption || '';
    lb.showModal();
  }
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.closest('#lbClose') || e.target.id === 'lbImg') lb.close(); });

  window.observeReveal && window.observeReveal();
})();
