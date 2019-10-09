'use strict';

(function () {

  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var makePin = function (ad) {
    var pin = similarPinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');
    var openPopup = function () {
      window.map.openCard(ad);
    };

    pin.style.left = ad.location.x + 'px';
    pin.style.top = ad.location.y + 'px';
    pinImage.src = ad.author.avatar;
    pinImage.alt = ad.offer.title;

    pin.addEventListener('click', openPopup);
    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.keycodes.ENTER_KEYCODE) {
        window.map.openCard(ad);
      }
    });
    return pin;
  };

  window.pin = {
    make: makePin
  };

})();
