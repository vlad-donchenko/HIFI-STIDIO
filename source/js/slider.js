'use strict';

(function () {
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
