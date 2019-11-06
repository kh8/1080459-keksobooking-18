'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var photoTemplate = cardTemplate.querySelector('.popup__photo');
  var currentCard = cardTemplate.cloneNode(true);
  var cardCloseBtn = currentCard.querySelector('.popup__close');

  var removeCard = function () {
    currentCard.remove();
  };

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

  var onCardCloseBtnClick = function () {
    removeCard();
  };

  var onCardCloseEscPress = function (evt) {
    if (evt.keyCode === window.constants.keycodes.ESC_KEYCODE) {
      removeCard();
      document.removeEventListener('keydown', onCardCloseEscPress);
    }
  };

  var renderCard = function (ad, container, beforeContainer) {
    currentCard.querySelector('.popup__title').textContent = ad.offer.title;
    currentCard.querySelector('.popup__text--address').textContent = ad.offer.address;
    currentCard.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    currentCard.querySelector('.popup__type').textContent = window.constants.translateOfferType[ad.offer.type];
    currentCard.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    currentCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    currentCard.querySelector('.popup__features').textContent = ad.offer.features;
    currentCard.querySelector('.popup__description').textContent = ad.offer.description;
    currentCard.querySelector('.popup__avatar').src = ad.author.avatar;
    currentCard.querySelector('.popup__photos').innerHTML = '';
    currentCard.querySelector('.popup__photos').appendChild(makePhotosFragment(ad.offer.photos));
    cardCloseBtn.addEventListener('click', onCardCloseBtnClick);
    document.addEventListener('keydown', onCardCloseEscPress);
    container.insertBefore(currentCard, beforeContainer);
  };

  window.card = {
    render: renderCard,
    remove: removeCard
  };

})();

