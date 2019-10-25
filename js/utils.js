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

  window.utils = {
    setElemsDisabled: setElemsDisabled,
    getCeilRandom: getCeilRandom,
    getCeilRandomFromInterval: getCeilRandomFromInterval,
    getRandomElementFromArray: getRandomElementFromArray,
  };

})();
