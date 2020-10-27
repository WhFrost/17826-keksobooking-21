"use strict";

(function () {
  const METHOD = {
    get: `GET`,
    post: `POST`
  };
  const URL = {
    download: `https://21.javascript.pages.academy/keksobooking/data`,
    upload: `https://21.javascript.pages.academy/keksobooking`
  };
  const TIMEOUT = 10000;
  window.load = function (method, url, onSuccess, onError, data) {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = `Неверный запрос`;
          break;
        case 404:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  };
  window.backend = {
    method: METHOD,
    url: URL
  };
})();
