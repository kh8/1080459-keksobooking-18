'use strict';

(function () {

  var mainPinParams = {
    WIDTH: 65,
    HEIGHT: 87,
  };

  var pinParams = {
    WIDTH: 40,
    HEIGHT: 40
  };

  var keycodes = {
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27
  };

  var translateOfferType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var housingMinPrice = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };

  var formExtremums = {
    MIN_CAPACITY: 0,
    MAX_ROOMS: 100,
    MAX_PRICE: 1000000,
    MIN_TITLE_LENGTH: 30,
    MAX_TITLE_LENGTH: 100
  };

  window.constants = {
    keycodes: keycodes,
    mainPinParams: mainPinParams,
    pinParams: pinParams,
    translateOfferType: translateOfferType,
    housingMinPrice: housingMinPrice,
    formExtremums: formExtremums
  };

})();
