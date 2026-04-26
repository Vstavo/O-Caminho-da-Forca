(function () {
  'use strict';

  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || 0;

          setTimeout(() => {
            el.classList.add('visible');
          }, parseInt(delay, 10));

          revealObserver.unobserve(el);
        }
      });
    },
    {
      rootMargin: '-100px 0px',
      threshold: 0.1,
    }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', function () {
      window.location = './login.html'
    });
  }
})();
