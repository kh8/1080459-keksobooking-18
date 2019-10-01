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

var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var photoTemplate = cardTemplate.querySelector('.popup__photo');
var similarListElement = document.querySelector('.map__pins');
var pinImage = document.querySelector('#pin').content.querySelector('img');
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
  coord.x = getCeilRandomFromInterval(minX, maxX) - pinImage.width / 2;
  coord.y = getCeilRandomFromInterval(minY, maxY) - pinImage.height;
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
  pin.style.left = ad.location.x + 'px';
  pin.style.top = ad.location.y + 'px';
  pinImage.src = ad.author.avatar;
  pinImage.alt = ad.offer.title;
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

var renderCard = function (ad) {
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
  return card;
};

var setElemsAvailability = function (DOMElements, isEnabled) {
  DOMElements.forEach(function (element) {
    element.disabled = !isEnabled;
  });
};

var setElemAvailability = function (DOMElement, isEnabled) {
  DOMElement.disabled = !isEnabled;
};

var mainPinClick = function () {
  enableMap();
};

var mainPinEnterKeydown = function (evt) {
  if (evt.keyCode === keycodes.ENTER_KEYCODE) {
    enableMap();
  }
};

var adFormRoomsChanged = function () {
  if (checkRoomsGuestsValidity()) {
    adFormCapacity.setCustomValidity('Некорректное число гостей');
  } else {
    adFormCapacity.setCustomValidity('');
  }
};

var enableMap = function () {
  adFormCapacity.addEventListener('change', adFormRoomsChanged);
  adFormRooms.addEventListener('change', adFormRoomsChanged);
  mainPin.removeEventListener('keydown', mainPinEnterKeydown);
  mainPin.removeEventListener('click', mainPinClick);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  fillAdFormAddress();
  setElemsAvailability(adFormFieldsets, true);
  setElemsAvailability(mapFilters, true);
  setElemAvailability(mapFeatures, true);
};

var fillAdFormAddress = function () {
  adFormAddress.value = (mainPin.offsetLeft + mainPinImage.width / 2) + ', ' + (mainPin.offsetTop + MAIN_PIN_ARROW_HEIGHT);
};

var checkRoomsGuestsValidity = function () {
  var rooms = +adFormRooms.value;
  var guests = +adFormCapacity.value;
  return (guests > rooms) || ((guests === 0) !== (rooms === 100));
};

var initMap = function () {
  mainPin.addEventListener('mousedown', mainPinClick);
  mainPin.addEventListener('keydown', mainPinEnterKeydown);
  adForm.classList.add('ad-form--disabled');
  setElemsAvailability(adFormFieldsets, false);
  setElemsAvailability(mapFilters, false);
  setElemAvailability(mapFeatures, false);
  var myAds = generateAds(ADS_COUNT);
  similarListElement.appendChild(makePinsFragment(myAds));
  map.insertBefore(renderCard(myAds[0]), mapFiltersContainer);
};

initMap();
