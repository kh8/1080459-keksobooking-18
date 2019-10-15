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
  var successTemplate = document.querySelector('#success ').content.querySelector('.success');
  var uploadErrorTemplate = document.querySelector('#error').content.querySelector('.error');

  var checkRoomsGuestsValidity = function () {
    var places = +rooms.value;
    var guests = +capacity.value;
    return (guests > places) || ((guests === window.constants.formExtremums.MIN_CAPACITY) !== (places === window.constants.formExtremums.MAX_ROOMS));
  };

  var setTitleValidity = function () {
    var minTitleLength = window.constants.formExtremums.MIN_TITLE_LENGTH;
    var maxTitleLength = window.constants.formExtremums.MAX_TITLE_LENGTH;
    if ((title.value.length < minTitleLength) || (title.value.length > maxTitleLength)) {
      var validityMessage = 'Длина заголовка должна быть от ' + minTitleLength + ' до ' + maxTitleLength + ' символов';
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
    var minPrice = window.constants.housingMinPrice[type.value];
    var maxPrice = window.constants.formExtremums.MAX_PRICE;
    if ((+price.value < minPrice) || (+price.value > maxPrice)) {
      var validityMessage = 'Цена за ночь должна быть в интервале от ' + minPrice + ' до ' + maxPrice;
      price.setCustomValidity(validityMessage);
    } else {
      price.setCustomValidity('');
    }
  };

  var onTitleKeydown = function () {
    var validityMessage = '';
    title.setCustomValidity(validityMessage);
  };

  var onPriceKeydown = function () {
    var validityMessage = '';
    price.setCustomValidity(validityMessage);
  };

  var onTypeChange = function () {
    price.placeholder = window.constants.housingMinPrice[type.value];
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
    title.removeEventListener('keydown', onTitleKeydown);
    type.removeEventListener('change', onTypeChange);
    price.removeEventListener('keydown', onPriceKeydown);
    checkIn.removeEventListener('change', onCheckInChange);
    checkOut.removeEventListener('change', onCheckOutChange);
    submitBtn.removeEventListener('click', validateForm);
    window.utils.setElemsDisabled(fieldsets, true);
  };

  var enableForm = function (successSubmitContainer) {

    var onSubmitBtnClick = function () {
      validateForm();
    };

    var onUploadSuccess = function () {
      var success = successTemplate.cloneNode(true);

      var onSuccessMessageClick = function () {
        successSubmitContainer.removeChild(success);
        document.removeEventListener('click', onSuccessMessageClick);
      };

      var onSuccessMessageEsc = function (evt) {
        if (evt.keyCode === window.constants.keycodes.ESC_KEYCODE) {
          successSubmitContainer.removeChild(success);
          document.removeEventListener('click', onSuccessMessageEsc);
        }
      };

      successSubmitContainer.appendChild(success);
      document.addEventListener('click', onSuccessMessageClick);
      document.addEventListener('click', onSuccessMessageEsc);
    };

    var onUploadError = function (message) {
      var error = uploadErrorTemplate.cloneNode(true);
      var errorMessage = error.querySelector('.error__message');
      var errorButton = error.querySelector('.error__button');
      errorButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        error.removeChild(error);
        window.server.uploadAd(window.constants.UPLOAD_URL, new FormData(form), onUploadSuccess, onUploadError);
      });
      errorMessage.textContent = message;
      successSubmitContainer.appendChild(error);
    };

    form.classList.remove('ad-form--disabled');
    title.addEventListener('keydown', onTitleKeydown);
    type.addEventListener('change', onTypeChange);
    price.addEventListener('keydown', onPriceKeydown);
    checkIn.addEventListener('change', onCheckInChange);
    checkOut.addEventListener('change', onCheckOutChange);
    submitBtn.addEventListener('click', onSubmitBtnClick);
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.server.uploadAd(window.constants.UPLOAD_URL, new FormData(form), onUploadSuccess, onUploadError);
    });
    window.utils.setElemsDisabled(fieldsets, false);
  };

  window.form = {
    fillAddress: fillAddress,
    enable: enableForm,
    disable: disableForm
  };
})();
