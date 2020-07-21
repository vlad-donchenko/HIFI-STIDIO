'use strict';

(function () {
  const footer = document.querySelector('.site-footer');
  const footerMenuToggles = [...footer.querySelectorAll('.menu-footer__toggle')];


  const toggleShowSubMenuClickHandler = (evt) => {
    evt.preventDefault();

    const button = evt.target;

    button.closest('.menu-footer__column').classList.toggle('menu-footer__column--open');
  };

  footerMenuToggles.forEach((toggle) => {
    toggle.addEventListener('click', toggleShowSubMenuClickHandler);
  });
})();
