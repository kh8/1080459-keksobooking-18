'use strict';

var ADS_COUNT = 8;
var ADS = {
  MAX_X: 1200,
  MIN_Y: 130,
  MAX_Y: 630,
  MAX_PRICE: 100000,
  MAX_ROOMS: 3,
  MAX_GUESTS: 2,
  TYPE_COUNT: 4,
  TYPES: ['palace', 'flat', 'house', 'bungalo'],
  CHECKINS: ['12:00', '13:00', '14:00'],
  CHECKOUTS: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};

var getCeilRandom = function (max) {
  return Math.floor(Math.random() * max);
};

var getCeilRandomFromInterval = function (min, max) {
  return getCeilRandom(max - min) + min;
};

var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = getCeilRandom(i + 1);
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var getRandomTitle = function () {
  return '';
};

var getRandomAddress = function () {
  return getCeilRandom(ADS.MAX_X) + ' ' + getCeilRandom(ADS.MAX_X);
};

var getRandomType = function () {
  return ADS.TYPES[getCeilRandom(ADS.TYPE_COUNT)];
};

var getRandomCheckin = function () {
  return ADS.CHECKINS[getCeilRandom(ADS.CHECKINS.length)];
};

var getRandomCheckOut = function () {
  return ADS.CHECKOUTS[getCeilRandom(ADS.CHECKOUTS.length)];
};

var getRandomFeatures = function () {
  var allFeatures = '';
  var shuffledFeatures = shuffleArray(ADS.FEATURES);
  var featuresCount = getCeilRandom(ADS.FEATURES.length);
  for (var i = 0; i <= featuresCount; i++) {
    allFeatures += shuffledFeatures[i] + ' ';
  }
  return allFeatures;
};

var getRandomDescription = function () {
  return '';
};

var getRandomPhotos = function () {
  var allPhotos = '';
  var shuffledPhotos = shuffleArray(ADS.PHOTOS);
  var photosCount = getCeilRandom(ADS.PHOTOS.length);
  for (var i = 0; i <= photosCount; i++) {
    allPhotos += shuffledPhotos[i] + ' ';
  }
  return allPhotos;
};

var getPin = function (ad) {
  var pin = similarPinTemplate.cloneNode(true);
  var pinImg = pin.querySelector('img');
  pin.style.left = (ad.location.x - (Math.floor(pinImg.width / 2)) + 'px');
  pin.style.top = ((ad.location.y - pinImg.height) + 'px');
  pinImg.src = ad.author.avatar;
  pinImg.alt = ad.offer.title;
  return pin;
};

var getPins = function (myAds) {
  var pins = [];
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < myAds.length; i++) {
    pins[i] = getPin(myAds[i]);
    fragment.appendChild(pins[i]);
  }
  return fragment;
};

var generateAd = function (addNumber) {
  var ad = {
    author: {
      avatar: 'img/avatars/user0' + addNumber + '.png'
    },
    offer: {
      title: getRandomTitle(),
      address: getRandomAddress(),
      price: getCeilRandom(ADS.MAX_PRICE),
      type: getRandomType(),
      rooms: getCeilRandom(ADS.MAX_ROOMS),
      guests: getCeilRandom(ADS.MAX_GUESTS),
      checkin: getRandomCheckin(),
      checkout: getRandomCheckOut(),
      features: getRandomFeatures(),
      description: getRandomDescription(),
      photos: getRandomPhotos()
    },
    location: {
      x: getCeilRandom(ADS.MAX_X),
      y: getCeilRandomFromInterval(ADS.MIN_Y, ADS.MAX_Y)
    }
  };
  return ad;
};

var generateAds = function (myAds) {
  for (var i = 1; i <= ADS_COUNT; i++) {
    myAds.push(generateAd(i));
  }
  return myAds;
};

var initMap = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  var similarListElement = document.querySelector('.map__pins');
  similarListElement.appendChild(getPins(myAds));
};

var myAds = [];
generateAds(myAds);
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
initMap();
