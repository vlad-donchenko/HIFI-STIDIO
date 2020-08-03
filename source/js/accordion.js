'use strict';

(function() {
  const accordionWrapper = document.querySelector('.toggle-content');

  if (accordionWrapper) {
    const accordionItems = [...accordionWrapper.querySelectorAll('.toggle-content')];

    accordionItems.forEach((accordionItem) => {
      const toggle = accordionItem.querySelector('.toggle-content__title');

      toggle.addEventListener('click', () => {
        accordionItem.classList.toggle('toggle-content--open');
      })
    });
  }
})();
