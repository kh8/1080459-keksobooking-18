'use strict';

(function () {
  var addErrorListeners = function (obj, errorFunc) {
    obj.addEventListener('error', function () {
      errorFunc('Произошла ошибка соединения');
    });
    obj.addEventListener('timeout', function () {
      errorFunc('Запрос не успел выполниться за ' + obj.timeout + 'мс');
    });
  };

  var loadAds = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = window.constants.LOAD_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    addErrorListeners(xhr, onError);
    xhr.open('GET', url);
    xhr.send();
  };

  var uploadAd = function (url, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = window.constants.LOAD_TIMEOUT;

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    addErrorListeners(xhr, onError);
    xhr.open('POST', url);
    xhr.send(data);
  };

  window.server = {
    loadAds: loadAds,
    uploadAd: uploadAd
  };

})();
