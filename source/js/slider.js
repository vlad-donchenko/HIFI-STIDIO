'use strict';

(function () {
  const REINITIALIZE_CATEGORIES_SLIDER_BREAKPOINT = 1198;

  const promoSlider = $('#promo_slider');
  const testimonialSlider = $('#testimonial_slider');
  const categoriesSlider = $('#categories_slider');

  const getPromoSliderSettings = () => ({
    infinite: true,
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });

  const getTestimonialSliderSettings = () => ({
    infinite: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
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
          slidesToShow: 3,
          slidesToScroll: 3,
          centerMode: false,
          focusOnSelect: false,
        }
      },
      {
        breakpoint: 1198,
        settings: {
          infinite: true,
          centerMode: false,
          focusOnSelect: false,
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }
    ]
  });

  const getCategoriesSlider = () => ({
    infinite: true,
    dots: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow: $('#categories_prev'),
    nextArrow: $('#categories_next'),
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1198,
        settings: 'unslick'
      }
    ]
  });

  promoSlider.slick(getPromoSliderSettings());
  testimonialSlider.slick(getTestimonialSliderSettings());
  categoriesSlider.slick(getCategoriesSlider());


  $(window).on('resize', function () {
    if ($(window).width() < REINITIALIZE_CATEGORIES_SLIDER_BREAKPOINT && !categoriesSlider.hasClass('slick-initialized')) {
      categoriesSlider.slick(getCategoriesSlider());
    }
  });

})();
