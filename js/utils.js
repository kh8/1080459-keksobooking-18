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

  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = getCeilRandom(i);
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };
  var removeChilds = function (node) {
    if (node) {
      node.forEach(function (element) {
        node.removeChild(element);
      });
    }
  };

  window.utils = {
    setElemsDisabled: setElemsDisabled,
    getCeilRandom: getCeilRandom,
    getCeilRandomFromInterval: getCeilRandomFromInterval,
    getRandomElementFromArray: getRandomElementFromArray,
    shuffleArray: shuffleArray,
    removeChilds: removeChilds
  };

})();
