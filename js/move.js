"use strict";

(function () {
  window.map.mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.which === 1) {
      evt.preventDefault();
      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      let dragged = false;

      let onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;
        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY,
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        if (startCoords.y < window.data.mapHeightMin) {
          window.map.mainPin.style.top = window.data.mapHeightMin - window.pin.pinHeight + `px`;
        }
        if (startCoords.y > window.data.mapHeightMax) {
          window.map.mainPin.style.top = window.data.mapHeightMax + `px`;
        }
        if (startCoords.x < `0`) {
          window.map.mainPin.style.left = 0 - window.pin.pinWidth / 2 + `px`;
        }
        if (startCoords.x > window.data.mapWidth) {
          window.map.mainPin.style.left = window.data.mapWidth - window.pin.pinWidth / 2 + `px`;
        }
        window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + `px`;
        window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + `px`;
      };

      let onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
        if (dragged) {
          window.form.address.value = startCoords.x + `, ` + (startCoords.y + window.map.mainPinOffset);
        }
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  });
})();
