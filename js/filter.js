'use strict';

(function () {
  var filtersContainer = document.querySelector('.map__filters-container');
  var typeFilter = filtersContainer.querySelector('#housing-type');
  var priceFilter = filtersContainer.querySelector('#housing-price');
  var roomsFilter = filtersContainer.querySelector('#housing-rooms');
  var guestsFilter = filtersContainer.querySelector('#housing-guests');
  var featuresContainer = filtersContainer.querySelector('.map__features');
  var features = featuresContainer.querySelectorAll('.map__checkbox');

  var filterByType = function (ads) {
    return typeFilter.value === 'any' ? ads : ads.filter(function (ad) {
      return typeFilter.value === ad.offer.type;
    });
  };

  var filterByPrice = function (ads) {
    return priceFilter.value === 'any' ? ads : ads.filter(function (ad) {
      switch (priceFilter.value) {
        case 'low':
          return ad.offer.price < window.constants.filterOptions.LOW_PRICE;
        case 'high':
          return ad.offer.price >= window.constants.filterOptions.HIGH_PRICE;
        case 'middle':
          return (ad.offer.price >= window.constants.filterOptions.LOW_PRICE) && (ad.offer.price <= window.constants.filterOptions.HIGH_PRICE);
        default:
          return true;
      }
    });
  };

  var filterByRooms = function (ads) {
    return roomsFilter.value === 'any' ? ads : ads.filter(function (ad) {
      return roomsFilter.value === ad.offer.rooms + '';
    });
  };

  var filterByGuests = function (ads) {
    return guestsFilter.value === 'any' ? ads : ads.filter(function (ad) {
      return guestsFilter.value === ad.offer.guests + '';
    });
  };

  var filterByFeature = function (ads, checkbox) {
    return checkbox.checked === false ? ads : ads.filter(function (ad) {
      return ad.offer.features.indexOf(checkbox.value) !== -1;
    });
  };

  var filterByFeatures = function (ads) {
    var filteredAds = ads;
    features.forEach(function (element) {
      filteredAds = filterByFeature(filteredAds, element);
    });
    return filteredAds;
  };

  var filterByAll = function (ads) {
    var filteredAds = filterByGuests(ads, guestsFilter);
    filteredAds = filterByRooms(filteredAds);
    filteredAds = filterByPrice(filteredAds);
    filteredAds = filterByType(filteredAds);
    filteredAds = filterByFeatures(filteredAds);
    return filteredAds;
  };

  window.filter = {
    filterByAll: filterByAll
  };
})();
