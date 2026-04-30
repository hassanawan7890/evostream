const menuGroup = document.querySelector('.menu-group');
const menuButton = document.querySelector('.menu-icon');
const dropdown = document.querySelector('.dropdown');

if (menuGroup && menuButton && dropdown) {
  const firstLink = dropdown.querySelector('a');
  const usesTapNav = () =>
    window.matchMedia('(max-width: 960px)').matches ||
    window.matchMedia('(hover: none)').matches;

  const openMenu = () => {
    menuGroup.classList.add('is-open');
    menuButton.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    menuGroup.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    if (menuGroup.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  menuButton.addEventListener('click', event => {
    if (!usesTapNav()) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    toggleMenu();
  });

  menuButton.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openMenu();
      firstLink?.focus();
    }

    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  dropdown.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
      menuButton.focus();
    }
  });

  dropdown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('click', event => {
    if (!menuGroup.contains(event.target)) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (!usesTapNav()) {
      closeMenu();
    }
  });
}
