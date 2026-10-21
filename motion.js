/* Motion enhancement. Content remains available without this script. */
(function () {
  "use strict";
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !Element.prototype.animate) return;
  const root = document.documentElement;
  root.classList.add('motion-studio');
  const running = new Set();
  function animate(element, frames, options) {
    const animation = element.animate(frames, options);
    running.add(animation);
    animation.finished.then(() => running.delete(animation), () => running.delete(animation));
    return animation;
  }
  const easing = 'cubic-bezier(.16,1,.3,1)';
  const heading = document.querySelector('.hero-copy h1');
  if (heading) {
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    let order = 0;
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(word => {
        if (!word.trim()) { fragment.append(document.createTextNode(word)); return; }
        const mask = document.createElement('span');
        mask.className = 'word-mask';
        const inner = document.createElement('span');
        inner.textContent = word;
        mask.append(inner); fragment.append(mask);
        animate(inner, [{transform:'translateY(115%)',opacity:0},{transform:'translateY(0)',opacity:1}],
          {duration:1250,delay:160 + order++ * 135,easing,fill:'backwards'});
      });
      node.replaceWith(fragment);
    });
  }
  const visual = document.querySelector('.hero-visual');
  if (visual) animate(visual,
    [{clipPath:'inset(8% 45% 8% 45% round 24px)',opacity:.55,transform:'scale(1.08)'},
     {clipPath:'inset(0 0 0 0 round 24px)',opacity:1,transform:'scale(1)'}],
    {duration:1450,delay:260,easing,fill:'backwards'});

  // Mirror the outer cards around the center of each actual row, at every breakpoint.
  function rowEntrance(element) {
    const parent = element.parentElement;
    const style = getComputedStyle(parent);
    const columns = style.display === 'grid' ? style.gridTemplateColumns.split(' ').length : 1;
    const siblings = [...parent.children];
    const index = siblings.indexOf(element);
    const rowStart = Math.floor(index / columns) * columns;
    const count = Math.min(columns, siblings.length - rowStart);
    const center = (count - 1) / 2;
    const axis = center ? (index - rowStart - center) / center : 0;
    return { x: Math.round(axis * 34), delay: Math.round(Math.abs(axis) * 100) };
  }
  const onScreen = new WeakSet();
  const lastEntrance = new WeakMap();
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) { onScreen.delete(entry.target); return; }
      if (preference.matches || onScreen.has(entry.target)) return;
      onScreen.add(entry.target);
      const now = performance.now();
      if (now - (lastEntrance.get(entry.target) ?? -Infinity) < 1600) return;
      lastEntrance.set(entry.target, now);
      const position = rowEntrance(entry.target);
      animate(entry.target,
        [{opacity:.55,transform:`perspective(1000px) translate3d(${position.x}px, 38px, 0) rotateX(6deg) scale(.95)`},
         {opacity:1,transform:'perspective(1000px) translate3d(0,0,0) rotateX(0) scale(1)'}],
        {duration:950,delay:position.delay,easing,fill:'backwards',id:'surface-arrive'});
    });
  }, {threshold:.08}) : null;
  if (observer) document.querySelectorAll('.audience-card, .brand-visual-card, .brand-fact, .contact-panel').forEach((element, index) => {
    element.style.setProperty('--card-order', index);
    observer.observe(element);
  });
  // Float only while the hero is on screen; no background animation loop in JS.
  const heroObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    root.classList.toggle('hero-in-view', entries.some(entry => entry.isIntersecting));
  }) : null;
  if (heroObserver && visual) heroObserver.observe(visual);
  const grid = document.getElementById('productGrid');
  function observeCards() { if (observer) grid.querySelectorAll('.product-card').forEach(card => observer.observe(card)); }
  if (grid) {
    observeCards();
    new MutationObserver(() => {
      if (preference.matches) return;
      observeCards();
      const count = document.getElementById('resultsCount');
      if (count) animate(count, [{transform:'translateY(8px)',opacity:.5},{transform:'translateY(0)',opacity:1}], {duration:450,easing,id:'results-change'});
    }).observe(grid, {childList:true});
  }

  // A quiet reading line ties the long page together without a constant loop.
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  let scrollFrame = 0;
  function updateProgress() {
    scrollFrame = 0;
    const distance = root.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0})`;
  }
  function requestProgress() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
  }
  window.addEventListener('scroll', requestProgress, {passive:true});
  window.addEventListener('resize', requestProgress, {passive:true});
  updateProgress();

  // Press feedback works on touch and keyboard, not just desktop hover.
  document.addEventListener('click', event => {
    if (preference.matches) return;
    const button = event.target.closest('.button, .filter-chip, .product-details, .product-wa, .mobile-menu-toggle');
    if (!button) return;
    animate(button, [{scale:'.94'},{scale:'1.035',offset:.65},{scale:'1'}], {duration:420,easing,id:'button-press'});
    if (button.matches('.mobile-menu-toggle')) return;
    button.classList.add('has-tap-effect');
    const box = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'tap-ripple';
    ripple.setAttribute('aria-hidden', 'true');
    const size = Math.max(box.width, box.height) * 2;
    Object.assign(ripple.style, {
      width: `${size}px`, height: `${size}px`,
      left: `${(event.detail ? event.clientX - box.left : box.width / 2) - size / 2}px`,
      top: `${(event.detail ? event.clientY - box.top : box.height / 2) - size / 2}px`
    });
    button.append(ripple);
    const effect = animate(ripple, [{transform:'scale(.05)',opacity:.3},{transform:'scale(1)',opacity:0}], {duration:650,easing});
    effect.finished.then(() => ripple.remove(), () => ripple.remove());
  });

  // A single delegated pointer handler; touch devices retain their normal scrolling.
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let target = null, frame = 0, pointerX = 0, pointerY = 0;
  function resetTarget() {
    if (target) { target.style.removeProperty('--pointer-x'); target.style.removeProperty('--pointer-y'); }
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
      target.style.setProperty('--pointer-x', String((pointerX - box.left) / box.width - .5));
      target.style.setProperty('--pointer-y', String((pointerY - box.top) / box.height - .5));
    });
  }, {passive:true});
  document.addEventListener('pointerout', event => { if (!event.relatedTarget) resetTarget(); });
  window.addEventListener('scroll', resetTarget, {passive:true});
  preference.addEventListener('change', () => {
    if (!preference.matches) return;
    running.forEach(animation => animation.cancel());
    if (observer) observer.disconnect();
    if (heroObserver) heroObserver.disconnect();
    resetTarget(); root.classList.remove('motion-studio', 'hero-in-view');
  });
})();
