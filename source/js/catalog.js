'use strict';

(function () {
  const catalog = document.querySelector('.catalog');

  if (!catalog) {
    return;
  }

  const filterWrapper = catalog.querySelector('.filter');
  const filterToggleButton = filterWrapper.querySelector('.filter__toggle');

  const filterItemDropdown = [...filterWrapper.querySelectorAll('.filter__item--dropdown')];

  const toggleShowCatalogHandler = (evt) => {
    evt.preventDefault();

    filterWrapper.classList.toggle('filter--open');
    filterToggleButton.classList.toggle('filter__toggle--open');
  };

  filterToggleButton.addEventListener('click', toggleShowCatalogHandler);

  filterItemDropdown.forEach((filterItem) => {
    const toggleButton = filterItem.querySelector('.filter__item-toggle');

    toggleButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      filterItem.classList.toggle('filter__item--open');
    });
  });

})();
