'use strict';

(function () {

  var form = document.querySelector('.ad-form');
  var address = form.querySelector('#address');
  var fieldsets = form.querySelectorAll('fieldset');
  var rooms = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var price = form.querySelector('#price');
  var type = form.querySelector('#type');
  var checkIn = form.querySelector('#timein');
  var checkOut = form.querySelector('#timeout');

  var checkRoomsGuestsValidity = function () {
    var places = +rooms.value;
    var guests = +capacity.value;
    return (guests > places) || ((guests === window.constants.formExtremums.MIN_CAPACITY) !== (places === window.constants.formExtremums.MAX_ROOMS));
  };

  var onRoomsChange = function () {
    var validityMessage = checkRoomsGuestsValidity() ? 'Некорректное число гостей' : '';
    capacity.setCustomValidity(validityMessage);
  };

  var onCapacityChange = function () {
    var validityMessage = checkRoomsGuestsValidity() ? 'Некорректное число гостей' : '';
    capacity.setCustomValidity(validityMessage);
  };

  var onPriceInvalid = function () {
    var minPrice = window.constants.housingMinPrice[type.value];
    if (price.value < minPrice) {
      var validityMessage = 'Цена за ночь должна быть в интервале от ' + minPrice + ' до 1000000';
      price.setCustomValidity(validityMessage);
    } else {
      price.setCustomValidity('');
    }
  };

  var onTypeChange = function () {
    var minPrice = window.constants.housingMinPrice[type.value];
    price.placeholder = minPrice;
    if (price.value < minPrice) {
      var validityMessage = 'Цена за ночь должна быть в интервале от ' + minPrice + ' до 1000000';
      price.setCustomValidity(validityMessage);
    } else {
      price.setCustomValidity('');
    }
  };

  var onCheckInChange = function (evt) {
    checkOut.value = evt.currentTarget.value;
  };

  var onCheckOutChange = function (evt) {
    checkIn.value = evt.currentTarget.value;
  };

  var fillAddress = function (pinX, pinY) {
    address.value = Math.floor(pinX + window.constants.MAIN_PIN_PARAMS.HALF_WIDTH) + ', ' + Math.floor(pinY + window.constants.MAIN_PIN_PARAMS.HEIGHT);
  };

  var disableForm = function () {
    form.classList.add('ad-form--disabled');
    window.utils.setElemsDisabled(fieldsets, true);
    rooms.removeEventListener('change', onRoomsChange);
    capacity.removeEventListener('change', onCapacityChange);
    price.removeEventListener('invalid', onPriceInvalid);
    type.removeEventListener('change', onTypeChange);
    checkIn.removeEventListener('change', onCheckInChange);
    checkOut.removeEventListener('change', onCheckOutChange);
  };

  var enableForm = function () {
    form.classList.remove('ad-form--disabled');
    window.utils.setElemsDisabled(fieldsets, false);
    rooms.addEventListener('change', onRoomsChange);
    capacity.addEventListener('change', onCapacityChange);
    price.addEventListener('invalid', onPriceInvalid);
    type.addEventListener('change', onTypeChange);
    checkIn.addEventListener('change', onCheckInChange);
    checkOut.addEventListener('change', onCheckOutChange);
  };

  window.form = {
    fillAddress: fillAddress,
    enable: enableForm,
    disable: disableForm
  };
})();
