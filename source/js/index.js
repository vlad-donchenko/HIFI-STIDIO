"use strict";

(function () {
  const BreakPoint = {
    MOBILE_SMALL: 576,
    MOBILE: 767,
    TABLET: 1198,
  };

  const styles = getComputedStyle(document.documentElement);
  const documentHeightValue = styles.getPropertyValue(`--document-height`);

  const htmlElement = document.querySelector(`html`);
  const mainMenuElement = document.querySelector(`.nav`);
  const menuButtonElement = document.querySelector(`.nav__burger`);
  const menuItemWithDropdownElements = [...document.querySelectorAll(`.main-menu__item--drop`)];
  const mainSearchButtonElement = document.querySelector(`.user-info__link--search`);

  const userInfoListElement = document.querySelector(`.user-info`);
  const userOptionItemElement = userInfoListElement.querySelector(`.user-option`);

  let currentDocumentWidth = document.body.offsetWidth;
  let currentDocumentHeight = document.body.offsetHeight;

  const toggleShowUseOptionListCLickHandle = () => {
    userOptionItemElement.classList.toggle(`user-option--open`);
  };

  const toggleMainSearchClickHandle = () => {
    if (mainMenuElement.classList.contains(`nav--open`)) {
      mainMenuElement.classList.remove(`nav--open`);
      menuButtonElement.classList.remove(`burger--close`);
    }

    mainMenuElement.classList.toggle(`nav--open-search`);
  };

  mainSearchButtonElement.addEventListener(`click`, toggleMainSearchClickHandle);

  const createMainMenuToggleElements = () => {
    menuItemWithDropdownElements.forEach((item) => {
      const toggle = document.createElement(`span`);
      toggle.classList.add(`main-menu__item-toggle`);
      item.querySelector(`.main-menu__link`).appendChild(toggle);
    });
  };

  const removeMainMenuToggleElements = () => {
    [...document.querySelectorAll(`.main-menu__item-toggle`)].forEach((toggle) => {
      toggle.remove();
    });
  };

  const toggleMainMenuClickHandler = () => {
    if (mainMenuElement.classList.contains(`nav--open-search`)) {
      mainMenuElement.classList.remove(`nav--open-search`);
    }

    htmlElement.classList.toggle(`open-nav`);
    menuButtonElement.classList.toggle(`burger--close`);
    mainMenuElement.classList.toggle(`nav--open`);
  };

  const getTabletMenuBehavior = () => {
    menuItemWithDropdownElements.forEach((item) => {

      const toggle = item.querySelector(`.main-menu__item-toggle`);

      toggle.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const toggleParentElement = toggle.closest(`.main-menu__item`);

        if (evt.target.classList.contains(`main-menu__item-toggle`)) {

          menuItemWithDropdownElements.forEach((item) => {
            if (toggleParentElement !== item) {
              item.classList.remove(`main-menu__item--open`);
            }
          });

          item.classList.toggle(`main-menu__item--open`);
        }
      });
    });
  };

  const getMobileMenuBehavior = () => {
    menuItemWithDropdownElements.forEach((item) => {

      const toggle = item.querySelector(`.main-menu__item-toggle`);

      toggle.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        if (evt.target.classList.contains(`main-menu__item-toggle`)) {
          item.classList.toggle(`main-menu__item--open`);
        }
      });
    });
  };

  const getMenuBehaviorByBreakpoint = (currentDocumentWidth, currentDocumentHeight) => {
    if (currentDocumentWidth > BreakPoint.MOBILE && currentDocumentWidth < BreakPoint.TABLET) {
      removeMainMenuToggleElements();
      createMainMenuToggleElements();
      getTabletMenuBehavior();
    } else if (currentDocumentWidth < BreakPoint.MOBILE) {
      document.documentElement.style.setProperty(documentHeightValue, `${currentDocumentHeight}px`);

      removeMainMenuToggleElements();
      createMainMenuToggleElements();
      getMobileMenuBehavior();
    } else if (currentDocumentWidth > BreakPoint.TABLET) {
      mainMenuElement.classList.remove(`nav--open`);
      menuButtonElement.classList.remove(`burger--close`);
      removeMainMenuToggleElements();
    }
  };

  createMainMenuToggleElements();

  getMenuBehaviorByBreakpoint(currentDocumentWidth, currentDocumentHeight);

  menuButtonElement.addEventListener(`click`, toggleMainMenuClickHandler);

  userOptionItemElement.addEventListener(`click`, toggleShowUseOptionListCLickHandle);

  window.addEventListener(`resize`, () => {
    currentDocumentWidth = document.body.offsetWidth;
    currentDocumentHeight = document.body.offsetHeight;

    getMenuBehaviorByBreakpoint(currentDocumentWidth, currentDocumentHeight);
  });

  $(`#promo_slider`).slick({
    infinite: true,
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });


  $(`#testimonial_slider`).slick({
    infinite: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect : true,
    centerPadding: '12%',
    prevArrow: $('#testimonial_prev'),
    nextArrow: $('#testimonial_next'),
    mobileFirst: true,
    rtl: false,
    responsive: [
      {
        breakpoint: 599,
        settings: {
          infinite: true,
          centerPadding: '39px',
          slidesToShow: 2,
        }
      }
    ]
  });

})();
