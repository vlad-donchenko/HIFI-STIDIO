'use strict';

(function () {
  const REINITIALIZE_CATEGORIES_SLIDER_BREAKPOINT = 1198;

  const promoSlider = $('#promo_slider');
  const testimonialSlider = $('#testimonial_slider');
  const categoriesSlider = $('#categories_slider');
  const previewSlider = $('#preview_slider');
  const relatedProductsSlider = $('#related_products_slider');
  const aboutUsSlider = $('#about_us');

  const getPromoSliderSettings = () => ({
    infinite: true,
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });

  const getTestimonialSliderSettings = () => ({
    infinite: true,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    centerPadding: '50px',
    prevArrow: $('#testimonial_prev'),
    nextArrow: $('#testimonial_next'),
    mobileFirst: true,
    rtl: false,
    responsive: [
      {
        breakpoint: 599,
        settings: {
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
          focusOnSelect: false,
        }
      },
      {
        breakpoint: 767,
        settings: {
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
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

  const getCategoriesSliderSettings = () => ({
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

  const getPreviewSliderSettings = () => ({
    infinite: true,
    arrows: true,
    prevArrow: $('#preview_prev'),
    nextArrow: $('#preview_next'),
    slidesToShow: 4,
    slidesToScroll: 4,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1198,
        settings: {
          draggable: false,
          infinite: true,
          vertical: true
        }
      }
    ]
  });

  const getRelatedProductsSliderSettings = () => ({
    infinite: false,
    dots: false,
    arrows: false,
    centerMode: true,
    centerPadding: '90px 0 0',
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 430,
        settings: {
          centerPadding: '20%',
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerPadding: '26%',
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '30%',
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1198,
        settings: 'unslick'
      }
    ]
  });

  const getAboutUsSliderSettings = () => ({
    arrows: false,
    dots: true
  });

  promoSlider.slick(getPromoSliderSettings());
  testimonialSlider.slick(getTestimonialSliderSettings());
  categoriesSlider.slick(getCategoriesSliderSettings());
  previewSlider.slick(getPreviewSliderSettings());
  relatedProductsSlider.slick(getRelatedProductsSliderSettings());
  aboutUsSlider.slick(getAboutUsSliderSettings());


  $(window).on('resize', function () {
    if ($(window).width() < REINITIALIZE_CATEGORIES_SLIDER_BREAKPOINT && !categoriesSlider.hasClass('slick-initialized')) {
      categoriesSlider.slick(getCategoriesSliderSettings());
    }

    if (!relatedProductsSlider.hasClass('slick-initialized')) {
      relatedProductsSlider.slick(getRelatedProductsSliderSettings());
    }
  });

})();
