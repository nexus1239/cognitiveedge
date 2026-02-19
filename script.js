document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Nav scroll border
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Scroll reveal with staggered delay
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(el => observer.observe(el));
  }

  // Tag filter
  const tagBtns = document.querySelectorAll('.tag[data-tag]');
  const cards   = document.querySelectorAll('.card[data-category]');
  if (tagBtns.length && cards.length) {
    tagBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tagBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tag = btn.dataset.tag;
        cards.forEach(card => {
          const match = tag === 'all' || card.dataset.category === tag;
          card.style.opacity    = match ? '1' : '0.25';
          card.style.transform  = match ? '' : 'scale(0.97)';
          card.style.pointerEvents = match ? '' : 'none';
        });
      });
    });
  }

});
