'use strict';

(function () {

  var map = document.querySelector('.map');
  var filtersContainer = map.querySelector('.map__filters-container');
  var filters = filtersContainer.querySelectorAll('.map__filter');
  var pinsContainer = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var loadErrorTemplate = document.querySelector('#error').content.querySelector('.error');

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

      if (moveEvt.clientY - dragoffset.y < window.constants.mainPinParams.MIN_Y - window.constants.mainPinParams.HEIGHT) {
        offset.y = window.constants.mainPinParams.MIN_Y - window.constants.mainPinParams.HEIGHT;
      } else if (moveEvt.clientY - dragoffset.y + window.constants.mainPinParams.HEIGHT > window.constants.mainPinParams.MAX_Y) {
        offset.y = window.constants.mainPinParams.MAX_Y - window.constants.mainPinParams.HEIGHT;
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

  var onLoadError = function (message) {
    var error = loadErrorTemplate.cloneNode(true);
    var errorMessage = error.querySelector('.error__message');
    var errorButton = error.querySelector('.error__button');
    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      error.remove();
      window.server.loadAds(window.constants.serverParams.LOAD_URL, onLoadSuccess, onLoadError);
    });
    errorMessage.textContent = message;
    map.insertBefore(error, filtersContainer);
  };

  var initMainPin = function () {
    mainPin.style.left = window.constants.mainPinParams.START_X + 'px';
    mainPin.style.top = window.constants.mainPinParams.START_Y + 'px';
    mainPin.addEventListener('click', onMainPinClick);
    mainPin.addEventListener('keydown', onMainPinEnterKeydown);
    mainPin.addEventListener('mousedown', onMainPinMouseDown);
  };

  var clearPinsContainer = function () {
    var mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (mapPins) {
      mapPins.forEach(function (element) {
        pinsContainer.removeChild(element);
      });
    }
  };

  var fillPinsContainer = function (ads) {
    pinsContainer.appendChild(window.pins.renderFragment(ads.slice(0, window.constants.MAX_PINS), map));
  };

  var onFiltersChange = window.utils.debounce(function (ads) {
    clearPinsContainer();
    window.card.remove();
    fillPinsContainer(window.filter.filterByAll(ads, filtersContainer));
  });

  var enableFilters = function (ads) {
    filtersContainer.addEventListener('change', function () {
      onFiltersChange(ads);
    });
  };

  var onLoadSuccess = function (data) {
    enableFilters(data);
    clearPinsContainer();
    fillPinsContainer(data);
  };

  var enableMap = function () {
    map.classList.remove('map--faded');
    window.form.enable();
    window.server.loadAds(window.constants.serverParams.LOAD_URL, onLoadSuccess, onLoadError);
  };

  var initMap = function () {
    map.classList.add('map--faded');
    clearPinsContainer();
    initMainPin();
    window.card.remove();
    window.form.disable();
    window.form.fillAddress(mainPin.offsetLeft, mainPin.offsetTop);
    window.utils.setElemsDisabled(filters, false);
  };

  initMap();

  window.map = {
    init: initMap
  };

})();
