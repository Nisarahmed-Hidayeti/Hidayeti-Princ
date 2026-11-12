/* Fade and lift elements into place as they first appear. */
(function () {
  "use strict";
  if (!Element.prototype.animate) return;

  const root = document.documentElement;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const running = new Set();
  const settled = new WeakSet();
  const easing = 'cubic-bezier(.24,.66,.32,1)';
  const surfaces = '.products-heading, .catalog-tools, .audience-heading, .audience-card, .brand-visual-card, .brand-copy-main, .brand-fact, .contact-panel, .product-card';

  function settle(element) {
    if (preference.matches || element.contains(document.activeElement)) return;
    const animation = element.animate(
      [{opacity: 0, translate: '0 56px'}, {opacity: 1, translate: '0 0'}],
      {duration: 870, easing, id: 'surface-settle'}
    );
    running.add(animation);
    animation.finished.then(() => running.delete(animation), () => running.delete(animation));
  }

  // Reveal each surface once when it enters the viewport.
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || preference.matches) return;
      observer.unobserve(entry.target);
      if (settled.has(entry.target)) return;
      settled.add(entry.target);
      settle(entry.target);
      entry.target.classList.add('has-entered');
    });
  }, {threshold: .08}) : null;
  function observeSurfaces() {
    if (!observer || preference.matches) return;
    document.querySelectorAll(surfaces).forEach(element => {
      if (!settled.has(element)) observer.observe(element);
    });
  }

  root.classList.toggle('motion-studio', !preference.matches);
  root.classList.toggle('scroll-entrances', Boolean(observer) && !preference.matches);
  observeSurfaces();

  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  progress.hidden = preference.matches;
  document.body.append(progress);
  let scrollFrame = 0;
  function updateProgress() {
    scrollFrame = 0;
    const distance = root.scrollHeight - window.innerHeight;
    const position = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
    progress.style.transform = `scaleX(${position})`;
  }
  function requestProgress() {
    if (!preference.matches && !scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
  }
  window.addEventListener('scroll', requestProgress, {passive: true});
  window.addEventListener('resize', requestProgress, {passive: true});
  updateProgress();

  const grid = document.getElementById('productGrid');
  if (grid) new MutationObserver(records => {
    // Release removed filter results rather than retaining detached cards.
    if (observer) records.forEach(record => record.removedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) observer.unobserve(node);
    }));
    observeSurfaces();
    requestProgress();
  }).observe(grid, {childList: true});

  // A small amount of pointer depth; touch scrolling stays entirely native.
  let target = null, frame = 0, pointerX = 0, pointerY = 0;
  function resetTarget() {
    if (frame) { cancelAnimationFrame(frame); frame = 0; }
    if (target) {
      target.style.removeProperty('--pointer-x');
      target.style.removeProperty('--pointer-y');
    }
    target = null;
  }
  document.addEventListener('pointermove', event => {
    if (preference.matches || !finePointer.matches || event.pointerType === 'touch') return;
    const next = event.target.closest('.hero-visual, .product-image-wrap');
    if (next !== target) { resetTarget(); target = next; }
    if (!target) return;
    pointerX = event.clientX; pointerY = event.clientY;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (!target) return;
      const box = target.getBoundingClientRect();
      const clamp = value => Math.max(-.5, Math.min(.5, value));
      target.style.setProperty('--pointer-x', String(clamp((pointerX - box.left) / box.width - .5)));
      target.style.setProperty('--pointer-y', String(clamp((pointerY - box.top) / box.height - .5)));
    });
  }, {passive: true});
  document.addEventListener('pointerout', event => { if (!event.relatedTarget) resetTarget(); });
  window.addEventListener('blur', resetTarget);
  window.addEventListener('scroll', resetTarget, {passive: true});
  finePointer.addEventListener('change', resetTarget);
  preference.addEventListener('change', () => {
    root.classList.toggle('motion-studio', !preference.matches);
    root.classList.toggle('scroll-entrances', Boolean(observer) && !preference.matches);
    progress.hidden = preference.matches;
    if (preference.matches) {
      running.forEach(animation => animation.cancel());
      if (observer) observer.disconnect();
      if (scrollFrame) { cancelAnimationFrame(scrollFrame); scrollFrame = 0; }
      resetTarget();
    } else {
      observeSurfaces();
      requestProgress();
    }
  });
})();
