"use strict";
(function () {
  window.map.mainPin.addEventListener(`mousedown`, function (evt) {
    let minXPosition = 0 - (window.map.mainPinWidth / 2);
    let maxXPosition = window.map.blockWidth - (window.map.mainPinWidth / 2);
    let minYPosition = window.map.blockHeightMin - window.map.mainPinHeight;
    let maxYPosition = window.map.blockHeightMax - window.map.mainPinHeight;
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
        if (newCoords.y <= minYPosition) {
          newCoords.y = minYPosition;
        }
        if (newCoords.y >= maxYPosition) {
          newCoords.y = maxYPosition;
        }
        if (newCoords.x <= minXPosition) {
          newCoords.x = minXPosition;
        }
        if (newCoords.x >= maxXPosition) {
          newCoords.x = maxXPosition;
        }
        window.map.mainPin.style.top = newCoords.y + `px`;
        window.map.mainPin.style.left = newCoords.x + `px`;
        window.form.address.value = Math.floor(newCoords.x + (window.map.mainPinWidth / 2)) + `, ` + (newCoords.y + window.map.mainPinHeight);
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
