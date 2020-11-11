"use strict";

const mainBlock = document.querySelector(`main`);
const formBlock = document.querySelector(`.ad-form`);
const formReset = formBlock.querySelector(`.ad-form__reset`);
const formFieldset = formBlock.querySelectorAll(`fieldset`);
const formFieldTitle = formBlock.querySelector(`#title`);
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const formFieldAdress = formBlock.querySelector(`#address`);
const formFieldType = formBlock.querySelector(`#type`);
const formFieldPrice = formBlock.querySelector(`#price`);
const MAX_PRICE = 1000000;
const TYPE_PRICE = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
const formFieldTimeIn = formBlock.querySelector(`#timein`);
const formFieldTimeOut = formBlock.querySelector(`#timeout`);
const formFieldRooms = formBlock.querySelector(`#room_number`);
const formFieldGuests = formBlock.querySelector(`#capacity`);

const disableFieldset = function (items) {
  items.forEach(function (element) {
    element.setAttribute(`disabled`, true);
  });
};
const activateFieldset = function (items) {
  items.forEach(function (element) {
    element.removeAttribute(`disabled`);
  });
};

const activateForm = function () {
  activateFieldset(window.map.filters);
  activateFieldset(formFieldset);
  formBlock.classList.remove(`ad-form--disabled`);
  formFieldAdress.value = window.map.mainPinX + `, ` + (window.map.mainPinY + window.map.mainPinOffset);
  formFieldAdress.setAttribute(`readonly`, true);
};

const disableForm = function () {
  disableFieldset(window.map.filters);
  disableFieldset(formFieldset);
  formBlock.classList.add(`ad-form--disabled`);
  formBlock.reset();
  formFieldAdress.value = window.map.mainPinX + `, ` + (window.map.mainPinY + window.map.mainPinOffset);
};

const validateTitle = function () {
  let titleLength = formFieldTitle.value.length;
  if (titleLength === 0) {
    formFieldTitle.setCustomValidity(`Обязательное поле`);
  } else if (titleLength < MIN_TITLE_LENGTH) {
    formFieldTitle.setCustomValidity(`Ещё ` + (MIN_TITLE_LENGTH - titleLength) + ` симв.`);
  } else if (titleLength > MAX_TITLE_LENGTH) {
    formFieldTitle.setCustomValidity(`Удалите лишние ` + (titleLength - MAX_TITLE_LENGTH) + ` симв.`);
  } else {
    formFieldTitle.setCustomValidity(``);
  }
};

const validateMaxPrice = function () {
  if (formFieldPrice.value > MAX_PRICE) {
    formFieldPrice.setCustomValidity(`Слишком большая стоимость`);
  } else {
    formFieldPrice.setCustomValidity(``);
  }
};
const validatePriceOfType = function () {
  formFieldPrice.placeholder = TYPE_PRICE[formFieldType.value];
  formFieldPrice.setAttribute(`min`, TYPE_PRICE[formFieldType.value]);
};

const removeSelection = function (items) {
  items.forEach(function (element) {
    element.removeAttribute(`selected`);
  });
};

const validateTimeIn = function () {
  let timeOutOptions = formFieldTimeOut.querySelectorAll(`option`);
  removeSelection(timeOutOptions);
  timeOutOptions[formFieldTimeIn.selectedIndex].setAttribute(`selected`, true);
};
const validateTimeOut = function () {
  let timeInOptions = formFieldTimeIn.querySelectorAll(`option`);
  removeSelection(timeInOptions);
  timeInOptions[formFieldTimeOut.selectedIndex].setAttribute(`selected`, true);
};

const validatesRoomAndGuest = function () {
  if (Number(formFieldRooms.value) === 100 && Number(formFieldGuests.value) !== 0) {
    formFieldGuests.setCustomValidity(`Выбрано помещение не для гостей. Пожалуйста, измените свой выбор`);
  } else if (Number(formFieldGuests.value) === 0 && Number(formFieldRooms.value) !== 100) {
    formFieldRooms.setCustomValidity(`Выбрано помещение не для гостей. Пожалуйста, выберите максимальное кол-во комнат`);
  } else if (Number(formFieldRooms.value) < Number(formFieldGuests.value)) {
    formFieldRooms.setCustomValidity(`Слишком много гостей для этого помещения. Пожалуйста, выберите больше комнат`);
  } else {
    formFieldRooms.setCustomValidity(``);
    formFieldGuests.setCustomValidity(``);
  }
};

const renderSuccess = function () {
  const onSuccessTemplate = document.querySelector(`#success`)
    .content
    .querySelector(`.success`);
  let onSuccess = onSuccessTemplate.cloneNode(true);
  mainBlock.appendChild(onSuccess);
  const onSuccessClick = function () {
    onSuccess.remove();
    window.preview.reset();
    document.removeEventListener(`keydown`, onSuccessPressEsc);
  };

  const onSuccessPressEsc = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      onSuccessClick();
    }
  };
  const toCloseSuccsess = function () {
    onSuccess.addEventListener(`click`, onSuccessClick);
    document.addEventListener(`keydown`, onSuccessPressEsc);
  };
  toCloseSuccsess();
  window.main.disable();
};
const renderError = function () {
  const onErrorTemplate = document.querySelector(`#error`)
    .content
    .querySelector(`.error`);
  let onError = onErrorTemplate.cloneNode(true);
  mainBlock.appendChild(onError);
  const onErrorClick = function () {
    onError.remove();
    window.preview.reset();
    document.removeEventListener(`keydown`, onErrorPressEsc);
  };
  const onErrorPressEsc = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      onErrorClick();
    }
  };
  let onErrorButton = onError.querySelector(`.error__button`);
  const toCloseError = function () {
    onErrorButton.addEventListener(`click`, onErrorClick);
    onError.addEventListener(`click`, onErrorClick);
    document.addEventListener(`keydown`, onErrorPressEsc);
  };
  toCloseError();
};

const onResetClick = function (evt) {
  evt.preventDefault();
  window.preview.reset();
  window.main.disable();
};

const onSubmitClick = function (evt) {
  evt.preventDefault();
  window.backend.load(window.backend.method.POST, window.backend.url.UPLOAD, renderSuccess, renderError, new FormData(formBlock));
};

const validatesForm = function () {
  formFieldTitle.addEventListener(`input`, function () {
    validateTitle();
  });
  formFieldPrice.addEventListener(`input`, function () {
    validateMaxPrice();
  });
  formFieldType.addEventListener(`input`, function () {
    validatePriceOfType();
  });
  formFieldTimeIn.addEventListener(`change`, function () {
    validateTimeIn();
  });
  formFieldTimeOut.addEventListener(`change`, function () {
    validateTimeOut();
  });
  formFieldGuests.addEventListener(`change`, function () {
    validatesRoomAndGuest();
  });
  formFieldRooms.addEventListener(`change`, function () {
    validatesRoomAndGuest();
  });
  formBlock.addEventListener(`submit`, onSubmitClick);
  formReset.addEventListener(`click`, onResetClick);
};
window.form = {
  block: formBlock,
  address: formFieldAdress,
  activate: activateForm,
  disable: disableForm,
  validate: validatesForm,
  validateRoom: validatesRoomAndGuest,
  validatePrice: validatePriceOfType,
  onSuccess: renderSuccess,
  onError: renderError
};
