/* Ongrowing — shared chrome JS: nav drawer toggle + year stamps */
(function () {
  'use strict';

  // Year
  document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Nav drawer toggle
  const nav = document.querySelector('.nav');
  const overlay = document.querySelector('.nav-overlay');
  const openBtns = document.querySelectorAll('[data-nav-open]');
  const closeBtns = document.querySelectorAll('[data-nav-close]');

  function openNav() {
    if (!nav) return;
    nav.classList.add('open');
    if (overlay) overlay.classList.add('show');
    document.body.classList.add('no-scroll');
  }
  function closeNav() {
    if (!nav) return;
    nav.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
    document.body.classList.remove('no-scroll');
  }

  openBtns.forEach(b => b.addEventListener('click', openNav));
  closeBtns.forEach(b => b.addEventListener('click', closeNav));
  if (overlay) overlay.addEventListener('click', closeNav);

  // Close on Esc
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav();
  });

  // Auto-close drawer when a nav link is clicked (mobile + hamburger pages)
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => {
      // Only close if it's currently open (drawer mode)
      if (nav && nav.classList.contains('open')) closeNav();
    });
  });
})();
