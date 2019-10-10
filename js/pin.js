'use strict';

(function () {

  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var makePin = function (ad, container, beforeContainer) {
    var onPinClick = function () {
      window.card.show(ad, container, beforeContainer);
    };

    var onPinKeydown = function (evt) {
      if (evt.keyCode === window.constants.keycodes.ENTER_KEYCODE) {
        window.card.show(ad, container, beforeContainer);
      }
    };

    var pin = similarPinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');
    pin.style.left = ad.location.x + 'px';
    pin.style.top = ad.location.y + 'px';
    pinImage.src = ad.author.avatar;
    pinImage.alt = ad.offer.title;

    pin.addEventListener('click', onPinClick);
    pin.addEventListener('keydown', onPinKeydown);

    return pin;
  };

  window.pin = {
    make: makePin
  };

})();
