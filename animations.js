/* animations.js – Motion Relay interactive layer
   Free CDN deps: GSAP 3 + ScrollTrigger, Lenis, SplitType, VanillaTilt
*/
(function () {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // ── 1. LENIS SMOOTH SCROLL ─────────────────────────────────────────
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // ── 2. SCROLL REVEAL (spring pop, replaces IntersectionObserver) ───
  // Pre-mark .in so CSS opacity-0 state doesn't fight GSAP inline styles
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));

  // Animate .reveal elements that are NOT .text-reveal (those get SplitType)
  document.querySelectorAll('.reveal:not(.text-reveal)').forEach(el => {
    const d = el.classList.contains('reveal-d5') ? 0.5
            : el.classList.contains('reveal-d4') ? 0.4
            : el.classList.contains('reveal-d3') ? 0.3
            : el.classList.contains('reveal-d2') ? 0.2
            : el.classList.contains('reveal-d1') ? 0.1 : 0;
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      y: 32,
      scale: 0.96,
      opacity: 0,
      duration: 0.75,
      delay: d,
      ease: 'back.out(1.4)',
    });
  });

  // ── 3. SPLIT TEXT – word-by-word reveal on scroll ──────────────────
  if (typeof SplitType !== 'undefined') {
    document.querySelectorAll('.text-reveal').forEach(el => {
      // Pre-mark .reveal (if present) so CSS doesn't hide the container
      el.classList.add('in');
      const split = new SplitType(el, { types: 'lines,words' });
      if (split.lines) {
        split.lines.forEach(ln => {
          ln.style.overflow = 'hidden';
          ln.style.paddingBottom = '0.08em';
        });
      }
      gsap.from(split.words, {
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        yPercent: 110,
        opacity: 0,
        duration: 0.85,
        stagger: 0.055,
        ease: 'power4.out',
      });
    });
  }

  // ── 4. PARALLAX – inner image shifts within card on scroll ─────────
  document.querySelectorAll('.proj-img').forEach(container => {
    const inner = container.querySelector('.proj-img-ph, img, video');
    if (!inner) return;
    gsap.fromTo(inner,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      }
    );
  });

  // ── 5. HERO CONTENT PARALLAX ───────────────────────────────────────
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    gsap.to(heroContent, {
      yPercent: 28,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // ── 6. MAGNETIC BUTTONS ────────────────────────────────────────────
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - r.left - r.width / 2) * 0.35,
        y: (e.clientY - r.top - r.height / 2) * 0.35,
        duration: 0.4,
        ease: 'power2.out',
      });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    });
  });

  // ── 7. VANILLA TILT on .tilt-card elements ─────────────────────────
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
      max: 5,
      speed: 400,
      glare: true,
      'max-glare': 0.1,
      scale: 1.02,
    });
  }

  // ── 8. CUSTOM CURSOR (desktop / fine pointer only) ─────────────────
  if (window.matchMedia('(pointer: fine)').matches) {
    const ring = Object.assign(document.createElement('div'), { id: 'mr-cursor-ring' });
    const dot  = Object.assign(document.createElement('div'), { id: 'mr-cursor-dot'  });
    document.body.append(ring, dot);

    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    (function tick() {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.transform = `translate(${rx - 20}px,${ry - 20}px)`;
      dot.style.transform  = `translate(${mx - 3}px,${my - 3}px)`;
      requestAnimationFrame(tick);
    })();

    document.querySelectorAll('a,button,.proj-card,.testi-card,.cs-card,.pillar').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

})();
