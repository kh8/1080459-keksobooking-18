'use strict';

(function () {
  var setElemsDisabled = function (DOMElements, isDisabled) {
    DOMElements.forEach(function (element) {
      element.disabled = isDisabled;
    });
  };

  window.utils = {
    setElemsDisabled: setElemsDisabled
  };

})();
