"use strict";

(function () {
  const OFFER_COUNT = 5;
  // let pins = [];

  // const updateData = function () {
  //   console.log(window.filters.newType);
  //   // const newPins = pins.filter(function (pin) {
  //   //   return pin.offer.type === window.filters.newType;
  //   // });
  //   window.map.pinsOnMap(pins);
  // };

  // const successHandler = function (data) {
  //   pins = data;
  //   window.filters.updateData();
  // };

  window.data = {
    // update: updateData,
    offerCount: OFFER_COUNT,
    // success: successHandler
  };
})();
