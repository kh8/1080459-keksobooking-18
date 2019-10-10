'use strict';

(function () {

  var form = document.querySelector('.ad-form');
  var title = form.querySelector('#title');
  var address = form.querySelector('#address');
  var fieldsets = form.querySelectorAll('fieldset');
  var rooms = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var price = form.querySelector('#price');
  var type = form.querySelector('#type');
  var checkIn = form.querySelector('#timein');
  var checkOut = form.querySelector('#timeout');
  var submitBtn = form.querySelector('.ad-form__submit');

  var checkRoomsGuestsValidity = function () {
    var places = +rooms.value;
    var guests = +capacity.value;
    return (guests > places) || ((guests === window.constants.formExtremums.MIN_CAPACITY) !== (places === window.constants.formExtremums.MAX_ROOMS));
  };

  var setTitleValidity = function () {
    if ((title.value.length < 30) || (title.value.length > 100)) {
      var validityMessage = 'Длина заголовка должна быть от ' + '30' + ' до ' + '100' + ' символов';
      title.setCustomValidity(validityMessage);
    } else {
      title.setCustomValidity('');
    }
  };

  var setCapacityValidity = function () {
    var validityMessage = checkRoomsGuestsValidity() ? 'Некорректное число гостей' : '';
    capacity.setCustomValidity(validityMessage);
  };

  var setPriceValidity = function () {
    if ((+price.value < price.min) || (+price.value > price.max)) {
      var validityMessage = 'Цена за ночь должна быть в интервале от ' + price.min + ' до ' + price.max;
      price.setCustomValidity(validityMessage);
    } else {
      price.setCustomValidity('');
    }
  };

  var onTitleKeydown = function () {
    var validityMessage = '';
    title.setCustomValidity(validityMessage);
  };

  var onTypeChange = function () {
    var minPrice = window.constants.housingMinPrice[type.value];
    price.min = minPrice;
    price.placeholder = minPrice;
  };

  var onCheckInChange = function (evt) {
    checkOut.value = evt.currentTarget.value;
  };

  var onCheckOutChange = function (evt) {
    checkIn.value = evt.currentTarget.value;
  };

  var validateForm = function () {
    setTitleValidity();
    setPriceValidity();
    setCapacityValidity();
  };

  var fillAddress = function (pinX, pinY) {
    address.value = Math.floor(pinX + window.constants.mainPinParams.WIDTH / 2) + ', ' + Math.floor(pinY + window.constants.mainPinParams.HEIGHT);
  };

  var disableForm = function () {
    form.classList.add('ad-form--disabled');
    submitBtn.removeEventListener('click', validateForm);
    window.utils.setElemsDisabled(fieldsets, true);
    type.removeEventListener('change', onTypeChange);
    checkIn.removeEventListener('change', onCheckInChange);
    checkOut.removeEventListener('change', onCheckOutChange);
  };

  var enableForm = function () {
    form.classList.remove('ad-form--disabled');
    submitBtn.addEventListener('click', validateForm);
    window.utils.setElemsDisabled(fieldsets, false);
    title.addEventListener('keydown', onTitleKeydown);
    type.addEventListener('change', onTypeChange);
    checkIn.addEventListener('change', onCheckInChange);
    checkOut.addEventListener('change', onCheckOutChange);
    price.min = price.placeholder;
    price.max = window.constants.formExtremums.MAX_PRICE;
  };

  window.form = {
    fillAddress: fillAddress,
    enable: enableForm,
    disable: disableForm
  };
})();
