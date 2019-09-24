'use strict';

  var ADS_COUNT = 8;
  var ADS = {
    MAX_X: 800,
    MAX_Y: 600,
    MAX_PRICE: 10000,
    MAX_ROOMS: 15,
    MAX_GUESTS: 4,
    TYPE_COUNT: 4,
    MAX_FEATURES: 5,
    MAX_PHOTOS: 3,
    CHECKINS: ['12:00', '13:00', '14:00'],
    CHECKOUTS: ['12:00', '13:00', '14:00'],
    FEATURES: ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
    PHOTOS: [
      "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
      "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
      "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
  }

  var ceilRandom = function (x) {
    return Math.floor(Math.random() * x);
  }

  var getRandomTitle = function () {
  return '';
  }

var getRandomAddress = function () {
  return ceilRandom(ADS.MAX_X) + '' + ceilRandom(ADS.MAX_X);
}

var getRandomPrice = function () {
  return ceilRandom(ADS.MAX_PRICE);
}

var getRandomType = function () {
  return ceilRandom(ADS.TYPE_COUNT);
}

var getRandomRooms = function () {
  return ceilRandom(ADS.MAX_ROOMS);
}

var getRandomGuests = function () {
  return ceilRandom(ADS.MAX_GUESTS);
}

var getRandomCheckin = function () {
  return ADS.CHECKINS[ceilRandom(3)];
}

var getRandomCheckOut = function () {
  return ADS.CHECKOUTS[ceilRandom(3)];
}

var getRandomFeatures = function () {
  var allFeatures = '';
  var b = [];
  var featuresCount = ceilRandom(ADS.MAX_FEATURES);
  for (var i = 0; i < featuresCount; i++) {
    b[i] = ADS.FEATURES[ceilRandom(ADS.MAX_FEATURES)];
    // alert(b[i])
    // alert(i);
    allFeatures += b[i];
  }
  return allFeatures;
}

var getRandomDescription = function () {
  return ADS.CHECKOUTS[ceilRandom(3)];
}

var getRandomPhotos = function () {
  var allPhotos = '';
  for (var i = 1; i < ceilRandom(ADS.MAX_FEATURES); i++) {
    allPhotos = allPhotos + ADS.PHOTOS[ceilRandom(ADS.MAX_PHOTOS)] + ',';
  }
  return ADS.CHECKOUTS[ceilRandom(3)];
}

var getRandomDescription = function () {
  return'';
}

var getRandomPhotos = function () {
  return'';
}

  var generateAd = function (addNumber) {
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + addNumber + '.png'
      },
      offer: {
        title: getRandomTitle(),
        address: getRandomAddress(), // getRandomArrayElement(TITLES)
        price: getRandomPrice(),
        type: getRandomType(),
        rooms: getRandomRooms(),
        guests: getRandomGuests(),
        checkin: getRandomCheckin(),
        checkout: getRandomCheckOut(),
        features: getRandomFeatures(),
        description: getRandomDescription(),
        photos: getRandomPhotos()
      },
      location: {
        x: 0,
        y:0
      }
    }
    return ad;
  };

var myAds = []

var generateAds = function () {
  for (var i = 1; i < ADS_COUNT; i++) {
      myAds.push(generateAd(i));
  };
};

generateAds();
console.log(myAds);
