'use strict';

(function () {

  var submitMessageContainer = document.querySelector('main');
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
  var features = form.querySelectorAll('.feature__checkbox');
  var submitBtn = form.querySelector('.ad-form__submit');
  var successTemplate = document.querySelector('#success ').content.querySelector('.success');
  var uploadErrorTemplate = document.querySelector('#error').content.querySelector('.error');
  var avatarChooser = form.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = form.querySelector('.ad-form-header__preview img');
  var adFotoChooser = form.querySelector('.ad-form__upload input[type=file]');
  var adFotosContainer = form.querySelector('.ad-form__photo');

  var minTitleLength = window.constants.formExtremums.MIN_TITLE_LENGTH;
  var maxTitleLength = window.constants.formExtremums.MAX_TITLE_LENGTH;
  var titleInvalidMessage = 'Длина заголовка должна быть от ' + minTitleLength + ' до ' + maxTitleLength + ' символов';
  var capacityInvalidMessage = 'Некорректное число гостей';

  var setTitleValidity = function () {
    var titleValidity = (title.value.length < minTitleLength) || (title.value.length > maxTitleLength);
    if (titleValidity) {
      title.setCustomValidity(titleInvalidMessage);
    } else {
      title.setCustomValidity('');
    }
    return titleValidity;
  };

  var setCapacityValidity = function () {
    var places = +rooms.value;
    var guests = +capacity.value;
    var capacityValidity = (guests > places) || ((guests === window.constants.formExtremums.MIN_CAPACITY) !== (places === window.constants.formExtremums.MAX_ROOMS));
    if (capacityValidity) {
      capacity.setCustomValidity(capacityInvalidMessage);
    } else {
      capacity.setCustomValidity('');
    }
    return capacityValidity;
  };

  var setPriceValidity = function () {
    var minPrice = window.constants.housingMinPrice[type.value];
    var maxPrice = window.constants.formExtremums.MAX_PRICE;
    var priceValidity = (+price.value < minPrice) || (+price.value > maxPrice);
    if (priceValidity) {
      var priceInvalidMessage = 'Цена за ночь должна быть в интервале от ' + minPrice + ' до ' + maxPrice;
      price.setCustomValidity(priceInvalidMessage);
    } else {
      price.setCustomValidity('');
    }
    return priceValidity;
  };

  var validateForm = function () {
    return (!setTitleValidity()) && (!setPriceValidity()) && (!setCapacityValidity());
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

  var fillAddress = function (pinX, pinY) {
    address.value = Math.floor(pinX + window.constants.mainPinParams.WIDTH / 2) + ', ' + Math.floor(pinY + window.constants.mainPinParams.HEIGHT);
  };

  var fileChoose = function (img, fileChooser) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.constants.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        img.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
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
    title.value = '';
    price.value = '';
    type.selectedIndex = 1;
    rooms.selectedIndex = 0;
    capacity.selectedIndex = 2;
    checkIn.selectedIndex = 0;
    checkOut.selectedIndex = 0;
    features.forEach(function (element) {
      element.checked = false;
    });
  };

  var enableForm = function () {

    var onUploadSuccess = function () {
      var success = successTemplate.cloneNode(true);

      var onSuccessMessageClick = function () {
        submitMessageContainer.removeChild(success);
        document.removeEventListener('click', onSuccessMessageClick);
        document.removeEventListener('keydown', onSuccessMessageEsc);
      };

      var onSuccessMessageEsc = function (evt) {
        if (evt.keyCode === window.constants.keycodes.ESC_KEYCODE) {
          submitMessageContainer.removeChild(success);
          document.removeEventListener('click', onSuccessMessageClick);
          document.removeEventListener('keydown', onSuccessMessageEsc);
        }
      };

      submitMessageContainer.appendChild(success);
      document.addEventListener('click', onSuccessMessageClick);
      document.addEventListener('keydown', onSuccessMessageEsc);
    };

    var onUploadError = function (message) {
      var error = uploadErrorTemplate.cloneNode(true);
      var errorMessage = error.querySelector('.error__message');
      var errorButton = error.querySelector('.error__button');

      var onErrorMessageClick = function () {
        submitMessageContainer.removeChild(error);
        document.removeEventListener('click', onErrorMessageClick);
        document.removeEventListener('keydown', onErrorMessageEsc);
      };

      var onErrorMessageEsc = function (evt) {
        if (evt.keyCode === window.constants.keycodes.ESC_KEYCODE) {
          submitMessageContainer.removeChild(error);
          document.removeEventListener('click', onErrorMessageClick);
          document.removeEventListener('keydown', onErrorMessageEsc);
        }
      };

      errorButton.addEventListener('click', function () {
        window.server.uploadAd(window.constants.serverParams.UPLOAD_URL, new FormData(form), onUploadSuccess, onUploadError);
      });

      errorMessage.textContent = message;
      submitMessageContainer.appendChild(error);
      document.addEventListener('click', onErrorMessageClick);
      document.addEventListener('keydown', onErrorMessageEsc);
    };

    form.classList.remove('ad-form--disabled');
    title.addEventListener('keydown', onTitleKeydown);
    type.addEventListener('change', onTypeChange);
    price.addEventListener('keydown', onPriceKeydown);
    checkIn.addEventListener('change', onCheckInChange);
    checkOut.addEventListener('change', onCheckOutChange);
    avatarChooser.addEventListener('change', function () {
      fileChoose(avatarPreview, avatarChooser);
    });
    var photo = document.createElement('img');
    photo.style.width = '100%';
    photo.style.height = 'auto';
    adFotosContainer.appendChild(photo);
    adFotoChooser.addEventListener('change', function () {
      fileChoose(photo, adFotoChooser);
    });
    submitBtn.addEventListener('click', function () {
      validateForm();
    });

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      if (validateForm()) {
        window.server.uploadAd(window.constants.serverParams.UPLOAD_URL, new FormData(form), onUploadSuccess, onUploadError);
        window.map.init();
        validateForm();
      }
    });

    window.utils.setElemsDisabled(fieldsets, false);
  };

  window.form = {
    fillAddress: fillAddress,
    enable: enableForm,
    disable: disableForm
  };
})();
