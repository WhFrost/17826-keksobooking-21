"use strict";

const mapBlock = document.querySelector(`.map`);
const mapBlockWidth = document.querySelector(`.map`).offsetWidth;
const MIN_LOCATION_Y = 130;
const MAX_LOCATION_Y = 630;
const mapFilters = document.querySelectorAll(`.map__filter`);
const mapMainPin = document.querySelector(`.map__pin--main`);
const MAIN_PIN_DEFAULT_POSITION_X = 570;
const MAIN_PIN_DEFAULT_POSITION_Y = 375;
const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT = 65;
const MAIN_PIN_X = Math.round(MAIN_PIN_WIDTH / 2 + mapMainPin.offsetLeft);
const MAIN_PIN_Y = Math.round(MAIN_PIN_HEIGHT / 2 + mapMainPin.offsetTop);
const MAIN_PIN_OFFSET_Y = Math.round(MAIN_PIN_HEIGHT / 2 + 19);

const mapPins = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

const renderPins = function (obj) {
  for (let i = 0; i < window.data.offersCount; i++) {
    let pin = pinTemplate.cloneNode(true);
    mapPins.appendChild(pin);
    pin.style.left = obj[i].location.x + pinTemplate.offsetWidth / 2 + `px`;
    pin.style.top = obj[i].location.y + pinTemplate.offsetHeight + `px`;
    pin.querySelector(`img`).src = obj[i].author.avatar;
    pin.querySelector(`img`).alt = obj[i].offer.title;
  }
  let pins = mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  for (let i = 0; i < window.data.offersCount; i++) {
    pins[i].addEventListener(`click`, function () {
      for (let j = 0; j < window.data.offersCount; j++) {
        if (pins[j].classList.contains(`map__pin--active`)) {
          pins[j].classList.remove(`map__pin--active`);
        }
      }
      pins[i].classList.add(`map__pin--active`);
      window.card.get(obj[i]);
    });
  }
};

const removePinsOnMap = function () {
  let pins = mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  if (pins) {
    for (let i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  }
};
const onMainPinClick = function (evt) {
  if (evt.which === 1 || evt.key === `Enter`) {
    window.main.activate();
    window.form.validate();
    window.form.validatePrice();
    window.form.validateRoom();
    mapMainPin.removeEventListener(`mousedown`, onMainPinClick);
    mapMainPin.removeEventListener(`keydown`, onMainPinClick);
  }
};
const addEventMainPin = function () {
  mapMainPin.addEventListener(`mousedown`, onMainPinClick);
  mapMainPin.addEventListener(`keydown`, onMainPinClick);
};
addEventMainPin();

const disableMap = function () {
  mapBlock.classList.add(`map--faded`);
  removePinsOnMap();
  window.card.remove();
  mapMainPin.style = `left: ` + window.map.defaultMainPinX + `px;` + `top: ` + window.map.defaultMainPinY + `px;`;
  addEventMainPin();
};
const activateMap = function () {
  mapBlock.classList.remove(`map--faded`);
};

window.map = {
  block: mapBlock,
  activate: activateMap,
  disable: disableMap,
  blockWidth: mapBlockWidth,
  blockHeightMin: MIN_LOCATION_Y,
  blockHeightMax: MAX_LOCATION_Y,
  filters: mapFilters,
  mainPin: mapMainPin,
  defaultMainPinX: MAIN_PIN_DEFAULT_POSITION_X,
  defaultMainPinY: MAIN_PIN_DEFAULT_POSITION_Y,
  mainPinX: MAIN_PIN_X,
  mainPinY: MAIN_PIN_Y,
  mainPinWidth: MAIN_PIN_WIDTH,
  mainPinHeight: MAIN_PIN_HEIGHT,
  mainPinOffset: MAIN_PIN_OFFSET_Y,
  getPins: renderPins,
  removePins: removePinsOnMap
};
