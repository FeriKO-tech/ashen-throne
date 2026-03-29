/* Particle system — home page only (index.njk / index.html)
   Extracted from inline script for use as a standalone module.
   Loaded via <script src="/assets/js/particles.js"> after main.js.  */
(function () {
  'use strict';
  var canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d'), particles = [], animFrame;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function Particle() { this.reset(); }
  Particle.prototype.reset = function () {
    this.x         = Math.random() * canvas.width;
    this.y         = canvas.height + Math.random() * 100;
    this.size      = Math.random() * 3 + 0.5;
    this.speedX    = (Math.random() - 0.5) * 0.8;
    this.speedY    = -(Math.random() * 1.5 + 0.3);
    this.opacity   = Math.random() * 0.7 + 0.1;
    this.fadeSpeed = Math.random() * 0.003 + 0.001;
    this.life      = 1;
    this.wobble      = Math.random() * Math.PI * 2;
    this.wobbleSpeed = Math.random() * 0.02 + 0.005;
    var r = Math.random();
    this.color = r > 0.3 ? 'rgba(201,168,76,'  + this.opacity + ')' :
                 r > 0.15 ? 'rgba(200,100,50,' + this.opacity + ')' :
                              'rgba(180,160,140,' + (this.opacity * 0.5) + ')';
  };
  Particle.prototype.update = function () {
    this.wobble += this.wobbleSpeed;
    this.x      += this.speedX + Math.sin(this.wobble) * 0.3;
    this.y      += this.speedY;
    this.life   -= this.fadeSpeed;
    if (this.life <= 0 || this.y < -20) this.reset();
  };
  Particle.prototype.draw = function () {
    ctx.globalAlpha = this.life * this.opacity;
    ctx.fillStyle   = this.color;
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = this.life * this.opacity * 0.3;
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2); ctx.fill();
  };

  var count = Math.min(80, Math.floor(window.innerWidth / 15));
  for (var i = 0; i < count; i++) {
    var p = new Particle();
    p.y = Math.random() * canvas.height;
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function (p) { p.update(); p.draw(); });
    ctx.globalAlpha = 1;
    animFrame = requestAnimationFrame(animate);
  }
  animate();

  var hero = document.getElementById('hero');
  if (hero) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          if (!animFrame) animate();
        } else {
          cancelAnimationFrame(animFrame);
          animFrame = null;
        }
      });
    }, { threshold: 0.1 }).observe(hero);
  }
}());
