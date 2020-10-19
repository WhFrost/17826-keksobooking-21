"use strict";

(function () {
  const MAP = document.querySelector(`.map`);
  const renderPins = function () {
    for (let i = 0; i < window.data.offerCount; i++) {
      window.pin.pins(window.data.offersList[i]);
    }
  };
  window.map = {
    map: MAP,
    pinsOnMap: renderPins
  };
})();
