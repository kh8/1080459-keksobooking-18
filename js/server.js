'use strict';

(function () {
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

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка загрузки объявления');
    });

    xhr.addEventListener('timeout', function () {
      onError('Загрузка не успела выполниться за ' + xhr.timeout + 'мс');
    });

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

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка отправки объявления');
    });

    xhr.addEventListener('timeout', function () {
      onError('Отправка не успела выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', url);
    xhr.send(data);
  };

  window.server = {
    loadAds: loadAds,
    uploadAd: uploadAd
  };

})();
