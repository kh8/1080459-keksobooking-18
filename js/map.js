'use strict';

(function () {

  var map = document.querySelector('.map');
  var filtersContainer = map.querySelector('.map__filters-container');
  var features = filtersContainer.querySelector('.map__features');
  var filters = filtersContainer.querySelectorAll('.map__filter');
  var checkboxes = filtersContainer.querySelectorAll('.map__checkbox');
  var typeFilter = filtersContainer.querySelector('#housing-type');
  var priceFilter = filtersContainer.querySelector('#housing-price');
  var roomsFilter = filtersContainer.querySelector('#housing-rooms');
  var guestsFilter = filtersContainer.querySelector('#housing-guests');
  var wifiFilter = filtersContainer.querySelector('#filter-wifi');
  var dishwasherFilter = filtersContainer.querySelector('#filter-dishwasher');
  var parkingFilter = filtersContainer.querySelector('#filter-parking');
  var washerFilter = filtersContainer.querySelector('#filter-washer');
  var elevatorFilter = filtersContainer.querySelector('#filter-elevator');
  var conditionerFilter = filtersContainer.querySelector('#filter-conditioner');
  var pinsContainer = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var loadErrorTemplate = document.querySelector('#error').content.querySelector('.error');

  // var filterCriterions = {
  //   type: '',
  //   price: 0,
  //   guests: 0,
  //   rooms: 0,
  //   wifi: false,
  //   dishwasher: false,
  //   parking: false,
  //   washer: false,
  //   elevator: false,
  //   conditioner: false
  // }

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

  // var filterByType = function (ads) {
  //   return typeFilter.value === 'any' ? ads : ads.filter(function (ad) {
  //     return typeFilter.value === ad.offer.type;
  //   });
  // };

  // var filterByPrice = function (ads) {
  //   return priceFilter.value === 'any' ? ads : ads.filter(function (ad) {
  //     switch (priceFilter.value) {
  //       case 'low':
  //         return ad.offer.price < window.constants.filterOptions.LOW_PRICE;
  //       case 'high':
  //         return ad.offer.price >= window.constants.filterOptions.HIGH_PRICE;
  //       case 'middle':
  //         return (ad.offer.price >= window.constants.filterOptions.LOW_PRICE) && (ad.offer.price <= window.constants.filterOptions.HIGH_PRICE);
  //       default:
  //         return true;
  //     }
  //   });
  // };

  // var filterByRooms = function (ads) {
  //   return roomsFilter.value === 'any' ? true : ads.filter(function (ad) {
  //     return roomsFilter.value === ad.offer.rooms + '';
  //   });
  // };

  // var filterByGuests = function (ads) {
  //   return guestsFilter.value === 'any' ? ads : ads.filter(function (ad) {
  //     return guestsFilter.value === ad.offer.guests + '';
  //   });
  // };

  // var filterByWifi = function (ads) {
  //   return wifiFilter.checked === false ? ads : ads.filter(function (ad) {
  //     return ad.offer.features.indexOf('wifi') !== -1;
  //   });
  // };

  // var filterByDishwasher = function (ads) {
  //   return dishwasherFilter.checked === false ? ads : ads.filter(function (ad) {
  //     return ad.offer.features.indexOf('dishwasher') !== -1;
  //   });
  // };

  // var filterByParking = function (ads) {
  //   return parkingFilter.checked === false ? ads : ads.filter(function (ad) {
  //     return ad.offer.features.indexOf('parking') !== -1;
  //   });
  // };


  // var filterByWasher = function (ads) {
  //   return washerFilter.checked === false ? ads : ads.filter(function (ad) {
  //     return ad.offer.features.indexOf('washer') !== -1;
  //   });
  // };

  // var filterByElevator = function (ads) {
  //   return elevatorFilter.checked === false ? ads : ads.filter(function (ad) {
  //     return ad.offer.features.indexOf('elevator') !== -1;
  //   });
  // };

  // var filterByConditioner = function (ads) {
  //   return conditionerFilter.checked === false ? ads : ads.filter(function (ad) {
  //     return ad.offer.features.indexOf('conditioner') !== -1;
  //   });
  // };

  // var filterByAll = function (ads) {
  //   var filteredAds = filterByConditioner(ads);
  //   filteredAds = filterByElevator(filteredAds);
  //   filteredAds = filterByWasher(filteredAds);
  //   filteredAds = filterByParking(filteredAds);
  //   filteredAds = filterByDishwasher(filteredAds);
  //   filteredAds = filterByWifi(filteredAds);
  //   filteredAds = filterByGuests(filteredAds);
  //   filteredAds = filterByRooms(filteredAds);
  //   filteredAds = filterByPrice(filteredAds);
  //   filteredAds = filterByType(filteredAds);
  //   return filteredAds;
  // };

  var checkAdConformity = function (ad) {

    var isAdTypeConform = function () {
      return typeFilter.value === 'any' ? true : typeFilter.value === ad.offer.type;
    };

    var isAdPriceConform = function () {
      switch (priceFilter.value) {
        case 'any':
          return true;
        case 'low':
          return ad.offer.price < window.constants.filterOptions.LOW_PRICE;
        case 'high':
          return ad.offer.price >= window.constants.filterOptions.HIGH_PRICE;
        case 'middle':
          return (ad.offer.price >= window.constants.filterOptions.LOW_PRICE) && (ad.offer.price <= window.constants.filterOptions.HIGH_PRICE);
        default:
          return true;
      }
    };


    var isAdRoomsConform = function () {
      return roomsFilter.value === 'any' ? true : roomsFilter.value === ad.offer.rooms + '';
    };

    var isAdGuestsConform = function () {
      return guestsFilter.value === 'any' ? true : guestsFilter.value === ad.offer.guests + '';
    };

    var isAdWifiConform = function () {
      return wifiFilter.checked === false ? true : ad.offer.features.indexOf('wifi') !== -1;
    };

    var isAdDishwasherConform = function () {
      return dishwasherFilter.checked === false ? true : ad.offer.features.indexOf('dishwasher') !== -1;
    };

    var isAdParkingConform = function () {
      return parkingFilter.checked === false ? true : ad.offer.features.indexOf('parking') !== -1;
    };

    var isAdWasherConform = function () {
      return washerFilter.checked === false ? true : ad.offer.features.indexOf('washer') !== -1;
    };

    var isAdElevatorConform = function () {
      return elevatorFilter.checked === false ? true : ad.offer.features.indexOf('elevator') !== -1;
    };

    var isAdConditionerConform = function () {
      return conditionerFilter.checked === false ? true : ad.offer.features.indexOf('conditioner') !== -1;
    };

    var conformityChecks = [
      isAdTypeConform,
      isAdPriceConform,
      isAdRoomsConform,
      isAdGuestsConform,
      isAdWifiConform,
      isAdDishwasherConform,
      isAdParkingConform,
      isAdWasherConform,
      isAdElevatorConform,
      isAdConditionerConform
    ];

    var i = 0;
    while (conformityChecks[i]() && i < conformityChecks.length - 1) {
      i++;
    }

    return i === conformityChecks.length - 1;
  };

  var getConformAds = function (ads) {
    return ads.filter(function (ad) {
      return checkAdConformity(ad);
    });
  };

  var onFiltersChange = window.utils.debounce(function (ads) {
    clearPinsContainer();
    fillPinsContainer(getConformAds(ads));
  });

  var enableFilters = function (ads) {
    typeFilter.addEventListener('change', function () {
      onFiltersChange(ads);
    });
    priceFilter.addEventListener('change', function () {
      onFiltersChange(ads);
    });
    roomsFilter.addEventListener('change', function () {
      onFiltersChange(ads);
    });
    guestsFilter.addEventListener('change', function () {
      onFiltersChange(ads);
    });
    // filters.forEach(function (element) {
    //   element.addEventListener('change', function () {
    //     onFiltersChange(ads);
    //   });

    checkboxes.forEach(function (element) {
      element.addEventListener('change', function () {
        onFiltersChange(ads);
      });
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
