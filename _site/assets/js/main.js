/* ═══════════════════════════════════════════
   ASHEN THRONE — Shared JavaScript
   Ironveil Studios © 2026
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─── GLOBAL FLAGS ──────────────────────────────────────────────────────── */
  const _prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const _scrollBehavior = _prefersReducedMotion ? 'auto' : 'smooth';
  function scrollToTarget(target) {
    if (!target) return;
    target.scrollIntoView({ behavior: _scrollBehavior, block: 'start' });
  }
  function shouldSkipPageTransition(link, href) {
    if (!href || _prefersReducedMotion) return true;
    if (href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:') || href.startsWith('tel:')) return true;
    if (href.startsWith('#')) return true;
    if (link.hasAttribute('target') || link.hasAttribute('download') || link.hasAttribute('data-no-transition')) return true;
    return false;
  }

  /* ─── PAGE LOAD & PRELOADER ─────────────────────────────────────────────── */
  (function initPageLoad() {
    const plEl  = document.getElementById('preloader');
    const plBar = document.getElementById('plBar');
    const returnVisit = !!sessionStorage.getItem('at_pl_shown');

    if (returnVisit) {
      /* Second visit: hide preloader instantly, show nav without delay */
      if (plEl) plEl.classList.add('pl-done');
      document.body.classList.remove('page-loading');
      document.body.classList.add('page-loaded', 'no-preloader');
    } else {
      /* First visit: run progress bar, dismiss after DURATION */
      const DURATION = _prefersReducedMotion ? 400 : 2500;
      const start    = performance.now();

      setTimeout(() => {
        document.body.classList.remove('page-loading');
        document.body.classList.add('page-loaded');
      }, 200);

      if (plEl) {
        let preloaderFinished = false;

        function finishPreloader() {
          if (preloaderFinished) return;
          preloaderFinished = true;
          if (plBar) plBar.style.width = '100%';
          setTimeout(() => {
            plEl.classList.add('pl-done');
            sessionStorage.setItem('at_pl_shown', '1');
          }, _prefersReducedMotion ? 0 : 300);
        }

        function plStep(now) {
          if (preloaderFinished) return;
          const pct = Math.min((now - start) / DURATION * 100, 100);
          if (plBar) plBar.style.width = pct + '%';
          if (pct < 100) {
            requestAnimationFrame(plStep);
          } else {
            finishPreloader();
          }
        }
        requestAnimationFrame(plStep);
        setTimeout(finishPreloader, DURATION + (_prefersReducedMotion ? 50 : 1200));
      }
    }
  })();

  /* ─── NAVIGATION ─────────────────────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  function setMobileMenuState(isOpen) {
    if (hamburger) {
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }
    if (mobileMenu) {
      mobileMenu.classList.toggle('active', isOpen);
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function toggleMobileMenu() {
    if (!mobileMenu) return;
    setMobileMenuState(!mobileMenu.classList.contains('active'));
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', toggleMobileMenu);
    hamburger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMobileMenu();
      }
    });
  }

  window.closeMobile = function () {
    setMobileMenuState(false);
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

  if (!_prefersReducedMotion && cursorEl && cursorDot && window.matchMedia('(hover: hover)').matches) {
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

  /* (Newsletter validation is handled by initNewsletter() below) */

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

    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: _scrollBehavior }));
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
    if (pageTrans && !_prefersReducedMotion) {
      pageTrans.style.opacity = '0.6';
      pageTrans.style.pointerEvents = 'auto';
      setTimeout(() => {
        scrollToTarget(target);
        setTimeout(() => {
          pageTrans.style.opacity = '0';
          pageTrans.style.pointerEvents = 'none';
        }, 300);
      }, 200);
    } else {
      scrollToTarget(target);
    }
  }

  /* ─── PAGE NAVIGATION (cross-page links with blink) ─────────────────────── */
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    link.addEventListener('click', e => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (shouldSkipPageTransition(link, href)) return;
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
    const authParams = new URLSearchParams(window.location.search);
    const authTab = authParams.get('tab');
    if (authTab === 'register') {
      showRegister();
    } else if (authTab === 'login') {
      showLogin();
    }

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

  /* ─── YOUTUBE LITE EMBED ──────────────────────────────────────────────────── */
  (function initYTLite() {
    document.querySelectorAll('.yt-lite[data-vid]').forEach(el => {
      el.addEventListener('click', function handleYTClick() {
        el.removeEventListener('click', handleYTClick);
        const vid   = el.getAttribute('data-vid');
        const start = el.getAttribute('data-start') || '0';
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src',
          `https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&mute=1&rel=0&modestbranding=1&start=${start}`);
        iframe.setAttribute('allow',
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('title', el.getAttribute('data-title') || 'Trailer');
        el.innerHTML = '';
        el.appendChild(iframe);
        el.style.cursor = 'default';
      });
    });
  })();

  /* ─── COUNTDOWN TIMER ─────────────────────────────────────────────────────── */
  (function initCountdown() {
    const root = document.getElementById('countdown');
    if (!root) return;

    const TARGET = new Date('2026-06-15T10:00:00Z').getTime();
    const dEl = root.querySelector('[data-cd="d"]');
    const hEl = root.querySelector('[data-cd="h"]');
    const mEl = root.querySelector('[data-cd="m"]');
    const sEl = root.querySelector('[data-cd="s"]');
    const expEl = root.querySelector('.countdown-expired');
    if (!dEl || !hEl || !mEl || !sEl) return;

    function pad(n) { return String(n).padStart(2, '0'); }

    function flip(el, val) {
      const cur = el.textContent;
      if (cur === val) return;
      el.classList.add('flip');
      setTimeout(() => { el.textContent = val; el.classList.remove('flip'); }, 150);
    }

    let cdTimer;

    function tick() {
      const now  = Date.now();
      const diff = TARGET - now;

      if (diff <= 0) {
        clearInterval(cdTimer);
        const grid = root.querySelector('.countdown-grid');
        if (grid) grid.style.display = 'none';
        if (expEl) { expEl.textContent = '\u2234 PATCH IS LIVE \u2014 Update Your Launcher'; expEl.style.display = 'block'; }
        return;
      }

      const days  = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins  = Math.floor((diff %  3600000) /   60000);
      const secs  = Math.floor((diff %    60000) /    1000);

      flip(dEl, pad(days));
      flip(hEl, pad(hours));
      flip(mEl, pad(mins));
      flip(sEl, pad(secs));
    }

    tick();
    cdTimer = setInterval(tick, 1000);
  })();

  /* ─── SHOP CART ───────────────────────────────────────────────────────────── */
  (function initShopCart() {
    const CART_KEY = 'ashenthrone_cart';
    const panel    = document.getElementById('cartPanel');
    const backdrop = document.getElementById('cartBackdrop');
    const badge    = document.getElementById('cartBadge');
    const trigger  = document.getElementById('cartTrigger');
    const closeBtn = document.getElementById('cartClose');
    const itemsEl  = document.getElementById('cartItems');
    const totalEl  = document.getElementById('cartTotal');
    if (!badge || !trigger) return;

    /* ── state ─────── */
    function loadCart() {
      try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
      catch { return []; }
    }
    function saveCart(cart) {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    let cart = loadCart();

    /* ── badge ─────── */
    function updateBadge() {
      const count = cart.reduce((s, i) => s + i.qty, 0);
      badge.textContent = count;
      badge.classList.toggle('visible', count > 0);
    }

    /* ── render ────── */
    function renderCart() {
      if (!itemsEl) return;
      if (cart.length === 0) {
        itemsEl.innerHTML = `
          <div class="cart-empty">
            <div class="cart-empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <p class="cart-empty-text">Your war chest is empty.</p>
          </div>`;
        if (totalEl) totalEl.textContent = '0';
        return;
      }

      let total = 0;
      itemsEl.innerHTML = cart.map((item, idx) => {
        total += item.price * item.qty;
        return `<div class="cart-item" data-idx="${idx}">
          <div class="cart-item-thumb">
            <div style="width:100%;height:100%;${item.bg}"></div>
          </div>
          <div>
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price"><span class="cart-total-sym">&#x2B21;</span>${item.price.toLocaleString()}</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:0.4rem;">
            <button class="cart-item-remove" data-remove="${idx}" aria-label="Remove">&times;</button>
            <div class="cart-qty">
              <button class="cart-qty-btn" data-dec="${idx}" aria-label="Decrease">&#8722;</button>
              <span class="cart-qty-num">${item.qty}</span>
              <button class="cart-qty-btn" data-inc="${idx}" aria-label="Increase">&#43;</button>
            </div>
          </div>
        </div>`;
      }).join('');

      if (totalEl) totalEl.textContent = total.toLocaleString();

      /* events */
      itemsEl.querySelectorAll('[data-remove]').forEach(btn => {
        btn.addEventListener('click', () => {
          cart.splice(Number(btn.getAttribute('data-remove')), 1);
          saveCart(cart); updateBadge(); renderCart();
        });
      });
      itemsEl.querySelectorAll('[data-dec]').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = Number(btn.getAttribute('data-dec'));
          if (cart[i].qty > 1) cart[i].qty--;
          else cart.splice(i, 1);
          saveCart(cart); updateBadge(); renderCart();
        });
      });
      itemsEl.querySelectorAll('[data-inc]').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = Number(btn.getAttribute('data-inc'));
          cart[i].qty++;
          saveCart(cart); updateBadge(); renderCart();
        });
      });
    }

    /* ── open / close ── */
    function openCart() {
      panel.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
      renderCart();
    }
    function closeCart() {
      panel.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }

    trigger.addEventListener('click', openCart);
    if (closeBtn) closeBtn.addEventListener('click', closeCart);
    if (backdrop) backdrop.addEventListener('click', closeCart);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && panel.classList.contains('open')) closeCart();
    });

    /* ── add-to-cart buttons ── */
    document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id    = btn.getAttribute('data-add-to-cart');
        const name  = btn.getAttribute('data-name')  || 'Item';
        const price = parseInt(btn.getAttribute('data-price') || '0', 10);
        const bg    = btn.getAttribute('data-bg')    || 'background:#0f0e18;';

        const existing = cart.find(i => i.id === id);
        if (existing) {
          existing.qty++;
        } else {
          cart.push({ id, name, price, qty: 1, bg });
        }
        saveCart(cart);
        updateBadge();
        badge.classList.add('bump');
        setTimeout(() => badge.classList.remove('bump'), 350);
      });
    });

    updateBadge();
  })();

  /* ─── SHOP WISHLIST ───────────────────────────────────────────────────────── */
  (function initWishlist() {
    const WL_KEY = 'ashenthrone_wishlist';
    function loadWL() {
      try { return new Set(JSON.parse(localStorage.getItem(WL_KEY)) || []); }
      catch { return new Set(); }
    }
    function saveWL(set) {
      localStorage.setItem(WL_KEY, JSON.stringify([...set]));
    }

    const wl = loadWL();

    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      const id = btn.getAttribute('data-wl-id');
      if (!id) return;

      if (wl.has(id)) btn.classList.add('wishlisted');

      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (wl.has(id)) { wl.delete(id); btn.classList.remove('wishlisted'); }
        else             { wl.add(id);    btn.classList.add('wishlisted');    }
        saveWL(wl);
      });
    });
  })();

  /* ─── SHOP FILTERS (enhanced with price) ─────────────────────────────────── */
  (function initShopFilters() {
    const catFilters   = document.getElementById('shopFilters');
    const priceFilters = document.getElementById('shopPriceFilters');
    const grid         = document.getElementById('shopGrid');
    if (!catFilters || !grid) return;

    let activeCat   = 'all';
    let activePriceMax = Infinity;

    function applyFilters() {
      const items = grid.querySelectorAll('.shop-item[data-category]');
      items.forEach(item => {
        const cat   = item.getAttribute('data-category');
        const price = parseInt(item.getAttribute('data-price') || '0', 10);
        const catOk   = activeCat === 'all' || cat === activeCat;
        const priceOk = price <= activePriceMax;
        const show    = catOk && priceOk;

        /* CSS opacity+scale transition */
        if (show) {
          item.classList.remove('shop-hidden');
          item.style.position = '';
          item.style.visibility = '';
        } else {
          item.classList.add('shop-hidden');
        }
      });
    }

    /* category btns */
    catFilters.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCat = btn.getAttribute('data-filter');
        catFilters.querySelectorAll('[data-filter]').forEach(b => {
          b.classList.toggle('btn-primary', b === btn);
          b.classList.toggle('btn-ghost',   b !== btn);
        });
        applyFilters();
      });
    });

    /* price btns */
    if (priceFilters) {
      priceFilters.querySelectorAll('.price-range-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          priceFilters.querySelectorAll('.price-range-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          activePriceMax = parseInt(btn.getAttribute('data-max') || '999999', 10);
          applyFilters();
        });
      });
    }

    applyFilters();
  })();

  /* ─── HERO PARALLAX ──────────────────────────────────────────────────────── */
  (function initHeroParallax() {
    if (_prefersReducedMotion) return;
    const heroBg = document.querySelector('.hero .hero-bg');
    if (!heroBg) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          heroBg.style.transform = 'translateY(' + (window.scrollY * 0.35) + 'px)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  })();

  /* ─── SERVER STATUS TICKER ────────────────────────────────────────────────── */
  (function initServerStatus() {
    const el = document.getElementById('playersCount');
    if (!el) return;
    const base = 1247;
    setInterval(() => {
      const delta = Math.floor(Math.random() * 61) - 30;
      el.textContent = (base + delta).toLocaleString();
    }, 8000);
  })();

  /* ─── SHOP FEATURED DEAL — 72 h COUNTDOWN ────────────────────────────────── */
  (function initDealTimer() {
    const el = document.getElementById('dealTimer');
    if (!el) return;
    const KEY    = 'at_deal_end';
    const SECS72 = 72 * 3600;
    let end = parseInt(sessionStorage.getItem(KEY) || '0', 10);
    if (!end || end < Date.now() / 1000) {
      end = Math.floor(Date.now() / 1000) + SECS72;
      sessionStorage.setItem(KEY, String(end));
    }
    function pad2(n) { return String(n).padStart(2, '0'); }
    function tick() {
      const diff = end - Math.floor(Date.now() / 1000);
      if (diff <= 0) { el.textContent = '00:00:00'; return; }
      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;
      el.textContent = pad2(h) + ':' + pad2(m) + ':' + pad2(s);
    }
    tick();
    setInterval(tick, 1000);
  })();

  /* ─── FLY-TO-CART ANIMATION ──────────────────────────────────────────────── */
  (function initFlyToCart() {
    if (_prefersReducedMotion) return;
    const cartTrigger = document.getElementById('cartTrigger');
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-add-to-cart]');
      if (!btn || !cartTrigger) return;

      const btnRect  = btn.getBoundingClientRect();
      const cartRect = cartTrigger.getBoundingClientRect();

      const dot = document.createElement('div');
      dot.className = 'fly-dot';
      dot.style.cssText =
        'left:' + (btnRect.left + btnRect.width / 2 - 7) + 'px;' +
        'top:'  + (btnRect.top  + btnRect.height / 2 - 7) + 'px;' +
        'position:fixed;';
      document.body.appendChild(dot);

      const tx = cartRect.left + cartRect.width  / 2 - 7;
      const ty = cartRect.top  + cartRect.height / 2 - 7;

      requestAnimationFrame(() => {
        dot.style.transition = 'left 0.55s cubic-bezier(0.25,0.46,0.45,0.94), top 0.55s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.55s, transform 0.55s';
        dot.style.left      = tx + 'px';
        dot.style.top       = ty + 'px';
        dot.style.opacity   = '0';
        dot.style.transform = 'scale(0.3)';
      });

      setTimeout(() => dot.remove(), 600);
    });
  })();

  /* ─── STAT BARS ANIMATION ────────────────────────────────────────────────── */
  (function initStatBars() {
    const cards = document.querySelectorAll('.class-card-page[data-pwr][data-def][data-spd][data-mag][data-utl]');
    if (!cards.length) return;

    const statKeys = ['pwr', 'def', 'spd', 'mag', 'utl'];

    function fillCard(card) {
      if (card.dataset.statsAnimated === 'true') return;

      statKeys.forEach(key => {
        const fill = card.querySelector('.stat-fill[data-stat-key="' + key + '"]');
        const raw = parseInt(card.dataset[key] || '0', 10);
        const value = Math.max(0, Math.min(10, raw));
        if (fill) fill.style.width = (value * 10) + '%';
      });

      card.dataset.statsAnimated = 'true';
    }

    if (_prefersReducedMotion) {
      cards.forEach(card => {
        card.querySelectorAll('.stat-fill').forEach(fill => {
          fill.style.transition = 'none';
        });
        fillCard(card);
      });
      return;
    }

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fillCard(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    cards.forEach(card => obs.observe(card));
  })();

  /* ─── NEWSLETTER VALIDATION ───────────────────────────────────────────────── */
  (function initWorldMap() {
    const panel = document.getElementById('wmPanel');
    const tooltip = document.getElementById('wmTooltip');
    const container = document.getElementById('wmContainer');
    const closeBtn = document.getElementById('wmClose');
    if (!panel || !container) return;

    const regions = Array.from(document.querySelectorAll('.wm-region[data-region]'));
    const markers = Array.from(document.querySelectorAll('.wm-marker[data-region]'));
    const battles = Array.from(document.querySelectorAll('.wm-battle-group[data-region]'));
    const labels = Array.from(document.querySelectorAll('.wm-map-label[data-region-label]'));
    const railCards = Array.from(document.querySelectorAll('.wm-rail-card[data-region-target]'));

    const panelEls = {
      kicker: document.getElementById('wmKicker'),
      name: document.getElementById('wmName'),
      faction: document.getElementById('wmClass'),
      status: document.getElementById('wmStatus'),
      statusDot: document.getElementById('wmStatusDot'),
      lore: document.getElementById('wmLore'),
      dangerBar: document.getElementById('wmDangerBar'),
      dangerVal: document.getElementById('wmDangerVal'),
      pressureBar: document.getElementById('wmPressureBar'),
      pressureVal: document.getElementById('wmPressureVal'),
      richesBar: document.getElementById('wmRichesBar'),
      richesVal: document.getElementById('wmRichesVal'),
      level: document.getElementById('wmLevel'),
      control: document.getElementById('wmControl'),
      objective: document.getElementById('wmObjective'),
      reward: document.getElementById('wmReward'),
      tags: document.getElementById('wmTags'),
      primaryLink: document.getElementById('wmPrimaryLink'),
      secondaryLink: document.getElementById('wmSecondaryLink')
    };

    const regionData = {
      ashfeld: {
        name: 'Ashfeld',
        kicker: 'Imperial heartland',
        faction: 'Ashen Crown Stronghold',
        status: 'Open War',
        statusColor: '#c9a84c',
        lore: 'The empire died here but its vaults still breathe. Every siege uncovers old machinery, broken relics, and another reason for guilds to burn the field again before dawn.',
        danger: 8,
        pressure: 9,
        riches: 7,
        level: '30-45',
        control: 'Ashen Crown',
        objective: 'Relic vault sieges',
        reward: 'Throne shards',
        tags: ['Siege warfare', 'Relic vaults', 'Guild lines'],
        primaryText: 'Deploy to Ashfeld',
        primaryHref: '/account.html?tab=register#authCard',
        secondaryText: 'Read the chronicles',
        secondaryHref: '/lore.html',
        tooltip: 'Ashfeld front - Imperial siege lines collapse and reform nightly'
      },
      dreadmoors: {
        name: 'Dreadmoors',
        kicker: 'Fog-choked borderland',
        faction: 'Warden Orders',
        status: 'Containment Breaking',
        statusColor: '#7b8a69',
        lore: 'Wardens still hold the old marsh roads, but the curse in the reeds is learning new names. Patrols vanish, forts sink, and every retreat leaves the fog stronger.',
        danger: 7,
        pressure: 6,
        riches: 5,
        level: '20-35',
        control: 'Warden orders',
        objective: 'Hold the fog line',
        reward: 'Cursed marrow',
        tags: ['Fort defense', 'Hexed beasts', 'Warden patrols'],
        primaryText: 'Scout the marsh lines',
        primaryHref: '/classes.html',
        secondaryText: 'Track frontline updates',
        secondaryHref: '/news.html',
        tooltip: 'Dreadmoors breach - Fog line defenses are under pressure'
      },
      umbralCoast: {
        name: 'Umbral Coast',
        kicker: 'Black-salt shoreline',
        faction: 'Iron Compact Armada',
        status: 'Trade War',
        statusColor: '#b8c5d6',
        lore: 'Smuggler fleets and contracted warbands trade cannon fire under drowned moonlight. Whoever controls these harbors decides which faction eats, arms, and survives the next campaign.',
        danger: 6,
        pressure: 8,
        riches: 8,
        level: '28-42',
        control: 'Iron Compact',
        objective: 'Break the smuggler toll',
        reward: 'Black-salt cargo',
        tags: ['Harbor raids', 'Leviathan hunts', 'Naval routes'],
        primaryText: 'View naval classes',
        primaryHref: '/classes.html',
        secondaryText: 'Read war dispatches',
        secondaryHref: '/news.html',
        tooltip: 'Umbral Coast raid - Tidebound leviathan routes are active'
      },
      veilhaven: {
        name: 'Veilhaven',
        kicker: 'Neutral city of knives',
        faction: 'Neutral Charter',
        status: 'Contract Season',
        statusColor: '#d1d7de',
        lore: 'Veilhaven sells shelter, information, and betrayal in equal measure. Assassins, quartermasters, and exiles all meet under its lanterns because no faction can afford to lose the city outright.',
        danger: 5,
        pressure: 7,
        riches: 9,
        level: '18-40',
        control: 'Neutral charter',
        objective: 'Broker contracts',
        reward: 'Spyglass contracts',
        tags: ['Espionage', 'Merchant webs', 'Faction diplomacy'],
        primaryText: 'Enter the black market',
        primaryHref: '/shop.html',
        secondaryText: 'Study the lore',
        secondaryHref: '/lore.html',
        tooltip: 'Veilhaven network - Contracts shift power without open war'
      },
      pyremark: {
        name: 'Pyremark',
        kicker: 'Magma frontier',
        faction: 'Dreadknight Clans',
        status: 'Cataclysm Rising',
        statusColor: '#d77d38',
        lore: 'The mountain range is waking up. Dreadknight clans mine its veins, cults descend into its furnaces, and every eruption reveals another dungeon no sane scout wanted found.',
        danger: 9,
        pressure: 7,
        riches: 9,
        level: '35-50',
        control: 'Dreadknight clans',
        objective: 'Descend the magma veins',
        reward: 'Volcanic ore',
        tags: ['Dungeon delves', 'Forge raids', 'Magma storms'],
        primaryText: 'Prepare your build',
        primaryHref: '/download.html#system-requirements',
        secondaryText: 'Study Pyremark lore',
        secondaryHref: '/lore.html',
        tooltip: 'Pyremark descent - Magma vein access is open'
      },
      voidrift: {
        name: 'Voidrift',
        kicker: 'Anomaly horizon',
        faction: 'Voidborn Dominion',
        status: 'Reality Failing',
        statusColor: '#8f6bda',
        lore: 'Nothing in Voidrift stays finished. Shorelines peel away into shadow, beasts arrive from the wrong stars, and every expedition returns with fewer answers than bodies.',
        danger: 10,
        pressure: 8,
        riches: 6,
        level: '40-60',
        control: 'Voidborn',
        objective: 'Survive the anomaly line',
        reward: 'Fractured void sigils',
        tags: ['Anomaly storms', 'Void incursions', 'Endgame hunts'],
        primaryText: 'Register for the war',
        primaryHref: '/account.html?tab=register#authCard',
        secondaryText: 'Open support briefings',
        secondaryHref: '/support.html',
        tooltip: 'Voidrift anomaly - A second shadow stirs offshore'
      }
    };

    panel.setAttribute('tabindex', '-1');
    let activeRegion = '';
    let lastActivator = null;

    function isCompactWorldMap() {
      return window.innerWidth <= 900;
    }

    function syncPanelMode() {
      if (!isCompactWorldMap()) {
        panel.classList.add('active');
        panel.setAttribute('aria-hidden', 'false');
      }
    }

    function setMeter(fillEl, valueEl, rawValue) {
      const value = Math.max(0, Math.min(10, Number(rawValue) || 0));
      if (fillEl) fillEl.style.width = value * 10 + '%';
      if (valueEl) valueEl.textContent = value + '/10';
    }

    function renderTags(tags) {
      if (!panelEls.tags) return;
      panelEls.tags.innerHTML = '';
      tags.forEach(tag => {
        const pill = document.createElement('span');
        pill.className = 'wm-tag';
        pill.textContent = tag;
        panelEls.tags.appendChild(pill);
      });
    }

    function updateHash(key) {
      if (!window.history || !window.history.replaceState) return;
      window.history.replaceState(null, '', window.location.pathname + window.location.search + '#' + key);
    }

    function setTooltipPosition(event) {
      if (!tooltip || typeof event.clientX !== 'number' || typeof event.clientY !== 'number') return;
      const rect = container.getBoundingClientRect();
      tooltip.style.left = event.clientX - rect.left + 'px';
      tooltip.style.top = event.clientY - rect.top - 12 + 'px';
    }

    function showTooltip(text, event) {
      if (!tooltip || !text) return;
      tooltip.textContent = text;
      tooltip.classList.add('visible');
      if (event) setTooltipPosition(event);
    }

    function hideTooltip() {
      if (tooltip) tooltip.classList.remove('visible');
    }

    function activateRegion(key, shouldFocusPanel, shouldSyncHash) {
      const resolvedKey = regionData[key] ? key : 'ashfeld';
      const data = regionData[resolvedKey];
      activeRegion = resolvedKey;

      panel.classList.add('active');
      panel.setAttribute('aria-hidden', 'false');
      panel.style.setProperty('--wm-accent', data.statusColor || '#c9a84c');

      if (panelEls.kicker) panelEls.kicker.textContent = data.kicker;
      if (panelEls.name) panelEls.name.textContent = data.name;
      if (panelEls.faction) panelEls.faction.textContent = data.faction;
      if (panelEls.status) panelEls.status.textContent = data.status;
      if (panelEls.statusDot) panelEls.statusDot.style.background = data.statusColor || '#c9a84c';
      if (panelEls.lore) panelEls.lore.textContent = data.lore;
      if (panelEls.level) panelEls.level.textContent = data.level;
      if (panelEls.control) panelEls.control.textContent = data.control;
      if (panelEls.objective) panelEls.objective.textContent = data.objective;
      if (panelEls.reward) panelEls.reward.textContent = data.reward;
      if (panelEls.primaryLink) {
        panelEls.primaryLink.textContent = data.primaryText;
        panelEls.primaryLink.setAttribute('href', data.primaryHref);
      }
      if (panelEls.secondaryLink) {
        panelEls.secondaryLink.textContent = data.secondaryText;
        panelEls.secondaryLink.setAttribute('href', data.secondaryHref);
      }

      setMeter(panelEls.dangerBar, panelEls.dangerVal, data.danger);
      setMeter(panelEls.pressureBar, panelEls.pressureVal, data.pressure);
      setMeter(panelEls.richesBar, panelEls.richesVal, data.riches);
      renderTags(data.tags || []);

      regions.forEach(region => {
        const isActive = region.dataset.region === resolvedKey;
        region.classList.toggle('wm-active', isActive);
        region.setAttribute('aria-pressed', String(isActive));
      });

      markers.forEach(marker => {
        marker.classList.toggle('wm-marker-active', marker.dataset.region === resolvedKey);
      });

      battles.forEach(group => {
        group.classList.toggle('wm-battle-group-active', group.dataset.region === resolvedKey);
      });

      labels.forEach(label => {
        label.classList.toggle('active', label.dataset.regionLabel === resolvedKey);
      });

      railCards.forEach(card => {
        const isActive = card.dataset.regionTarget === resolvedKey;
        card.classList.toggle('active', isActive);
        card.setAttribute('aria-pressed', String(isActive));
      });

      if (shouldSyncHash !== false) updateHash(resolvedKey);

      if (shouldFocusPanel) {
        if (isCompactWorldMap()) scrollToTarget(panel);
        if (typeof panel.focus === 'function') {
          try {
            panel.focus({ preventScroll: true });
          } catch (error) {
            panel.focus();
          }
        }
      }
    }

    regions.forEach(region => {
      const key = region.dataset.region;
      const data = regionData[key];

      region.addEventListener('click', () => {
        lastActivator = region;
        activateRegion(key, true, true);
      });
      region.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          lastActivator = region;
          activateRegion(key, true, true);
        }
      });
      region.addEventListener('mouseenter', event => showTooltip(data && data.tooltip, event));
      region.addEventListener('mousemove', setTooltipPosition);
      region.addEventListener('mouseleave', hideTooltip);
      region.addEventListener('focus', () => activateRegion(key, false, false));
    });

    markers.forEach(marker => {
      const key = marker.dataset.region;
      marker.addEventListener('click', () => {
        lastActivator = marker;
        activateRegion(key, true, true);
      });
      marker.addEventListener('mouseenter', event => showTooltip(marker.dataset.tooltip || (regionData[key] && regionData[key].tooltip), event));
      marker.addEventListener('mousemove', setTooltipPosition);
      marker.addEventListener('mouseleave', hideTooltip);
    });

    railCards.forEach(card => {
      card.setAttribute('aria-pressed', 'false');
      card.setAttribute('aria-controls', 'wmPanel');
      card.addEventListener('click', () => {
        lastActivator = card;
        activateRegion(card.dataset.regionTarget, true, true);
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (!isCompactWorldMap()) return;
        panel.classList.remove('active');
        panel.setAttribute('aria-hidden', 'true');
        hideTooltip();
        if (lastActivator && typeof lastActivator.focus === 'function') {
          lastActivator.focus();
        }
      });
    }

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && activeRegion && panel.classList.contains('active')) {
        if (!isCompactWorldMap()) return;
        panel.classList.remove('active');
        panel.setAttribute('aria-hidden', 'true');
        hideTooltip();
        if (lastActivator && typeof lastActivator.focus === 'function') {
          lastActivator.focus();
        }
      }
    });

    window.addEventListener('hashchange', () => {
      const hashKey = window.location.hash.replace('#', '');
      if (regionData[hashKey]) activateRegion(hashKey, false, false);
    });

    window.addEventListener('resize', syncPanelMode);

    const initialHash = window.location.hash.replace('#', '');
    syncPanelMode();
    activateRegion(regionData[initialHash] ? initialHash : 'ashfeld', false, false);
  })();

  (function initNewsletter() {
    const form    = document.getElementById('newsletterForm');
    const input   = document.getElementById('newsletterEmail');
    const success = document.getElementById('newsletterSuccess');
    if (!form || !input) return;

    const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const val = input.value.trim();
      if (!RE_EMAIL.test(val)) {
        input.classList.add('newsletter-error');
        input.focus();
        return;
      }
      input.classList.remove('newsletter-error');
      form.style.transition = 'opacity 0.25s';
      form.style.opacity    = '0';
      form.style.pointerEvents = 'none';
      setTimeout(() => { form.style.display = 'none'; }, 280);
      if (success) { success.style.display = 'block'; }
    });

    input.addEventListener('input', () => input.classList.remove('newsletter-error'));
  })();

})();
