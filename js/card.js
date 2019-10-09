'use strict';

(function () {

  var translateOfferType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var photoTemplate = cardTemplate.querySelector('.popup__photo');

  var makePhoto = function (photoSrc) {
    var photo = photoTemplate.cloneNode(true);
    photo.src = photoSrc;
    return photo;
  };

  var makePhotosFragment = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (element) {
      fragment.appendChild(makePhoto(element));
    });
    return fragment;
  };

  var makeCard = function (ad) {
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = translateOfferType[ad.offer.type];
    card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    card.querySelector('.popup__features').textContent = ad.offer.features;
    card.querySelector('.popup__description').textContent = ad.offer.description;
    card.querySelector('.popup__avatar').src = ad.author.avatar;
    card.querySelector('.popup__photos').innerHTML = '';
    card.querySelector('.popup__photos').appendChild(makePhotosFragment(ad.offer.photos));
    var closePopup = function () {
      window.map.closeCard(card);
    };
    var onPopupEscPress = function (evt) {
      if (evt.keyCode === window.constants.keycodes.ESC_KEYCODE) {
        window.map.closeCard(card);
      }
    };
    var popupClose = card.querySelector('.popup__close');
    popupClose.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscPress);
    return card;
  };

  window.card = {
    make: makeCard
  };

})();

