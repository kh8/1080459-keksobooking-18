'use strict';

(function () {

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

  var onCardCloseBtnClick = function (evt) {
    evt.target.parentNode.parentNode.removeChild(evt.target.parentNode);
  };

  var onCardCloseEscPress = function (evt) {
    if (evt.keyCode === window.constants.keycodes.ESC_KEYCODE) {
      var card = document.querySelector('.map__card');
      card.parentNode.removeChild(card);
      document.removeEventListener('keydown', onCardCloseEscPress);
    }
  };

  var makeCard = function (ad) {
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = window.constants.translateOfferType[ad.offer.type];
    card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    card.querySelector('.popup__features').textContent = ad.offer.features;
    card.querySelector('.popup__description').textContent = ad.offer.description;
    card.querySelector('.popup__avatar').src = ad.author.avatar;
    card.querySelector('.popup__photos').innerHTML = '';
    card.querySelector('.popup__photos').appendChild(makePhotosFragment(ad.offer.photos));
    return card;
  };

  var insertCard = function (card, container, beforeElement) {
    var lastCard = container.querySelector('.map__card');
    if (lastCard) {
      container.replaceChild(card, lastCard);
    } else {
      container.insertBefore(card, beforeElement);
    }

    var cardCloseBtn = card.querySelector('.popup__close');
    cardCloseBtn.addEventListener('click', onCardCloseBtnClick);
    document.addEventListener('keydown', onCardCloseEscPress);
  };

  window.card = {
    make: makeCard,
    insert: insertCard,
  };

})();

