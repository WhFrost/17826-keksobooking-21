"use strict";

(function () {
  const MAP = document.querySelector(`.map`);
  const MAP_WIDTH = document.querySelector(`.map`).offsetWidth;
  const MIN_LOCATION_Y = 130;
  const MAX_LOCATION_Y = 630;
  const MAP_FILTERS = document.querySelectorAll(`.map__filter`);
  const MAP_MAIN_PIN = document.querySelector(`.map__pin--main`);
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 65;
  const MAIN_PIN_X = Math.round(MAIN_PIN_WIDTH / 2 + MAP_MAIN_PIN.offsetLeft);
  const MAIN_PIN_Y = Math.round(MAIN_PIN_HEIGHT / 2 + MAP_MAIN_PIN.offsetTop);
  const MAIN_PIN_OFFSET_Y = Math.round(MAIN_PIN_HEIGHT / 2 + 19);

  const MAP_PINS = document.querySelector(`.map__pins`);
  const PIN_TEMPLATE = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

  const renderPins = function () {
    for (let i = 0; i < window.data.offerCount; i++) {
      const renderPin = function (obj) {
        let pin = PIN_TEMPLATE.cloneNode(true);
        MAP_PINS.appendChild(pin);
        pin.style.left = obj[i].location.x + PIN_TEMPLATE.offsetWidth / 2 + `px`;
        pin.style.top = obj[i].location.y + PIN_TEMPLATE.offsetHeight + `px`;
        pin.querySelector(`img`).src = obj[i].author.avatar;
        pin.querySelector(`img`).alt = obj[i].offer.title;
      };
      window.load(window.backend.method.get, window.backend.url.download, renderPin, function () {});
    }
  };
  const onMainPinClick = function (evt) {
    if (evt.which === 1 || evt.key === `Enter`) {
      window.main.activate();
      window.form.validateForm();
      window.form.validatePrice();
      window.form.validateRoom();
      MAP_MAIN_PIN.removeEventListener(`mousedown`, onMainPinClick);
      MAP_MAIN_PIN.removeEventListener(`keydown`, onMainPinClick);
    }
  };
  MAP_MAIN_PIN.addEventListener(`mousedown`, onMainPinClick);
  MAP_MAIN_PIN.addEventListener(`keydown`, onMainPinClick);
  window.map = {
    map: MAP,
    mapWidth: MAP_WIDTH,
    mapHeightMin: MIN_LOCATION_Y,
    mapHeightMax: MAX_LOCATION_Y,
    filters: MAP_FILTERS,
    mainPin: MAP_MAIN_PIN,
    mainPinX: MAIN_PIN_X,
    mainPinY: MAIN_PIN_Y,
    mainPinWidth: MAIN_PIN_WIDTH,
    mainPinHeight: MAIN_PIN_HEIGHT,
    mainPinOffset: MAIN_PIN_OFFSET_Y,
    pinsOnMap: renderPins
  };
})();
