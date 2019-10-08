'use strict';

(function () {

  var MAIN_PIN_ARROW_HEIGHT = 22;

  var MAIN_PIN_IMAGE_PARAMS = {
    width: 65,
    height: 87
  };

  var keycodes = {
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27
  };

  var map = document.querySelector('.map');
  var filtersContainer = map.querySelector('.map__filters-container');
  var features = filtersContainer.querySelector('.map__features');
  var filters = filtersContainer.querySelectorAll('.map__filter');
  var ADS_COUNT = 8;

  var similarListElement = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinImage = mainPin.querySelector('img');

  var makePinsFragment = function (ads) {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (element) {
      fragment.appendChild(window.pin.makePin(element));
    });
    return fragment;
  };

  var setElemsDisabled = function (DOMElements, isDisabled) {
    DOMElements.forEach(function (element) {
      element.disabled = isDisabled;
    });
  };

  var fillAdFormAddress = function () {
    window.form.address.value = (mainPin.offsetLeft + mainPinImage.width / 2) + ', ' + (mainPin.offsetTop + MAIN_PIN_ARROW_HEIGHT);
  };

  var onMainPinClick = function () {
    enableMap();
    mainPin.removeEventListener('click', onMainPinClick);
  };

  var onMainPinEnterKeydown = function (evt) {
    if (evt.keyCode === keycodes.ENTER_KEYCODE) {
      enableMap();
      mainPin.removeEventListener('click', onMainPinEnterKeydown);
    }
  };

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var currentCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      currentCoords.x = mainPin.offsetLeft - shift.x;
      currentCoords.y = mainPin.offsetTop - shift.y;
      mainPin.style.left = currentCoords.x + 'px';
      mainPin.style.top = currentCoords.y + 'px';
      window.form.address.value = Math.floor(currentCoords.x + MAIN_PIN_IMAGE_PARAMS.width / 2) + ', ' + Math.floor(currentCoords.y + MAIN_PIN_IMAGE_PARAMS.height);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (preventEvt) {
          preventEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }
      mainPin.removeEventListener('mousedown', enableMap);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var enableMap = function () {
    window.form.initForm();
    mainPin.removeEventListener('keydown', onMainPinEnterKeydown);
    mainPin.removeEventListener('click', enableMap);
    map.classList.remove('map--faded');
    fillAdFormAddress();
    window.form.form.classList.remove('ad-form--disabled');
    window.form.fieldsets.disabled = true;
    features.disabled = true;
    setElemsDisabled(filters, true);
    similarListElement.appendChild(makePinsFragment(window.data.generateAds(ADS_COUNT)));
  };

  var initMap = function () {
    window.form.form.classList.add('ad-form--disabled');
    mainPin.addEventListener('click', onMainPinClick);
    mainPin.addEventListener('keydown', function () {
      onMainPinEnterKeydown(window.event);
    });
    mainPin.addEventListener('mousedown', function () {
      onMainPinMouseDown(window.event);
    });
    setElemsDisabled(window.form.fieldsets, false);
    setElemsDisabled(filters, false);
    features.disabled = false;
  };

  window.map = {
    map: map,
    enableMap: enableMap,
    keycodes: keycodes
  };

  initMap();

})();
