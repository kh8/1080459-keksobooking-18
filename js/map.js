'use strict';

(function () {

  var map = document.querySelector('.map');
  var filtersContainer = map.querySelector('.map__filters-container');
  var filters = filtersContainer.querySelectorAll('.map__filter');
  var featuresContainer = filtersContainer.querySelector('.map__features');
  var features = featuresContainer.querySelectorAll('.map__checkbox');
  var typeFilter = filtersContainer.querySelector('#housing-type');
  var priceFilter = filtersContainer.querySelector('#housing-price');
  var roomsFilter = filtersContainer.querySelector('#housing-rooms');
  var guestsFilter = filtersContainer.querySelector('#housing-guests');
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

  var onLoadError = function (message) {
    var error = loadErrorTemplate.cloneNode(true);
    var errorMessage = error.querySelector('.error__message');
    var errorButton = error.querySelector('.error__button');
    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      error.removeChild(error);
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
    pinsContainer.appendChild(window.pins.renderFragment(ads.slice(0, window.constants.MAX_PINS), map, filtersContainer));
  };

  var filterByType = function (ads, filter) {
    return filter.value === 'any' ? ads : ads.filter(function (ad) {
      return filter.value === ad.offer.type;
    });
  };

  var filterByPrice = function (ads, filter) {
    return filter.value === 'any' ? ads : ads.filter(function (ad) {
      switch (filter.value) {
        case 'low':
          return ad.offer.price < window.constants.filterOptions.LOW_PRICE;
        case 'high':
          return ad.offer.price >= window.constants.filterOptions.HIGH_PRICE;
        case 'middle':
          return (ad.offer.price >= window.constants.filterOptions.LOW_PRICE) && (ad.offer.price <= window.constants.filterOptions.HIGH_PRICE);
        default:
          return true;
      }
    });
  };

  var filterByRooms = function (ads, filter) {
    return filter.value === 'any' ? ads : ads.filter(function (ad) {
      return filter.value === ad.offer.rooms + '';
    });
  };

  var filterByGuests = function (ads, filter) {
    return filter.value === 'any' ? ads : ads.filter(function (ad) {
      return filter.value === ad.offer.guests + '';
    });
  };

  var filterByFeature = function (ads, checkbox) {
    return checkbox.checked === false ? ads : ads.filter(function (ad) {
      return ad.offer.features.indexOf(checkbox.value) !== -1;
    });
  };

  var filterByFeatures = function (ads, checkboxes) {
    var filteredAds = ads;
    checkboxes.forEach(function (element) {
      filteredAds = filterByFeature(filteredAds, element);
    });
    return filteredAds;
  };

  var filterByAll = function (ads) {
    var filteredAds = filterByGuests(ads, guestsFilter);
    filteredAds = filterByRooms(filteredAds, roomsFilter);
    filteredAds = filterByPrice(filteredAds, priceFilter);
    filteredAds = filterByType(filteredAds, typeFilter);
    filteredAds = filterByFeatures(filteredAds, features);
    return filteredAds;
  };

  var onFiltersChange = window.utils.debounce(function (ads) {
    clearPinsContainer();
    fillPinsContainer(filterByAll(ads));
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
    window.form.enable(map);
    window.server.loadAds(window.constants.serverParams.LOAD_URL, onLoadSuccess, onLoadError);
  };

  var initMap = function () {
    map.classList.add('map--faded');
    clearPinsContainer();
    initMainPin();
    window.form.disable();
    window.form.fillAddress(mainPin.offsetLeft, mainPin.offsetTop);
    window.utils.setElemsDisabled(filters, false);
    features.disabled = false;
  };

  initMap();

  window.map = {
    init: initMap
  };

})();
