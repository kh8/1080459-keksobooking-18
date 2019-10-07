'use strict';

var keycodes = {
  ENTER_KEYCODE: 13,
  ESC_KEYCODE: 27
};

var MAIN_PIN_ARROW_HEIGHT = 22;

var ADS_COUNT = 8;
var ADS_SETTINGS = {
  MIN_X: 0,
  MAX_X: 1200,
  MIN_Y: 130,
  MAX_Y: 630,
  MAX_PRICE: 100000,
  MAX_ROOMS: 3,
  MAX_GUESTS: 2,
  TYPES: ['palace', 'flat', 'house', 'bungalo'],
  CHECKINS: ['12:00', '13:00', '14:00'],
  CHECKOUTS: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  TITLES: ['Клевая хата', 'Лофт', 'Дом на набережной', 'Пентхаус', 'Мега-сарай', 'Уютное гнездышко', 'Дворец императора'],
  DESCRIPTIONS: ['Отличный вид на соседний дом', 'Дешево и сердито', 'Здесь жил Харуки Мураками', '47й этаж', 'Евроремонт', '3 минуты до метро', 'Тихие соседи'],
  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};

var translateOfferType = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};

var housingMinPrice = {
  'flat': 1000,
  'bungalo': 0,
  'house': 5000,
  'palace': 10000
};

var PIN_IMAGE_PARAMS = {
  width: 40,
  height: 40
};

var MAIN_PIN_IMAGE_PARAMS = {
  width: 65,
  height: 87
};

var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var photoTemplate = cardTemplate.querySelector('.popup__photo');
var similarListElement = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var mainPinImage = mainPin.querySelector('img');
var mapFiltersContainer = map.querySelector('.map__filters-container');
var mapFeatures = mapFiltersContainer.querySelector('.map__features');
var mapFilters = mapFiltersContainer.querySelectorAll('.map__filter');
var adForm = document.querySelector('.ad-form');
var adFormAddress = adForm.querySelector('#address');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var adFormRooms = adForm.querySelector('#room_number');
var adFormCapacity = adForm.querySelector('#capacity');
var adFormPrice = adForm.querySelector('#price');
var adFormType = adForm.querySelector('#type');
var adFormCheckIn = adForm.querySelector('#timein');
var adFormCheckOut = adForm.querySelector('#timeout');
var getCeilRandom = function (max) {
  return Math.floor(Math.random() * max) + 1;
};

var getCeilRandomFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomElementFromArray = function (array) {
  return array[getCeilRandomFromInterval(0, array.length)];
};

var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = getCeilRandom(i);
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var getRandomFeatures = function (features) {
  var allFeatures = '';
  var shuffledFeatures = shuffleArray(features);
  var featuresCount = getCeilRandom(features.length);
  for (var i = 0; i < featuresCount; i++) {
    allFeatures += shuffledFeatures[i] + ' ';
  }
  return allFeatures;
};

var getRandomPhotos = function (photos) {
  var allPhotos = [];
  var shuffledPhotos = shuffleArray(photos);
  var photosCount = getCeilRandom(photos.length);
  for (var i = 0; i < photosCount; i++) {
    allPhotos.push(shuffledPhotos[i]);
  }
  return allPhotos;
};

var getLocation = function (minX, maxX, minY, maxY) {
  var coord = {};
  coord.x = getCeilRandomFromInterval(minX, maxX) - Math.floor(PIN_IMAGE_PARAMS.width / 2);
  coord.y = getCeilRandomFromInterval(minY, maxY) - PIN_IMAGE_PARAMS.height;
  return coord;
};

var generateAd = function (adNumber) {
  var adLocation = getLocation(ADS_SETTINGS.MIN_X, ADS_SETTINGS.MAX_X, ADS_SETTINGS.MIN_Y, ADS_SETTINGS.MAX_Y);
  var ad = {
    author: {
      avatar: 'img/avatars/user0' + adNumber + '.png'
    },
    offer: {
      title: getRandomElementFromArray(ADS_SETTINGS.TITLES),
      address: adLocation.x + ' ' + adLocation.y,
      price: getCeilRandom(ADS_SETTINGS.MAX_PRICE),
      type: getRandomElementFromArray(ADS_SETTINGS.TYPES),
      rooms: getCeilRandom(ADS_SETTINGS.MAX_ROOMS),
      guests: getCeilRandomFromInterval(0, ADS_SETTINGS.MAX_GUESTS),
      checkin: getRandomElementFromArray(ADS_SETTINGS.CHECKINS),
      checkout: getRandomElementFromArray(ADS_SETTINGS.CHECKOUTS),
      features: getRandomFeatures(ADS_SETTINGS.FEATURES),
      description: getRandomElementFromArray(ADS_SETTINGS.DESCRIPTIONS),
      photos: getRandomPhotos(ADS_SETTINGS.PHOTOS)
    },
    location: {
      x: adLocation.x,
      y: adLocation.y
    }
  };
  return ad;
};

var generateAds = function (adsCount) {
  var ads = [];
  for (var i = 1; i <= adsCount; i++) {
    ads.push(generateAd(i));
  }
  return ads;
};

var makePin = function (ad) {
  var pin = similarPinTemplate.cloneNode(true);
  var pinImage = pin.querySelector('img');
  var openPopup = function () {
    var lastMapCard = map.querySelector('.map__card');
    if (lastMapCard) {
      map.replaceChild(makeCard(ad), lastMapCard);
    } else {
      map.insertBefore(makeCard(ad), mapFiltersContainer);
    }
  };
  pin.style.left = ad.location.x + 'px';
  pin.style.top = ad.location.y + 'px';
  pinImage.src = ad.author.avatar;
  pinImage.alt = ad.offer.title;
  pin.addEventListener('click', openPopup);
  pin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === keycodes.ENTER_KEYCODE) {
      openPopup();
    }
  });
  return pin;
};

var makePinsFragment = function (ads) {
  var fragment = document.createDocumentFragment();
  ads.forEach(function (element) {
    fragment.appendChild(makePin(element));
  });
  return fragment;
};

var makePhoto = function (photoSrc) {
  var photo = photoTemplate.cloneNode(true);
  photo.src = photoSrc;
  return photo;
};

var makePhotosFragment = function (photos) {
  var fragment = document.createDocumentFragment();
  photos.forEach(function (element) {
    fragment.appendChild(makePhoto(element));
  });
  return fragment;
};

var makeCard = function (ad) {
  var card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.address;
  card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = translateOfferType[ad.offer.type];
  card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  card.querySelector('.popup__features').textContent = ad.offer.features;
  card.querySelector('.popup__description').textContent = ad.offer.description;
  card.querySelector('.popup__avatar').src = ad.author.avatar;
  card.querySelector('.popup__photos').innerHTML = '';
  card.querySelector('.popup__photos').appendChild(makePhotosFragment(ad.offer.photos));

  var closePopup = function () {
    map.removeChild(card);
  };
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === keycodes.ESC_KEYCODE) {
      closePopup();
    }
  };
  var popupClose = card.querySelector('.popup__close');
  popupClose.addEventListener('click', closePopup);
  document.addEventListener('keydown', onPopupEscPress);
  return card;
};

var setElemsDisabled = function (DOMElements, isDisabled) {
  DOMElements.forEach(function (element) {
    element.disabled = isDisabled;
  });
};

var adFormRoomsChangeHandler = function () {
  var validityMessage = checkRoomsGuestsValidity() ? 'Некорректное число гостей' : '';
  adFormCapacity.setCustomValidity(validityMessage);
};

var adFormPriceChangeHandler = function () {
  var minPrice = housingMinPrice[adFormType.value];
  if (adFormPrice.value < minPrice) {
    var validityMessage = 'Цена за ночь должна быть в интервале от ' + minPrice + ' до 1000000';
    adFormPrice.setCustomValidity(validityMessage);
  } else {
    adFormPrice.setCustomValidity('');
  }
};

var adFormTypeChangeHandler = function () {
  var minPrice = housingMinPrice[adFormType.value];
  adFormPrice.placeholder = minPrice;
  if (adFormPrice.value < minPrice) {
    var validityMessage = 'Цена за ночь должна быть в интервале от ' + minPrice + ' до 1000000';
    adFormPrice.setCustomValidity(validityMessage);
  } else {
    adFormPrice.setCustomValidity('');
  }
};

var adFormCheckInChangeHandler = function (evt) {
  adFormCheckOut.value = evt.currentTarget.value;
};

var adFormCheckOutChangeHandler = function (evt) {
  adFormCheckIn.value = evt.currentTarget.value;
};

var enableMap = function () {
  adFormCapacity.addEventListener('change', adFormRoomsChangeHandler);
  adFormRooms.addEventListener('change', adFormRoomsChangeHandler);
  adFormPrice.addEventListener('change', adFormPriceChangeHandler);
  adFormType.addEventListener('change', adFormTypeChangeHandler);
  adFormCheckIn.addEventListener('change', function () {
    adFormCheckInChangeHandler(window.event);
  });
  adFormCheckOut.addEventListener('change', function () {
    adFormCheckOutChangeHandler(window.event);
  });
  mainPin.removeEventListener('keydown', mainPinEnterKeydownHandler);
  mainPin.removeEventListener('click', enableMap);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  fillAdFormAddress();
  adFormFieldsets.disabled = true;
  mapFeatures.disabled = true;
  setElemsDisabled(mapFilters, true);
  similarListElement.appendChild(makePinsFragment(generateAds(ADS_COUNT)));
};

var fillAdFormAddress = function () {
  adFormAddress.value = (mainPin.offsetLeft + mainPinImage.width / 2) + ', ' + (mainPin.offsetTop + MAIN_PIN_ARROW_HEIGHT);
};

var checkRoomsGuestsValidity = function () {
  var rooms = +adFormRooms.value;
  var guests = +adFormCapacity.value;
  return (guests > rooms) || ((guests === 0) !== (rooms === 100));
};

var mainPinClickHandler = function () {
  enableMap();
  mainPin.removeEventListener('click', mainPinClickHandler);
};

var mainPinEnterKeydownHandler = function (evt) {
  if (evt.keyCode === keycodes.ENTER_KEYCODE) {
    enableMap();
    mainPin.removeEventListener('click', mainPinEnterKeydownHandler);
  }
};

var mainPinMouseDownHandler = function (evt) {
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
  var mouseMoveHandler = function (moveEvt) {
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
    adFormAddress.value = Math.floor(currentCoords.x + MAIN_PIN_IMAGE_PARAMS.width / 2) + ', ' + Math.floor(currentCoords.y + MAIN_PIN_IMAGE_PARAMS.height);
  };

  var mouseUpHandler = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
    if (dragged) {
      var onClickPreventDefault = function (evt1) {
        evt1.preventDefault();
        mainPin.removeEventListener('click', onClickPreventDefault);
      };
      mainPin.addEventListener('click', onClickPreventDefault);
    }
    mainPin.removeEventListener('mousedown', enableMap);
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
};

var initMap = function () {
  adForm.classList.add('ad-form--disabled');
  mainPin.addEventListener('click', mainPinClickHandler);
  mainPin.addEventListener('keydown', function () {
    mainPinEnterKeydownHandler(window.event);
  });
  mainPin.addEventListener('mousedown', function () {
    mainPinMouseDownHandler(window.event);
  });
  setElemsDisabled(adFormFieldsets, false);
  setElemsDisabled(mapFilters, false);
  mapFeatures.disabled = false;
};

initMap();
