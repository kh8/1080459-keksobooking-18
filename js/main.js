'use strict';

var ADS_COUNT = 8;
var ADS = {
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

var getRandomElementFromArray = function (array) {
  return array[getCeilRandom(array.length)];
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

var makePin = function (ad) {
  var pin = similarPinTemplate.cloneNode(true);
  var pinImage = pin.querySelector('img');
  pin.style.left = ad.location.x - (Math.floor(pinImage.width / 2)) + 'px';
  pin.style.top = (ad.location.y - pinImage.height) + 'px';
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

var generateAd = function (adNumber) {
  var ad = {
    author: {
      avatar: 'img/avatars/user0' + adNumber + '.png'
    },
    offer: {
      title: getRandomTitle(),
      address: getRandomAddress(),
      price: getCeilRandom(ADS.MAX_PRICE),
      type: getRandomElementFromArray(ADS.TYPES),
      rooms: getCeilRandom(ADS.MAX_ROOMS),
      guests: getCeilRandom(ADS.MAX_GUESTS),
      checkin: getRandomElementFromArray(ADS.CHECKINS),
      checkout: getRandomElementFromArray(ADS.CHECKOUTS),
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

var generateAds = function (adsCount) {
  var ads = [];
  for (var i = 1; i <= adsCount; i++) {
    ads.push(generateAd(i));
  }
  return ads;
};

var initMap = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  var similarListElement = document.querySelector('.map__pins');
  similarListElement.appendChild(makePinsFragment(myAds));
};

var myAds = generateAds(ADS_COUNT);
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
initMap();
