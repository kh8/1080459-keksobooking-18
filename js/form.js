'use strict';

(function () {

  var housingMinPrice = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };

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
    return (guests > places) || ((guests === 0) !== (places === 100));
  };

  var onRoomsChange = function () {
    var validityMessage = checkRoomsGuestsValidity() ? 'Некорректное число гостей' : '';
    capacity.setCustomValidity(validityMessage);
  };

  var onCapacityChange = function () {
    var validityMessage = checkRoomsGuestsValidity() ? 'Некорректное число гостей' : '';
    capacity.setCustomValidity(validityMessage);
  };

  var onPriceChange = function () {
    var minPrice = housingMinPrice[type.value];
    if (price.value < minPrice) {
      var validityMessage = 'Цена за ночь должна быть в интервале от ' + minPrice + ' до 1000000';
      price.setCustomValidity(validityMessage);
    } else {
      price.setCustomValidity('');
    }
  };

  var onTypeChange = function () {
    var minPrice = housingMinPrice[type.value];
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

  var initForm = function () {
    rooms.addEventListener('change', onRoomsChange);
    capacity.addEventListener('change', onCapacityChange);
    price.addEventListener('change', onPriceChange);
    type.addEventListener('change', onTypeChange);
    checkIn.addEventListener('change', function () {
      onCheckInChange(window.event);
    });
    checkOut.addEventListener('change', function () {
      onCheckOutChange(window.event);
    });
  };

  window.form = {
    form: form,
    address: address,
    fieldsets: fieldsets,
    rooms: rooms,
    capacity: capacity,
    price: price,
    type: type,
    checkIn: checkIn,
    checkOut: checkOut,
    initForm: initForm
  };
})();
