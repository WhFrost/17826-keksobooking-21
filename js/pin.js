"use strict";

(function () {
  const MAP_PINS = document.querySelector(`.map__pins`);

  const clickToPin = function (obj) {
    let pins = MAP_PINS.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let i = 0; i < pins.length; i++) {
      pins[i].addEventListener(`click`, function () {
        window.card.card(obj[i]);
      });
    }
  };
  window.pin = {
    clickPin: clickToPin
  };
})();
