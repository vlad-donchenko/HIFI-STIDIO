'use strict';

(function () {
  const sortSelect = $('#sort_select');
  const selectCountry = $('#shipping_country');
  const selectGrayAppearance = $('.select--gray select');


  const getSelectSetting = () => ({
    minimumResultsForSearch: -2
  });

  const getProductSelectSetting = () => ({
    ...getSelectSetting(),
    width: '100%',
    dropdownCssClass: 'select2-dropdown--gray',
    placeholder: 'Choose An Option'
  });

  const getSelectCountrySetting = () => ({
    ...getSelectSetting(),
    width: '100%',
    dropdownCssClass: 'select2-dropdown--transparent',
    placeholder: 'Country*'
  });

  sortSelect.select2(getSelectSetting());
  selectGrayAppearance.select2(getProductSelectSetting());
  selectCountry.select2(getSelectCountrySetting())
})();
