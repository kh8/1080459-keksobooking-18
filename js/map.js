'use strict';

(function () {

  var map = document.querySelector('.map');
  var filtersContainer = map.querySelector('.map__filters-container');
  var features = filtersContainer.querySelector('.map__features');
  var filters = filtersContainer.querySelectorAll('.map__filter');
  var similarListElement = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var onMainPinClick = function () {
    enableMap();
    mainPin.removeEventListener('click', onMainPinClick);
  };

  var onMainPinEnterKeydown = function (evt) {
    if (evt.keyCode === window.constants.keycodes.ENTER_KEYCODE) {
      enableMap();
      mainPin.removeEventListener('click', onMainPinEnterKeydown);
    }
  };

  var onMainPinMouseDown = function (evt) {
    var dragoffset = {
      x: evt.clientX - mainPin.offsetLeft,
      y: evt.clientY - mainPin.offsetTop
    };
    var offset = {
      x: 0,
      y: 0
    };

    var onMouseMove = function (moveEvt) {
      if (moveEvt.clientX - dragoffset.x < 0) {
        offset.x = 0;
      } else if (moveEvt.clientX - dragoffset.x + window.constants.mainPinParams.WIDTH > map.clientWidth) {
        offset.x = map.clientWidth - window.constants.mainPinParams.WIDTH;
      } else {
        offset.x = moveEvt.clientX - dragoffset.x;
      }

      if (moveEvt.clientY - dragoffset.y < 0) {
        offset.y = 0;
      } else if (moveEvt.clientY - dragoffset.y + window.constants.mainPinParams.HEIGHT > map.clientHeight) {
        offset.y = map.clientHeight - window.constants.mainPinParams.HEIGHT;
      } else {
        offset.y = moveEvt.clientY - dragoffset.y;
      }

      mainPin.style.top = offset.y + 'px';
      mainPin.style.left = offset.x + 'px';
      window.form.fillAddress(offset.x, offset.y);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      mainPin.removeEventListener('mousedown', enableMap);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onError = function (message) {
    var error = errorTemplate.cloneNode(true);
    var errorMessage = error.querySelector('.error__message');
    var errorButton = error.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      error.removeChild(error);
      window.server.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
    });
    errorMessage.textContent = message;
    map.insertBefore(error, filtersContainer);
  };

  var onSuccess = function (data) {
    similarListElement.appendChild(window.pin.makePinsFragment(data, map, filtersContainer));
  };

  var enableMap = function () {
    map.classList.remove('map--faded');
    window.form.enable(map);
    mainPin.removeEventListener('keydown', onMainPinEnterKeydown);
    mainPin.removeEventListener('click', enableMap);
    window.form.fillAddress(mainPin.offsetLeft, mainPin.offsetTop);
    features.disabled = true;
    window.utils.setElemsDisabled(filters, true);
    window.server.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
  };

  var initMap = function () {
    window.form.disable();
    window.utils.setElemsDisabled(filters, false);
    features.disabled = false;
    mainPin.addEventListener('click', onMainPinClick);
    mainPin.addEventListener('keydown', onMainPinEnterKeydown);
    mainPin.addEventListener('mousedown', onMainPinMouseDown);
  };

  initMap();

})();
