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
        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY,
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        let newCoords = {
          x: window.map.mainPin.offsetLeft - shift.x,
          y: window.map.mainPin.offsetTop - shift.y
        };
        if (newCoords.y <= window.data.mapHeightMin) {
          window.map.mainPin.style.top = window.data.mapHeightMin - window.pin.pinHeight + `px`;
        }
        if (newCoords.y >= window.data.mapHeightMax) {
          window.map.mainPin.style.top = window.data.mapHeightMax + `px`;
        }
        if (newCoords.x <= 0) {
          window.map.mainPin.style.left = 0 - window.pin.pinWidth / 2 + `px`;
        }
        if (newCoords.x >= window.data.mapWidth) {
          window.map.mainPin.style.left = window.data.mapWidth - window.pin.pinWidth / 2 + `px`;
        }
        console.log(`X: ` + newCoords.x + `, ` + `Y: ` + newCoords.y);
        window.map.mainPin.style.top = newCoords.y + `px`;
        window.map.mainPin.style.left = newCoords.x + `px`;
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
