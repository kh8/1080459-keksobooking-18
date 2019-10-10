'use strict';

(function () {

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

  var getLocation = function (minX, maxX, minY, maxY) {
    var coord = {};
    coord.x = window.utils.getCeilRandomFromInterval(minX, maxX) - Math.floor(window.constants.pinParams.WIDTH / 2);
    coord.y = window.utils.getCeilRandomFromInterval(minY, maxY) - window.constants.pinParams.HEIGHT;
    return coord;
  };

  var getRandomFeatures = function (features) {
    var allFeatures = '';
    var shuffledFeatures = window.utils.shuffleArray(features);
    var featuresCount = window.utils.getCeilRandom(features.length);
    for (var i = 0; i < featuresCount; i++) {
      allFeatures += shuffledFeatures[i] + ' ';
    }
    return allFeatures;
  };

  var getRandomPhotos = function (photos) {
    var allPhotos = [];
    var shuffledPhotos = window.utils.shuffleArray(photos);
    var photosCount = window.utils.getCeilRandom(photos.length);
    for (var i = 0; i < photosCount; i++) {
      allPhotos.push(shuffledPhotos[i]);
    }
    return allPhotos;
  };

  var generateAd = function (adNumber) {
    var adLocation = getLocation(ADS_SETTINGS.MIN_X, ADS_SETTINGS.MAX_X, ADS_SETTINGS.MIN_Y, ADS_SETTINGS.MAX_Y);
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + adNumber + '.png'
      },
      offer: {
        title: window.utils.getRandomElementFromArray(ADS_SETTINGS.TITLES),
        address: adLocation.x + ' ' + adLocation.y,
        price: window.utils.getCeilRandom(ADS_SETTINGS.MAX_PRICE),
        type: window.utils.getRandomElementFromArray(ADS_SETTINGS.TYPES),
        rooms: window.utils.getCeilRandom(ADS_SETTINGS.MAX_ROOMS),
        guests: window.utils.getCeilRandomFromInterval(0, ADS_SETTINGS.MAX_GUESTS),
        checkin: window.utils.getRandomElementFromArray(ADS_SETTINGS.CHECKINS),
        checkout: window.utils.getRandomElementFromArray(ADS_SETTINGS.CHECKOUTS),
        features: getRandomFeatures(ADS_SETTINGS.FEATURES),
        description: window.utils.getRandomElementFromArray(ADS_SETTINGS.DESCRIPTIONS),
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

  window.data = {
    ADS_COUNT: ADS_COUNT,
    generateAds: generateAds
  };

})();
