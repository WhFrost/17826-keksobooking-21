"use strict";

(function () {
  const MAIN = document.querySelector(`main`);
  const FORM = document.querySelector(`.ad-form`);
  const FORM_FIELDSET = FORM.querySelectorAll(`fieldset`);
  const FORM_FIELD_TITLE = FORM.querySelector(`#title`);
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const FORM_FIELD_ADDRESS = FORM.querySelector(`#address`);
  const FORM_FIELD_TYPE = FORM.querySelector(`#type`);
  const FORM_FIELD_PRICE = FORM.querySelector(`#price`);
  const MAX_PRICE = 1000000;
  const TYPE_PRICE = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  const FORM_FIELD_TIME_IN = FORM.querySelector(`#timein`);
  const FORM_FIELD_TIME_OUT = FORM.querySelector(`#timeout`);
  const FORM_FIELD_ROOMS = FORM.querySelector(`#room_number`);
  const FORM_FIELD_GUESTS = FORM.querySelector(`#capacity`);

  // Валидация заголовка
  const validateTitle = function () {
    let titleLength = FORM_FIELD_TITLE.value.length;
    if (titleLength === 0) {
      FORM_FIELD_TITLE.setCustomValidity(`Обязательное поле`);
    } else if (titleLength < MIN_TITLE_LENGTH) {
      FORM_FIELD_TITLE.setCustomValidity(`Ещё ` + (MIN_TITLE_LENGTH - titleLength) + ` симв.`);
    } else if (titleLength > MAX_TITLE_LENGTH) {
      FORM_FIELD_TITLE.setCustomValidity(`Удалите лишние ` + (titleLength - MAX_TITLE_LENGTH) + ` симв.`);
    } else {
      FORM_FIELD_TITLE.setCustomValidity(``);
    }
  };

  // Валидация цены за ночь
  const validateMaxPrice = function () {
    if (FORM_FIELD_PRICE.value > MAX_PRICE) {
      FORM_FIELD_PRICE.setCustomValidity(`Слишком большая стоимость`);
    } else {
      FORM_FIELD_PRICE.setCustomValidity(``);
    }
  };
  const validatePriceOfType = function () {
    FORM_FIELD_PRICE.placeholder = TYPE_PRICE[FORM_FIELD_TYPE.value];
    FORM_FIELD_PRICE.setAttribute(`min`, TYPE_PRICE[FORM_FIELD_TYPE.value]);
  };

  // Валидация времени заезда и выезда
  const validateTimeIn = function () {
    let timeOutOptions = FORM_FIELD_TIME_OUT.querySelectorAll(`option`);
    for (let i = 0; i < timeOutOptions.length; i++) {
      timeOutOptions[i].removeAttribute(`selected`);
    }
    timeOutOptions[FORM_FIELD_TIME_IN.selectedIndex].setAttribute(`selected`, true);
  };
  const validateTimeOut = function () {
    let timeInOptions = FORM_FIELD_TIME_IN.querySelectorAll(`option`);
    for (let i = 0; i < timeInOptions.length; i++) {
      timeInOptions[i].removeAttribute(`selected`);
    }
    timeInOptions[FORM_FIELD_TIME_OUT.selectedIndex].setAttribute(`selected`, true);
  };

  // Валидация кол-ва гостей и комнат
  const validatesRoomAndGuest = function () {
    if (Number(FORM_FIELD_ROOMS.value) === 100 && Number(FORM_FIELD_GUESTS.value) !== 0) {
      FORM_FIELD_GUESTS.setCustomValidity(`Выбрано помещение не для гостей. Пожалуйста, измените свой выбор`);
    } else if (Number(FORM_FIELD_GUESTS.value) === 0 && Number(FORM_FIELD_ROOMS.value) !== 100) {
      FORM_FIELD_ROOMS.setCustomValidity(`Выбрано помещение не для гостей. Пожалуйста, выберите максимальное кол-во комнат`);
    } else if (Number(FORM_FIELD_ROOMS.value) < Number(FORM_FIELD_GUESTS.value)) {
      FORM_FIELD_ROOMS.setCustomValidity(`Слишком много гостей для этого помещения. Пожалуйста, выберите больше комнат`);
    } else {
      FORM_FIELD_ROOMS.setCustomValidity(``);
      FORM_FIELD_GUESTS.setCustomValidity(``);
    }
  };

  const renderSuccess = function () {
    const onSuccessTemplate = document.querySelector(`#success`)
    .content
    .querySelector(`.success`);
    let onSuccess = onSuccessTemplate.cloneNode(true);
    MAIN.appendChild(onSuccess);
    const removeSuccess = function () {
      onSuccess.remove();
      document.removeEventListener(`keydown`, removeSuccessEsc);
    };

    const removeSuccessEsc = function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        removeSuccess();
      }
    };
    const toCloseSuccsess = function () {
      onSuccess.addEventListener(`click`, removeSuccess);
      document.addEventListener(`keydown`, removeSuccessEsc);
    };
    toCloseSuccsess();
  };
  const renderError = function () {
    const onErrorTemplate = document.querySelector(`#error`)
    .content
    .querySelector(`.error`);
    let onError = onErrorTemplate.cloneNode(true);
    MAIN.appendChild(onError);
    const removeError = function () {
      onError.remove();
      document.removeEventListener(`keydown`, removeErrorEsc);
    };
    const removeErrorEsc = function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        removeError();
      }
    };
    const toCloseSuccsess = function () {
      onError.addEventListener(`click`, removeError);
      document.addEventListener(`keydown`, removeErrorEsc);
    };
    toCloseSuccsess();
  };

  const uploadForm = function (evt) {
    evt.preventDefault();
    window.load(window.backend.method.post, window.backend.url.upload, renderSuccess, renderError, new FormData(FORM));
  };

  const validatesForm = function () {
    FORM_FIELD_TITLE.addEventListener(`input`, function () {
      validateTitle();
    });
    FORM_FIELD_PRICE.addEventListener(`input`, function () {
      validateMaxPrice();
    });
    FORM_FIELD_TYPE.addEventListener(`input`, function () {
      validatePriceOfType();
    });
    FORM_FIELD_TIME_IN.addEventListener(`change`, function () {
      validateTimeIn();
    });
    FORM_FIELD_TIME_OUT.addEventListener(`change`, function () {
      validateTimeOut();
    });
    FORM_FIELD_GUESTS.addEventListener(`change`, function () {
      validatesRoomAndGuest();
    });
    FORM_FIELD_ROOMS.addEventListener(`change`, function () {
      validatesRoomAndGuest();
    });
    FORM.addEventListener(`submit`, uploadForm);
  };
  window.form = {
    form: FORM,
    fieldset: FORM_FIELDSET,
    address: FORM_FIELD_ADDRESS,
    validateForm: validatesForm,
    validateRoom: validatesRoomAndGuest,
    validatePrice: validatePriceOfType,
    onSuccess: renderSuccess,
    onError: renderError
  };
})();
