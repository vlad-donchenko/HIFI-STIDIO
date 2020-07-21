'use strict';

(function () {
  const tabs = document.querySelectorAll('.tab');

  if (!tabs || tabs.length === 0) {
    return false;
  }

  const closeContentTabs = (items, activeItem) => {
    items.forEach((item) => {
      if (item !== activeItem) {
        item.classList.remove('tab__content-item--open');
      }
    });
  };

  const changeActiveMenuItem = (items, activeItem) => {
    items.forEach((item) => {
      if (item !== activeItem) {
        item.closest('.tab__menu-item').classList.remove('tab__menu-item--active');
      }
    });
  };

  const createTabs = (tabList) => {
    tabList.forEach((tab) => {
      const tabMenu = tab.querySelector('.tab__menu');
      const tabMenuItems = [...tabMenu.querySelectorAll('.tab__menu-link')];
      const tabsContentItems = [...tab.querySelectorAll('.tab__content-item')];

      tabMenuItems.forEach((menuItem) => {
        menuItem.addEventListener('click', (evt) => {
          evt.preventDefault();

          const menuItemLinkWrapper = menuItem.closest('.tab__menu-item');

          if (menuItemLinkWrapper.classList.contains('tab__menu-item--active')) {
            return;
          }

          menuItemLinkWrapper.classList.add('tab__menu-item--active');

          const activeTab = tab.querySelector(`#${evt.target.dataset.tab}`);
          activeTab.classList.add('tab__content-item--open');

          closeContentTabs(tabsContentItems, activeTab);
          changeActiveMenuItem(tabMenuItems, menuItem);
        });
      })
    });
  };

  createTabs(tabs);

})();
