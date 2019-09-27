'use strict';

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

var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var similarListElement = document.querySelector('.map__pins');
var pinImage = document.querySelector('#pin').content.querySelector('img');
var map = document.querySelector('.map');
var mapFilters = map.querySelector('.map__filters-container');

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

var makePinsFragment = function (myAds) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < myAds.length; i++) {
    fragment.appendChild(makePin(myAds[i]));
  }
  return fragment;
};

var makeCard = function (ad) {
  var card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.address;
  card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  switch (ad.offer.type) {
    case 'flat':
      card.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'bungalo':
      card.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'house':
      card.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'palace': card.querySelector('.popup__type').textContent = 'Дворец';
  }
  card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  card.querySelector('.popup__features').textContent = ad.offer.features;
  card.querySelector('.popup__description').textContent = ad.offer.description;
  card.querySelector('.popup__avatar').src = ad.author.avatar;
  for (var i = 0; i < ad.offer.photos.length; i++) {
    var photo = card.querySelector('.popup__photo').cloneNode(true);
    photo.src = ad.offer.photos[i];
    card.querySelector('.popup__photos').appendChild(photo);
  }
  card.querySelector('.popup__photo').remove();
  return card;
};

var initMap = function (ads) {
  map.classList.remove('map--faded');
  similarListElement.appendChild(makePinsFragment(ads));
  map.insertBefore(makeCard(ads[0]), mapFilters);
};
var myAds = generateAds(ADS_COUNT);
initMap(myAds);
