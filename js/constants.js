'use strict';

(function () {

  var MAIN_PIN_PARAMS = {
    HALF_WIDTH: 32.5,
    HEIGHT: 87,
  };

  var PIN_PARAMS = {
    width: 40,
    height: 40
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
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };

  var formExtremums = {
    MIN_CAPACITY: 0,
    MAX_ROOMS: 100,
    MAX_PRICE: 1000000
  };

  window.constants = {
    keycodes: keycodes,
    MAIN_PIN_PARAMS: MAIN_PIN_PARAMS,
    PIN_PARAMS: PIN_PARAMS,
    translateOfferType: translateOfferType,
    housingMinPrice: housingMinPrice,
    formExtremums: formExtremums
  };

})();
