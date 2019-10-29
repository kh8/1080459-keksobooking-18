'use strict';

(function () {
  var setElemsDisabled = function (DOMElements, isDisabled) {
    DOMElements.forEach(function (element) {
      element.disabled = isDisabled;
    });
  };

  var getCeilRandom = function (max) {
    return Math.floor(Math.random() * max) + 1;
  };

  var getCeilRandomFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomElementFromArray = function (array) {
    return array[getCeilRandomFromInterval(0, array.length)];
  };

  var debounce = function (cb) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, window.constants.DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    setElemsDisabled: setElemsDisabled,
    getCeilRandom: getCeilRandom,
    getCeilRandomFromInterval: getCeilRandomFromInterval,
    getRandomElementFromArray: getRandomElementFromArray,
    debounce: debounce
  };

})();
