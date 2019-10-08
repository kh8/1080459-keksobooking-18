'use strict';

(function () {

  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var makePin = function (ad) {
    var pin = similarPinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');
    var openPopup = function () {
      var lastMapCard = window.map.mapElement.querySelector('.map__card');
      if (lastMapCard) {
        window.map.mapElement.replaceChild(window.card.make(ad), lastMapCard);
      } else {
        window.map.mapElement.insertBefore(window.card.make(ad), window.mapFiltersContainer);
      }
    };

    pin.style.left = ad.location.x + 'px';
    pin.style.top = ad.location.y + 'px';
    pinImage.src = ad.author.avatar;
    pinImage.alt = ad.offer.title;
    pin.addEventListener('click', openPopup);
    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.keycodes.ENTER_KEYCODE) {
        openPopup();
      }
    });
    return pin;
  };

  window.pin = {
    make: makePin
  };

})();
