const mainMenuElement = document.querySelector(`.nav`);
const menuButtonElement = document.querySelector(`.nav__burger`);

const menuItemWithDropdownElements = document.querySelectorAll(`.main-menu__item--drop`);


menuButtonElement.addEventListener(`click`, () => {
  menuButtonElement.classList.toggle(`burger--close`);
  mainMenuElement.classList.toggle(`nav--open`);
});

[...menuItemWithDropdownElements].forEach((item) => {
  item.addEventListener(`click`, (evt) => {
    evt.stopPropagation();

    if (evt.target.classList.contains('main-menu__item--drop')) {
      item.classList.toggle(`main-menu__item--open`);
    }
  });
});
