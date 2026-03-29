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

    const TARGET = new Date('2026-04-15T10:00:00Z').getTime();
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

    function tick() {
      const now  = Date.now();
      const diff = TARGET - now;

      if (diff <= 0) {
        dEl.textContent = '00'; hEl.textContent = '00';
        mEl.textContent = '00'; sEl.textContent = '00';
        if (expEl) expEl.style.display = 'block';
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
    setInterval(tick, 1000);
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
    if (!panel || !badge || !trigger) return;

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

})();
