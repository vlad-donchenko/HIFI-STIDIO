'use strict';

(function () {
  const BRANDS = [
    {
      title: 'Accuphase',
      src: '#'
    },
    {
      title: 'Altec',
      src: '#'
    },
    {
      title: 'Ampex',
      src: '#'
    },
    {
      title: 'Ampex',
      src: '#'
    },
    {
      title: 'Acoustic Research',
      src: '#',
    },
    {
      title: 'Bell',
      src: '#'
    },
    {
      title: 'Bogen',
      src: '#'
    },
    {
      title: 'Bose',
      src: '#'
    },
    {
      title: 'Brook',
      src: '#'
    },
    {
      title: 'Cerwin Vega',
      src: '#'
    },
    {
      title: 'Crown',
      src: '#'
    },
    {
      title: 'Dynaco',
      src: '#',
    },
    {
      title: 'Eico',
      src: '#'
    },
    {
      title: 'The Fisher',
      src: '#'
    },
    {
      title: 'Gas',
      src: '#'
    },
    {
      title: 'Grommes',
      src: '#'
    },
    {
      title: 'Hafler',
      src: '#'
    },
    {
      title: 'Hallicrafters',
      src: '#'
    },
    {
      title: 'Heathkit',
      src: '#'
    },
    {
      title: 'Harman Kardon',
      src: '#'
    },
    {
      title: 'JBL',
      src: '#'
    },
    {
      title: 'Kenwood',
      src: '#'
    },
    {
      title: 'KHL',
      src: '#'
    },
    {
      title: 'Knight',
      src: '#'
    },
    {
      title: 'Lafayette',
      src: '#'
    },
    {
      title: 'Leak',
      src: '#'
    },
    {
      title: 'Marantz',
      src: '#'
    },
    {
      title: 'McIntosh',
      src: '#'
    },
    {
      title: 'Mitsubishi',
      src: '#'
    },
    {
      title: 'Onkyo',
      src: '#'
    },
    {
      title: 'Onkyo',
      src: '#'
    },
    {
      title: 'Phase Linear',
      src: '#'
    },
    {
      title: 'Pilot',
      src: '#'
    },
    {
      title: 'Pioneer',
      src: '#'
    },
    {
      title: 'Pultec',
      src: '#'
    },
    {
      title: 'RCA',
      src: '#'
    },
    {
      title: 'Realistic',
      src: '#'
    },
    {
      title: 'Rotel',
      src: '#'
    },
    {
      title: 'SAE',
      src: '#'
    },
    {
      title: 'Sansui',
      src: '#'
    },
    {
      title: 'Scott',
      src: '#'
    },
    {
      title: 'Sherwood',
      src: '#'
    },
    {
      title: 'Sony',
      src: '#'
    },
    {
      title: 'Stromberg',
      src: '#'
    },
    {
      title: 'Sumo',
      src: '#'
    },
    {
      title: 'Trio',
      src: '#'
    },
    {
      title: 'Yamaha',
      src: '#'
    }
  ];

  const DEBOUNCE_INTERVAL = 300;

  const debounce = (cb) => {
    let lastTimeout = null;

    return () => {
      const parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

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

    const getSearchResultItemMarkup = (searchList) => {
      return searchList.map((searchItem) => {
        const {src, title} = searchItem;
        return (
          `<li class="search-modal__result-item">
             <a href="${src}" class="search-modal__result-link">
               ${title}
             </a>
          </li>`
        )
      }).join('\n');
    };

    const getSearchResultTemplate = (searchList) => {
      return (
        `${searchList.length > 0 ? `<ul class="search-modal__result list-reset">
            ${getSearchResultItemMarkup(searchList)}
        </ul>` : `<p class="search-modal__nothing-find">We found nothing</p>`}`
      )
    };

    const brandSearchResultWrapper = document.querySelector('#brand_search_result');
    const brandSearchInput = document.querySelector('#brand_search');

    const searchResultInputHandler = () => {
      const value = brandSearchInput.value;

      const searchList = BRANDS.filter((item) => {
        return item.title.indexOf(value) !== -1;
      });

      const searchResultTemplate = getSearchResultTemplate(searchList);
      brandSearchResultWrapper.innerHTML = '';
      brandSearchResultWrapper.insertAdjacentHTML('afterbegin', searchResultTemplate);
    };

    brandSearchInput.addEventListener('input', debounce(searchResultInputHandler));
  }
})();
