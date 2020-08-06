'use strict';

(function () {
  const modalSearchButtons = [...document.querySelectorAll('.search-modal-button')];
  const searchSections = [...document.querySelectorAll('.search-modal')];

  if (modalSearchButtons.length > 0) {

    const closeSearchSection = () => {
      window.header.root.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', closeSearchKeyPressHandler);

      searchSections.forEach((searchSection) => {
        searchSection.classList.remove('search-modal--open');
        searchSection.querySelector('.search-modal__close').removeEventListener('click', closeSearchClickHandler);
      });
    };

    const openSearchClickHandler = (evt) => {
      evt.preventDefault();
      window.header.applyViewPort();
      window.header.root.classList.add('overflow-hidden');

      const searchSection = document.querySelector(`#${evt.target.closest('.search-modal-button').dataset.search}`);
      const closeButton = searchSection.querySelector('.search-modal__close');

      searchSection.classList.add('search-modal--open');
      closeButton.addEventListener('click', closeSearchClickHandler);
      document.addEventListener('keydown', closeSearchKeyPressHandler);
    };

    const closeSearchClickHandler = (evt) => {
      evt.preventDefault();
      window.header.applyViewPort();
      closeSearchSection();
    };

    const closeSearchKeyPressHandler = (evt) => {
      const isEsc = evt.key === window.header.ESCAPE;

      if (isEsc && !evt.target.classList.contains('search-modal__input')) {
        closeSearchSection();
      }
    };

    modalSearchButtons.forEach((modalSearchButton) => {
      modalSearchButton.addEventListener('click', openSearchClickHandler);
    });
  }
})();
