'use strict';

// Native controls keep the gallery and disclosures usable without a framework.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const closeMenu = () => {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
};
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close' : 'Menu';
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
const breakpoint = window.matchMedia('(min-width: 768px)');
breakpoint.addEventListener('change', closeMenu);

const filters = document.querySelectorAll('[data-filter]');
const studies = document.querySelectorAll('[data-system]');
const status = document.querySelector('#gallery-status');
filters.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    document.querySelector('#art-grid').classList.toggle('is-filtered', selected !== 'all');
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    let visible = 0;
    studies.forEach(study => {
      study.hidden = selected !== 'all' && study.dataset.system !== selected;
      if (!study.hidden) visible += 1;
    });
    status.textContent = selected === 'all'
      ? `Showing all ${visible} studies`
      : `Showing ${visible} ${button.textContent.trim().toLowerCase()} study`;
  });
});
