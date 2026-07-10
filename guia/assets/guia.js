/* Guia Camelie: reveals por scroll, etapa ativa + trilho, parallax leve.
   Vanilla, sem dependências. Tudo degrada: sem JS a página é 100% legível. */
(function () {
  var doc = document;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* ---- reveals ---- */
  var reveals = [].slice.call(doc.querySelectorAll('[data-reveal]'));
  if (hasIO) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          revealIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { revealIO.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---- etapas: foto assenta + trilho de progresso ---- */
  var etapas = [].slice.call(doc.querySelectorAll('.etapa'));
  var rail = doc.querySelector('.rail');
  var dots = [];
  if (rail) {
    /* dots gerados a partir do número real de etapas: guias futuros podem ter outra contagem */
    etapas.forEach(function () { rail.appendChild(doc.createElement('span')); });
    dots = [].slice.call(rail.children);
  }
  if (etapas.length && hasIO) {
    var stepIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        var i = etapas.indexOf(e.target);
        dots.forEach(function (d, j) { d.classList.toggle('act', j === i); });
      });
    }, { rootMargin: '-40% 0px -40% 0px' });
    etapas.forEach(function (el) { stepIO.observe(el); });

    var bloco = doc.querySelector('.etapas');
    if (bloco && rail) {
      var railIO = new IntersectionObserver(function (entries) {
        rail.classList.toggle('on', entries[0].isIntersecting);
      }, { rootMargin: '-20% 0px -20% 0px' });
      railIO.observe(bloco);
    }
  } else {
    etapas.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---- parallax leve ---- */
  var alvos = [].slice.call(doc.querySelectorAll('[data-parallax]'));
  if (reduce || !alvos.length || !hasIO) return;

  var tracked = alvos.map(function (el) {
    return {
      el: el,
      ref: el.closest('.etapa') || el, /* dentro de etapa, o progresso vem da seção (a foto fica pinada) */
      f: parseFloat(el.getAttribute('data-parallax')) || 0.08,
      on: false
    };
  });

  var visIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      tracked.forEach(function (t) {
        if (t.ref === e.target) { t.on = e.isIntersecting; }
      });
    });
    queue(); /* aplica o transform já no load, sem esperar o primeiro scroll */
  }, { rootMargin: '10% 0px 10% 0px' });
  tracked.forEach(function (t) { visIO.observe(t.ref); });

  var ticking = false;
  function frame() {
    ticking = false;
    var vh = window.innerHeight;
    tracked.forEach(function (t) {
      if (!t.on) return;
      var r = t.ref.getBoundingClientRect();
      var delta = (r.top + r.height / 2 - vh / 2) * t.f;
      t.el.style.transform = 'translate3d(0,' + delta.toFixed(1) + 'px,0)';
    });
  }
  function queue() {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue, { passive: true });
  frame();
})();
