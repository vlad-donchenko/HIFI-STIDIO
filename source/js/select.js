'use strict';

(function () {
  const sortSelect = $('#sort_select');
  const selectCountry = $('#shipping_country');
  const selectGrayAppearance = $('.select--gray select');

  const getSortSelectSetting = () => ({
    minimumResultsForSearch: -2,
    width: '100%',
  });

  const getProductSelectSetting = () => ({
    minimumResultsForSearch: -2,
    width: '100%',
    dropdownCssClass: 'select2-dropdown--gray',
    placeholder: 'Choose An Option'
  });

  const getSelectCountrySetting = () => ({
    minimumResultsForSearch: -2,
    width: '100%',
    dropdownCssClass: 'select2-dropdown--transparent',
    placeholder: 'Country*'
  });

  sortSelect.select2(getSortSelectSetting());
  selectGrayAppearance.select2(getProductSelectSetting());
  selectCountry.select2(getSelectCountrySetting())
})();
