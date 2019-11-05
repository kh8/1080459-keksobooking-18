'use strict';

(function () {

  var mainPinParams = {
    WIDTH: 65,
    HEIGHT: 87,
    START_X: 570,
    START_Y: 385,
    MIN_Y: 130,
    MAX_Y: 630
  };

  var pinParams = {
    WIDTH: 40,
    HEIGHT: 40
  };

  var MAX_PINS = 5;

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

  var filterOptions = {
    LOW_PRICE: 10000,
    HIGH_PRICE: 50000
  };

  var serverParams = {
    UPLOAD_URL: 'https://js.dump.academy/keksobooking',
    LOAD_URL: 'https://js.dump.academy/keksobooking/data',
    LOAD_TIMEOUT: 10000
  };

  var DEBOUNCE_INTERVAL = 300;

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  window.constants = {
    keycodes: keycodes,
    mainPinParams: mainPinParams,
    pinParams: pinParams,
    MAX_PINS: MAX_PINS,
    translateOfferType: translateOfferType,
    housingMinPrice: housingMinPrice,
    formExtremums: formExtremums,
    filterOptions: filterOptions,
    serverParams: serverParams,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    FILE_TYPES: FILE_TYPES
  };

})();
