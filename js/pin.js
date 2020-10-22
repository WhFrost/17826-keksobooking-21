"use strict";

(function () {
  const MAP_PINS = document.querySelector(`.map__pins`);
  const PIN_TEMPLATE = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
  const renderPin = function (obj) {
    let pin = PIN_TEMPLATE.cloneNode(true);
    MAP_PINS.appendChild(pin);
    pin.style.left = obj.location.x + PIN_TEMPLATE.offsetWidth / 2 + `px`;
    pin.style.top = obj.location.y + PIN_TEMPLATE.offsetHeight + `px`;
    pin.querySelector(`img`).src = obj.author.avatar;
    pin.querySelector(`img`).alt = obj.offer.title;
  };
  const clickToPin = function (obj) {
    let pins = window.pin.mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let i = 0; i < pins.length; i++) {
      pins[i].addEventListener(`click`, function () {
        window.card.card(obj[i]);
      });
    }
  };
  window.pin = {
    mapPins: MAP_PINS,
    pins: renderPin,
    clickPin: clickToPin
  };
})();
