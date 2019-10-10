'use strict';

(function () {

  var map = document.querySelector('.map');
  var filtersContainer = map.querySelector('.map__filters-container');
  var features = filtersContainer.querySelector('.map__features');
  var filters = filtersContainer.querySelectorAll('.map__filter');

  var similarListElement = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  var makePinsFragment = function (ads) {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (element) {
      fragment.appendChild(window.pin.make(element, map, filtersContainer));
    });
    return fragment;
  };

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
      window.form.fillAddress(currentCoords.x, currentCoords.y);
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
    map.classList.remove('map--faded');
    window.form.enable();
    mainPin.removeEventListener('keydown', onMainPinEnterKeydown);
    mainPin.removeEventListener('click', enableMap);
    window.form.fillAddress(mainPin.offsetLeft, mainPin.offsetTop);
    features.disabled = true;
    window.utils.setElemsDisabled(filters, true);
    similarListElement.appendChild(makePinsFragment(window.data.generateAds(window.data.ADS_COUNT)));
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
