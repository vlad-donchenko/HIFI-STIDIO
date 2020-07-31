"use strict";

(function() {
  const ESCAPE = 'Escape';

  const HEADER_HEIGHT = 59;

  const BreakPoint = {
    MOBILE_SMALL: 576,
    MOBILE: 767,
    TABLET: 1198,
  };

  const ActiveClass = {
    USER_OPTION_OPEN: 'user-option--open',
    NAV_OPEN_SEARCH: 'nav--open-search',
    NAV_OPEN: 'nav--open',
    BURGER_CLOSE: 'burger--close',
    OVERFLOW_HIDDEN: 'overflow-hidden'
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
      if (menuButton.classList.contains(ActiveClass.BURGER_CLOSE) && nav.classList.contains(ActiveClass.NAV_OPEN)) {
        menuButton.classList.remove(ActiveClass.BURGER_CLOSE);
        nav.classList.remove(ActiveClass.NAV_OPEN);
        root.classList.remove('show-main-menu');
      }
    };

    const toggleShowMenuClickHandler = () => {
      menuButton.classList.toggle(ActiveClass.BURGER_CLOSE);
      nav.classList.toggle(ActiveClass.NAV_OPEN);
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
        userOption.classList.remove(ActiveClass.USER_OPTION_OPEN);

        document.removeEventListener('keydown', closeUserOptionListKeyPres);
        document.removeEventListener('click', closeUserOptionLIstOutsideClick);
      }
    };

    const closeUserOptionListKeyPres = (evt) => {
      const isEsc = evt.key === ESCAPE;

      if (isEsc) {
        userOption.classList.remove(ActiveClass.USER_OPTION_OPEN);

        document.removeEventListener('keydown', closeUserOptionListKeyPres);
        document.removeEventListener('click', closeUserOptionLIstOutsideClick);
      }
    };

    const toggleShowUserOptionListClickHandle = (evt) => {
      evt.preventDefault();

      userOption.classList.toggle(ActiveClass.USER_OPTION_OPEN);

      closeMenu();

      document.addEventListener('keydown', closeUserOptionListKeyPres);
      document.addEventListener('click', closeUserOptionLIstOutsideClick);
    };

    userOptionToggle.addEventListener('click', toggleShowUserOptionListClickHandle);

    /*-- Search --*/
    const menuSearch = siteHeader.querySelector('.menu-search');
    const mainSearchToggle = siteHeader.querySelector('.user-info__link--search');
    const searchInput = menuSearch.querySelector('.menu-search__input');
    const closeSearchButton = menuSearch.querySelector('.menu-search__close');

    const closeSearchButtonCLickHandler = () => {
      nav.classList.remove(ActiveClass.NAV_OPEN_SEARCH);

      closeSearchButton.removeEventListener('click', closeSearchButtonCLickHandler);
      document.removeEventListener('keydown', closeSearchKeyPressHandler);
      document.removeEventListener('click', closeSearchOutsideClickHandler);
    };

    const closeSearchOutsideClickHandler = (evt) => {
      if (!mainSearchToggle.contains(evt.target) && !menuSearch.contains(evt.target)) {
        closeSearchButtonCLickHandler();
      }
    };

    const closeSearchKeyPressHandler = (evt) => {
      const isEsc = evt.key === ESCAPE;

      if (isEsc && evt.target !== searchInput) {
        closeSearchButtonCLickHandler();
      }
    };

    const showCloseButtonInputHandler = (evt) => {
      const value = evt.target.value;

      value.length !== 0 ? menuSearch.classList.add('menu-search--searching') :  menuSearch.classList.remove('menu-search--searching');
    };

    const toggleShowSearchClickHandler = (evt) => {
      evt.preventDefault();

      nav.classList.toggle(ActiveClass.NAV_OPEN_SEARCH);

      closeMenu();
      closeSearchButton.addEventListener('click', closeSearchButtonCLickHandler);
      searchInput.addEventListener('input', showCloseButtonInputHandler);
      document.addEventListener('keydown', closeSearchKeyPressHandler);
      document.addEventListener('click', closeSearchOutsideClickHandler);
    };

    mainSearchToggle.addEventListener('click', toggleShowSearchClickHandler);

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
        menuButton.classList.remove(ActiveClass.BURGER_CLOSE);
        nav.classList.remove(ActiveClass.NAV_OPEN);
        root.classList.remove('show-main-menu');
        removeMainMenuToggleElements();
      }
    };

    getMenuBehaviorByBreakpoint(currentDocumentWidth);

    window.addEventListener('resize', () => {
      currentDocumentWidth = document.body.offsetWidth;
      getMenuBehaviorByBreakpoint(currentDocumentWidth);
    });

    window.header = {
      root,
      applyViewPort
    }
  }
})();
