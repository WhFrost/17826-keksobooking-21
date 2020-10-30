"use strict";

(function () {
  const MAP = document.querySelector(`.map`);
  const MAP_FILTERS = document.querySelectorAll(`.map__filter`);
  const MAP_MAIN_PIN = document.querySelector(`.map__pin--main`);
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 65;
  const MAIN_PIN_X = Math.round(MAIN_PIN_WIDTH / 2 + MAP_MAIN_PIN.offsetLeft);
  const MAIN_PIN_Y = Math.round(MAIN_PIN_HEIGHT / 2 + MAP_MAIN_PIN.offsetTop);
  const MAIN_PIN_OFFSET_Y = Math.round(MAIN_PIN_HEIGHT / 2 + 19);
  const renderPins = function () {
    for (let i = 0; i < window.data.offerCount; i++) {
      window.pin.pins(window.data.offersList[i]);
    }
  };
  const onMainPinClick = function (evt) {
    if (evt.which === 1 || evt.key === `Enter`) {
      window.main.activate();
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
