"use strict";

(function () {
  const mainProductImage = document.querySelector('.about-product__img');
  const previews = [...document.querySelectorAll('.about-product__preview-button')];

  if (previews && previews.length > 0) {
    previews.forEach((preview) => {
      preview.addEventListener('click', () => {
        mainProductImage.src = preview.dataset.src;
      });
    });
  }

  const productCounters = [...document.querySelectorAll('.product-counter')];

  const checkAmountInputCorrectValue = (value) => {
    if (value) {
      const currentValue = Number(value);

      return currentValue >= 1;
    }

    return false;
  };

  productCounters.forEach((productCounter) => {
    const amountInput = productCounter.querySelector('.product-counter__amount');
    const addAmountButton = productCounter.querySelector('.product-counter__button--add');
    const subtractAmountButton = productCounter.querySelector('.product-counter__button--subtract');

    addAmountButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      const isCorrectValue = checkAmountInputCorrectValue(Number(amountInput.value) + 1);

      isCorrectValue ? amountInput.value = Number(amountInput.value) + 1 : amountInput.value = 1;


    });

    subtractAmountButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      const isCorrectValue = checkAmountInputCorrectValue(Number(amountInput.value) - 1);

      isCorrectValue ? amountInput.value = Number(amountInput.value) - 1 : amountInput.value = 1;

    });

    amountInput.addEventListener('change', (evt) => {
      const value = evt.target.value;

      const isCorrectValue = checkAmountInputCorrectValue(value);

      isCorrectValue ? amountInput.value = value : amountInput.value = 1;

    });

  });

  const inputList = [...document.querySelectorAll('.input')];

  inputList.forEach((inputItem) => {
    const input = inputItem.querySelector('.input__content');

    input.addEventListener('focus', (evt) => {
      if (evt.target.value.length > 0) {
        return;
      }

      inputItem.classList.add('input--active');
    });

    input.addEventListener('blur', (evt) => {
      if (evt.target.value.length > 0) {
        return;
      }

      inputItem.classList.remove('input--active');
    });
  });

  const orderTable = document.querySelector('.order__table');

  if (orderTable) {
    const orderTableItems = [...orderTable.querySelectorAll('.order__table-item')];

    orderTableItems.forEach((orderItem) => {
      const orderCloseButton = orderItem.querySelector('.order__column-button--close');
      const orderOpenButton = orderItem.querySelector('.order__column-button--open');

      if (orderCloseButton && orderOpenButton) {
        orderCloseButton.addEventListener('click', () => {
          orderItem.classList.remove('order__table-item--open');
        });

        orderOpenButton.addEventListener('click', () => {
          orderItem.classList.add('order__table-item--open');
        });
      }
    });
  }

  const brandSearchButton = document.querySelector('.brands__item--search');
  const searchBrandSection = document.querySelector('.search-brand');
  const closeSearchByBrandButton = searchBrandSection.querySelector('.search-brand__close');

  const openSearchByBrandClickHandler = (evt) => {
    evt.preventDefault();
    window.header.applyViewPort();
    window.header.root.classList.add('overflow-hidden');
    searchBrandSection.classList.add('search-brand--open');
  };

  const closeSearchByBrandClickHandler = () => {
    window.header.applyViewPort();
    window.header.root.classList.remove('overflow-hidden');
    searchBrandSection.classList.remove('search-brand--open');
  };

  if (brandSearchButton) {
    closeSearchByBrandButton.addEventListener('click', closeSearchByBrandClickHandler);
    brandSearchButton.addEventListener('click', openSearchByBrandClickHandler);
  }

})();
