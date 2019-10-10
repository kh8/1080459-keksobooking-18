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

  var showCard = function (currentAd, container, beforeElement) {
    var makeCard = function (ad) {
      var card = cardTemplate.cloneNode(true);
      var cardCloseBtn = card.querySelector('.popup__close');

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

      var onCardCloseBtnClick = function () {
        container.removeChild(card);
      };

      var onCardCloseEscPress = function (evt) {
        if (evt.keyCode === window.constants.keycodes.ESC_KEYCODE) {
          container.removeChild(card);
        }
      };

      cardCloseBtn.addEventListener('click', onCardCloseBtnClick);
      document.addEventListener('keydown', onCardCloseEscPress);
      return card;
    };
    var lastCard = container.querySelector('.map__card');
    var currentCard = makeCard(currentAd);
    if (lastCard) {
      container.replaceChild(currentCard, lastCard);
    } else {
      container.insertBefore(currentCard, beforeElement);
    }
  };

  window.card = {
    show: showCard,
  };

})();

