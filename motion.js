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
        animate(inner, [{transform:'translateY(115%) rotate(5deg)',opacity:0},{transform:'translateY(0) rotate(0)',opacity:1}],
          {duration:1100,delay:180 + order++ * 115,easing,fill:'backwards'});
      });
      node.replaceWith(fragment);
    });
  }
  const visual = document.querySelector('.hero-visual');
  if (visual) animate(visual,
    [{clipPath:'inset(7% 0 93% 0 round 24px)',opacity:0,transform:'scale(1.07)'},
     {clipPath:'inset(0% 0 0% 0 round 24px)',opacity:1,transform:'scale(1)'}],
    {duration:1450,delay:260,easing,fill:'backwards'});

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (preference.matches) return;
      const index = Number(entry.target.style.getPropertyValue('--card-order')) || 0;
      animate(entry.target,
        [{opacity:0,transform:'perspective(1000px) translateY(55px) rotateX(7deg) scale(.96)'},
         {opacity:1,transform:'perspective(1000px) translateY(0) rotateX(0) scale(1)'}],
        {duration:850,delay:(index % 3) * 95,easing,fill:'backwards'});
    });
  }, {threshold:.08}) : null;
  const grid = document.getElementById('productGrid');
  function observeCards() { if (observer) grid.querySelectorAll('.product-card').forEach(card => observer.observe(card)); }
  if (grid) {
    observeCards();
    new MutationObserver(observeCards).observe(grid, {childList:true});
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
    if (observer) observer.disconnect(); resetTarget(); root.classList.remove('motion-studio');
  });
})();
