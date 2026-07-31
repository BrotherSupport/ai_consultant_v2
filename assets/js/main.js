/* =========================================================
   Fluxion AI 聚流智能 — interactions
   ========================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- sticky nav ---------- */
  var nav = document.getElementById('nav');
  var toTop = document.getElementById('toTop');

  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('is-stuck', y > 24);
    toTop.classList.toggle('is-on', y > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');

  function closeMenu() {
    links.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', '開啟選單');
  }

  burger.addEventListener('click', function () {
    var open = links.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
  });

  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- scroll reveal ---------- */
  var revealables = document.querySelectorAll('.reveal, .steps li');

  if (!('IntersectionObserver' in window) || reduced) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
        if (entry.target.classList.contains('count')) countUp(entry.target);
        entry.target.querySelectorAll && entry.target.querySelectorAll('.count').forEach(countUp);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------- number count-up ---------- */
  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';

    var target = parseFloat(el.dataset.to);
    var suffix = el.dataset.suffix || '';
    if (isNaN(target)) return;
    if (reduced) { el.textContent = target + suffix; return; }

    var duration = 1400;
    var start = null;

    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // counters that are not themselves .reveal targets
  document.querySelectorAll('.count').forEach(function (el) {
    if (reduced || !('IntersectionObserver' in window)) {
      el.textContent = (el.dataset.to || '') + (el.dataset.suffix || '');
    }
  });

  /* ---------- card spotlight ---------- */
  if (!reduced) {
    document.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
      });
    });
  }

  /* ---------- FAQ: one open at a time ---------- */
  var faqItems = document.querySelectorAll('.faq details');
  faqItems.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      faqItems.forEach(function (other) { if (other !== d) other.open = false; });
    });
  });

  /* ---------- contact form (demo, no backend) ---------- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      note.textContent = '請確認必填欄位皆已填寫，且 Email 格式正確。';
      note.style.color = '#FF9A9A';
      form.reportValidity();
      return;
    }

    var name = form.querySelector('#f-name').value.trim();
    note.style.color = '';
    note.textContent = '收到了，' + name + '。這是示範網站，表單尚未串接後端；請改寄 hello@fluxion.ai。';
    form.reset();
  });

  /* ---------- active nav link ---------- */
  var sections = ['services', 'solutions', 'platform', 'cases', 'insights', 'about']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var navMap = {};
    document.querySelectorAll('.nav__links a[href^="#"]').forEach(function (a) {
      navMap[a.getAttribute('href').slice(1)] = a;
    });

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var a = navMap[entry.target.id];
        if (a) a.style.color = entry.isIntersecting ? 'var(--teal)' : '';
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { spy.observe(s); });
  }
})();
