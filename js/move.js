"use strict";

(function () {
  window.map.mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.which === 1) {
      evt.preventDefault();
      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      let onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        let newCoords = {
          x: startCoords.x - window.map.map.offsetLeft,
          y: startCoords.y - window.map.map.offsetTop
        };
        if (newCoords.y <= window.data.mapHeightMin) {
          newCoords.y = window.data.mapHeightMin - window.pin.pinHeight;
        }
        if (newCoords.y >= window.data.mapHeightMax) {
          newCoords.y = window.data.mapHeightMax;
        }
        if (newCoords.x <= 0) {
          newCoords.x = 0;
        }
        if (newCoords.x >= window.data.mapWidth) {
          newCoords.x = window.data.mapWidth;
        }
        window.map.mainPin.style.top = newCoords.y + `px`;
        window.map.mainPin.style.left = newCoords.x - window.pin.pinWidth / 2 + `px`;
        window.form.address.value = newCoords.x + `, ` + (newCoords.y + window.map.mainPinOffset);
      };

      let onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  });
})();
