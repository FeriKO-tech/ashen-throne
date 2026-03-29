/* ═══════════════════════════════════════════
   ASHEN THRONE — Shared JavaScript
   Ironveil Studios © 2026
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─── PAGE LOAD ─────────────────────────────────────────────────────────── */
  document.body.classList.add('page-loading');
  setTimeout(() => {
    document.body.classList.remove('page-loading');
    document.body.classList.add('page-loaded');
  }, 200);

  /* ─── NAVIGATION ─────────────────────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
  }

  window.closeMobile = function () {
    if (hamburger) hamburger.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  };

  /* ─── NAV ACTIVE PAGE STATE ──────────────────────────────────────────────── */
  (function setActivePage() {
    const pathname = window.location.pathname;
    const filename = pathname.split('/').pop() || 'index.html';
    const inNewsArticle = /\/news\/[^/]+\.html$/.test(pathname);

    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href') || '';
      const hrefFile = href.split('/').pop();

      if (inNewsArticle) {
        if (hrefFile === 'news.html') link.classList.add('active');
      } else if (hrefFile === filename || (filename === '' && hrefFile === 'index.html')) {
        link.classList.add('active');
      }
    });
  })();

  /* ─── CUSTOM CURSOR ──────────────────────────────────────────────────────── */
  const cursorEl = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursor-dot');

  if (cursorEl && cursorDot && window.matchMedia('(hover: hover)').matches) {
    document.body.classList.add('has-custom-cursor');
    let cx = 0, cy = 0, tx = 0, ty = 0;

    document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });

    (function animCursor() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      cursorEl.style.left = cx + 'px';
      cursorEl.style.top  = cy + 'px';
      cursorEl.style.marginLeft = '-18px';
      cursorEl.style.marginTop  = '-18px';
      cursorDot.style.left = tx + 'px';
      cursorDot.style.top  = ty + 'px';
      cursorDot.style.marginLeft = '-3px';
      cursorDot.style.marginTop  = '-3px';
      requestAnimationFrame(animCursor);
    })();

    const hoverTargets = '.btn-primary, .btn-ghost, .class-card, .nav-links a, .nav-cta, .social-link, .news-card, .nf-card, .feature-card, .wm-region, .cs-arrow, .cs-thumb';
    document.addEventListener('mouseover', e => {
      if (e.target.closest(hoverTargets)) cursorEl.classList.add('hover');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(hoverTargets)) cursorEl.classList.remove('hover');
    });
  }

  /* ─── SCROLL REVEAL ──────────────────────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12, rootMargin: '0px 0px -20px 0px' });

    reveals.forEach(el => revealObs.observe(el));

    requestAnimationFrame(() => {
      reveals.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible');
      });
    });
  }

  /* ─── NEWSLETTER FORM ────────────────────────────────────────────────────── */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    const input = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button[type="submit"], button:not([type])');
    if (!input || !btn) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        input.classList.add('input-error');
        input.addEventListener('animationend', () => input.classList.remove('input-error'), { once: true });
        return;
      }
      form.innerHTML = '<span class="success-msg">&#9876; Dispatches incoming, warrior.</span>';
    });
  });

  /* ─── BACK-TO-TOP ────────────────────────────────────────────────────────── */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    let bttTicking = false;
    window.addEventListener('scroll', () => {
      if (!bttTicking) {
        requestAnimationFrame(() => {
          backToTop.classList.toggle('back-to-top-visible', window.scrollY > window.innerHeight);
          bttTicking = false;
        });
        bttTicking = true;
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ─── TRAILER MODAL ──────────────────────────────────────────────────────── */
  const trailerModal = document.getElementById('trailerModal');
  const trailerBtnEl = document.getElementById('trailerBtn');
  const trailerCloseEl = document.getElementById('trailerClose');
  const trailerBackdropEl = document.getElementById('trailerBackdrop');

  function openTrailer() {
    if (!trailerModal) return;
    trailerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeTrailer() {
    if (!trailerModal) return;
    trailerModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (trailerBtnEl) trailerBtnEl.addEventListener('click', openTrailer);
  if (trailerCloseEl) trailerCloseEl.addEventListener('click', closeTrailer);
  if (trailerBackdropEl) trailerBackdropEl.addEventListener('click', closeTrailer);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && trailerModal && trailerModal.classList.contains('active')) closeTrailer();
  });

  /* ─── PAGE TRANSITION OVERLAY ────────────────────────────────────────────── */
  const pageTrans = document.getElementById('page-transition');

  function scrollToSection(selector) {
    const target = document.querySelector(selector);
    if (!target) return;
    if (pageTrans) {
      pageTrans.style.opacity = '0.6';
      pageTrans.style.pointerEvents = 'auto';
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          pageTrans.style.opacity = '0';
          pageTrans.style.pointerEvents = 'none';
        }, 300);
      }, 200);
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* ─── PAGE NAVIGATION (cross-page links with blink) ─────────────────────── */
  document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto"]):not([href^="tel"])').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('//')) return;
    link.addEventListener('click', e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      if (pageTrans) {
        pageTrans.style.opacity = '0.5';
        pageTrans.style.pointerEvents = 'auto';
        setTimeout(() => { window.location.href = href; }, 220);
      } else {
        window.location.href = href;
      }
    });
  });

  /* ─── DATA-SCROLL-TO ─────────────────────────────────────────────────────── */
  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const sel = btn.getAttribute('data-scroll-to');

      if (btn.hasAttribute('data-show-register')) {
        const tabLogin = document.getElementById('tabLogin');
        const tabReg = document.getElementById('tabRegister');
        const loginF = document.getElementById('loginForm');
        const registerF = document.getElementById('registerForm');
        if (tabReg && loginF && registerF) {
          if (tabLogin) tabLogin.classList.remove('active');
          tabReg.classList.add('active');
          loginF.style.display = 'none';
          registerF.style.display = '';
        }
      }
      scrollToSection(sel);
    });
  });

  /* ─── AUTH FORM (tabs, password toggle, strength) ────────────────────────── */
  (function initAuth() {
    const tabLogin = document.getElementById('tabLogin');
    const tabReg = document.getElementById('tabRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const toRegister = document.getElementById('toRegister');
    const toLogin = document.getElementById('toLogin');

    function showLogin() {
      if (!loginForm) return;
      tabLogin && tabLogin.classList.add('active');
      tabReg && tabReg.classList.remove('active');
      loginForm.style.display = '';
      if (registerForm) registerForm.style.display = 'none';
    }

    function showRegister() {
      if (!registerForm) return;
      tabReg && tabReg.classList.add('active');
      tabLogin && tabLogin.classList.remove('active');
      registerForm.style.display = '';
      if (loginForm) loginForm.style.display = 'none';
    }

    if (tabLogin) tabLogin.addEventListener('click', showLogin);
    if (tabReg) tabReg.addEventListener('click', showRegister);
    if (toRegister) toRegister.addEventListener('click', showRegister);
    if (toLogin) toLogin.addEventListener('click', showLogin);

    document.querySelectorAll('.auth-eye').forEach(eyeBtn => {
      eyeBtn.addEventListener('click', () => {
        const targetId = eyeBtn.getAttribute('data-eye');
        const input = document.getElementById(targetId);
        if (input) input.type = input.type === 'password' ? 'text' : 'password';
      });
    });

    const passInput = document.getElementById('regPass');
    const strengthBar = document.getElementById('strengthBar');
    const strengthLabel = document.getElementById('strengthLabel');

    if (passInput && strengthBar && strengthLabel) {
      passInput.addEventListener('input', () => {
        const v = passInput.value;
        let score = 0;
        if (v.length >= 8) score++;
        if (/[A-Z]/.test(v)) score++;
        if (/[0-9]/.test(v)) score++;
        if (/[^A-Za-z0-9]/.test(v)) score++;

        const segs = strengthBar.querySelectorAll('.strength-seg');
        const colors = ['#8b1a1a', '#c9601a', '#c9a84c', '#2d8a4e'];
        const labels = ['Weak', 'Moderate', 'Strong', 'Unbreakable'];
        segs.forEach((s, i) => { s.style.background = i < score ? colors[Math.min(score - 1, 3)] : 'rgba(255,255,255,0.08)'; });
        strengthLabel.textContent = score > 0 ? labels[Math.min(score - 1, 3)] : 'Weak';
      });
    }

    if (loginForm) {
      loginForm.addEventListener('submit', e => { e.preventDefault(); });
    }
    if (registerForm) {
      registerForm.addEventListener('submit', e => { e.preventDefault(); });
    }
  })();

  /* ─── NEWS FILTER ────────────────────────────────────────────────────────── */
  (function initNewsFilter() {
    const filtersEl = document.getElementById('nfFilters');
    if (!filtersEl) return;

    const buttons = filtersEl.querySelectorAll('[data-filter]');
    const cards = document.querySelectorAll('.nf-card[data-category]');

    function setFilter(filter) {
      buttons.forEach(b => {
        const isActive = b.getAttribute('data-filter') === filter;
        b.classList.toggle('btn-primary', isActive);
        b.classList.toggle('btn-ghost', !isActive);
      });
      cards.forEach(c => {
        const show = filter === 'all' || c.getAttribute('data-category') === filter;
        c.classList.toggle('nf-hidden', !show);
      });
    }

    buttons.forEach(b => b.addEventListener('click', () => setFilter(b.getAttribute('data-filter'))));
    setFilter('all');
  })();

})();
