'use strict';

(function () {

  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var makePin = function (ad) {
    var pin = similarPinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');
    pin.style.left = ad.location.x + 'px';
    pin.style.top = ad.location.y + 'px';
    pinImage.src = ad.author.avatar;
    pinImage.alt = ad.offer.title;
    return pin;
  };

  window.pin = {
    make: makePin
  };

})();
