"use strict";

(function() {
  const ESCAPE = 'Escape';

  const HEADER_HEIGHT = 59;

  const BreakPoint = {
    MOBILE_SMALL: 576,
    MOBILE: 767,
    TABLET: 1198,
  };

  const applyViewPort = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--document-height', `${window.innerHeight}px`);
  };

  const upDateViewPort = () => {
    window.addEventListener('resize', applyViewPort);

    window.addEventListener('orientationchange', applyViewPort);

    window.addEventListener('scroll', applyViewPort);

    applyViewPort();
  };

  upDateViewPort();

  const root = document.querySelector('html');
  const siteHeader = document.querySelector('.site-header');

  if (siteHeader) {
    /*-- Menu --*/
    const  nav = siteHeader.querySelector('nav');
    const menuButton = siteHeader.querySelector('.burger');

    const closeMenu = () => {
      if (menuButton.classList.contains('burger--close') && nav.classList.contains('nav--open')) {
        menuButton.classList.remove('burger--close');
        nav.classList.remove('nav--open');
        root.classList.remove('show-main-menu');
      }
    };

    const toggleShowMenuClickHandler = () => {
      menuButton.classList.toggle('burger--close');
      nav.classList.toggle('nav--open');
      root.classList.toggle('show-main-menu');
    };

    menuButton.addEventListener('click', toggleShowMenuClickHandler);

    window.addEventListener('scroll', () => {
      if (window.scrollY > HEADER_HEIGHT) {
        siteHeader.classList.add('site-header--fixed');
        document.body.style = `padding-top: ${HEADER_HEIGHT}px`;
      } else {
        siteHeader.classList.remove('site-header--fixed');
        document.body.style = '0';
      }
    });

    /*-- User Option List --*/
    const userOption = siteHeader.querySelector('.user-option');
    const userOptionToggle = userOption.querySelector('.user-option__link-main');

    const closeUserOptionLIstOutsideClick = (evt) => {
      if (!userOption.contains(evt.target)) {
        userOption.classList.remove('user-option--open');

        document.removeEventListener('keydown', closeUserOptionListKeyPres);
        document.removeEventListener('click', closeUserOptionLIstOutsideClick);
      }
    };

    const closeUserOptionListKeyPres = (evt) => {
      const isEsc = evt.key === ESCAPE;

      if (isEsc) {
        userOption.classList.remove('user-option--open');

        document.removeEventListener('keydown', closeUserOptionListKeyPres);
        document.removeEventListener('click', closeUserOptionLIstOutsideClick);
      }
    };

    const toggleShowUserOptionListClickHandle = (evt) => {
      evt.preventDefault();

      userOption.classList.toggle('user-option--open');

      closeMenu();

      document.addEventListener('keydown', closeUserOptionListKeyPres);
      document.addEventListener('click', closeUserOptionLIstOutsideClick);
    };

    userOptionToggle.addEventListener('click', toggleShowUserOptionListClickHandle);

    /*-- Menu --*/
    const menuItemWithDropdownElements = [...nav.querySelectorAll('.main-menu__item--drop')];

    let currentDocumentWidth = document.body.offsetWidth;

     const createMainMenuToggleElements = () => {
      menuItemWithDropdownElements.forEach((item) => {
        const toggle = document.createElement('span');
        toggle.classList.add('main-menu__item-toggle');
        item.querySelector('.main-menu__link').appendChild(toggle);
      });
    };

    const removeMainMenuToggleElements = () => {
      [...document.querySelectorAll('.main-menu__item-toggle')].forEach((toggle) => {
        toggle.remove();
      });
    };

    const getTabletMenuBehavior = () => {
      removeMainMenuToggleElements();
      createMainMenuToggleElements();

      menuItemWithDropdownElements.forEach((item) => {

        const toggle = item.querySelector('.main-menu__item-toggle');

        toggle.addEventListener('click', (evt) => {
          evt.preventDefault();

          const toggleParentElement = toggle.closest('.main-menu__item');

          if (evt.target.classList.contains('main-menu__item-toggle')) {

            menuItemWithDropdownElements.forEach((item) => {
              if (toggleParentElement !== item) {
                item.classList.remove('main-menu__item--open');
              }
            });

            item.classList.toggle('main-menu__item--open');
          }
        });
      });
    };

    const getMobileMenuBehavior = () => {
      removeMainMenuToggleElements();
      createMainMenuToggleElements();

      menuItemWithDropdownElements.forEach((item) => {

        const toggle = item.querySelector('.main-menu__item-toggle');

        toggle.addEventListener('click', (evt) => {
          if (evt.target.classList.contains('main-menu__item-toggle')) {
            item.classList.toggle('main-menu__item--open');
          }
        });
      });
    };

    const getMenuBehaviorByBreakpoint = (currentDocumentWidth) => {
      if (currentDocumentWidth > BreakPoint.MOBILE && currentDocumentWidth < BreakPoint.TABLET) {
        getTabletMenuBehavior();
      } else if (currentDocumentWidth < BreakPoint.MOBILE) {
        getMobileMenuBehavior();
      } else if (currentDocumentWidth > BreakPoint.TABLET) {
        menuButton.classList.remove('burger--close');
        nav.classList.remove('nav--open');
        root.classList.remove('show-main-menu');
        removeMainMenuToggleElements();
      }
    };

    getMenuBehaviorByBreakpoint(currentDocumentWidth);

    window.addEventListener('resize', () => {
      currentDocumentWidth = document.body.offsetWidth;
      getMenuBehaviorByBreakpoint(currentDocumentWidth);
    });

    /*-- Cart --*/
    const openCartButton = document.querySelector('.user-info__link--cart');
    const modalCart = document.querySelector('.modal-cart');
    const closeCartButton = modalCart.querySelector('.modal-cart__close');
    const modalCartOverlay = document.querySelector('.overlay--modal-cart');

    const closeModalCart = () => {
      modalCart.classList.remove('modal-cart--open');
      root.classList.remove('modal-cart-open');
      root.classList.remove('overflow-hidden');

      document.removeEventListener('keydown', closeModalCartKeyPressHandler);
      document.removeEventListener('click', closeModalCartOutsideClick);
    };

    const closeModalCartOutsideClick = (evt) => {
      if (!modalCart.contains(evt.target) && !openCartButton.contains(evt.target)) {
        closeModalCart();
      }
    };

    const closeModalCartKeyPressHandler = (evt) => {
      const isEsc = evt.key === ESCAPE;

      if (isEsc) {
        closeModalCart();
      }
    };

    const toggleModalCartClickHandler = (evt) => {
      evt.preventDefault();
      modalCart.classList.toggle('modal-cart--open');
      root.classList.toggle('modal-cart-open');
      root.classList.toggle('overflow-hidden');

      document.addEventListener('keydown', closeModalCartKeyPressHandler);
      document.addEventListener('click', closeModalCartOutsideClick);
    };

    const closeModalCartClickHandler = (evt) => {
      evt.preventDefault();
      closeModalCart();
    };

    openCartButton.addEventListener('click', toggleModalCartClickHandler);
    closeCartButton.addEventListener('click', closeModalCartClickHandler);
    modalCartOverlay.addEventListener('click', closeModalCartClickHandler);

    window.header = {
      ESCAPE,
      root,
      applyViewPort
    }
  }
})();
