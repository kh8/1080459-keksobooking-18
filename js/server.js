'use strict';

(function () {
  var SERVER_OK = 200;

  var initXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = window.constants.LOAD_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === SERVER_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var loadAds = function (url, onSuccess, onError) {
    var xhr = initXHR(onSuccess, onError);
    xhr.open('GET', url);
    xhr.send();
  };

  var uploadAd = function (url, data, onSuccess, onError) {
    var xhr = initXHR(onSuccess, onError);
    xhr.open('POST', url);
    xhr.send(data);
  };

  window.server = {
    loadAds: loadAds,
    uploadAd: uploadAd
  };

})();
