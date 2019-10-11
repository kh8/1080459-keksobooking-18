'use strict';

(function () {

  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var onPinClick = function (ad, container, beforeContainer) {
    window.card.insert(window.card.make(ad), container, beforeContainer);
  };

  var onPinKeydown = function (evt, ad, container, beforeContainer) {
    if (evt.keyCode === window.constants.keycodes.ENTER_KEYCODE) {
      window.card.insert(window.card.make(ad), container, beforeContainer);
    }
  };

  var makePin = function (ad, container, beforeContainer) {
    var pin = similarPinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');
    pin.style.left = ad.location.x + 'px';
    pin.style.top = ad.location.y + 'px';
    pinImage.src = ad.author.avatar;
    pinImage.alt = ad.offer.title;
    pin.addEventListener('click', function () {
      onPinClick(ad, container, beforeContainer);
    });
    pin.addEventListener('keydown', function () {
      onPinKeydown(ad, container, beforeContainer);
    });
    return pin;
  };

  var makePinsFragment = function (ads, container, beforeContainer) {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (element) {
      fragment.appendChild(makePin(element, container, beforeContainer));
    });
    return fragment;
  };

  window.pin = {
    make: makePin,
    makePinsFragment: makePinsFragment
  };

})();
