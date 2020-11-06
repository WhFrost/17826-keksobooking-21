"use strict";

(function () {
  const MAP_FILTERS = window.card.filtersContainer.querySelector(`.map__filters`);
  const TYPE_FILTER = MAP_FILTERS.querySelector(`#housing-type`);
  // const PRICE_FILTER = MAP_FILTERS.querySelector(`#housing-price`);
  // const ROOMS_FILTER = MAP_FILTERS.querySelector(`#housing-rooms`);
  // const GUESTS_FILTER = MAP_FILTERS.querySelector(`#housing-guests`);
  // const FEATURES_FILTER = MAP_FILTERS.querySelector(`#housing-features`);

  let pins = [];
  let newValueTypeFilter = `any`;

  const closeActiveCard = function () {
    const card = document.querySelector(`.popup`);
    if (card) {
      card.remove();
    }
  };

  const updateData = function () {
    window.map.removePins();
    closeActiveCard();
    const newPins = pins.filter(function (obj) {
      return obj.offer.type === newValueTypeFilter;
    });
    // console.log(newPins);
    const allPins = newPins.concat(pins);
    // console.log(newValueTypeFilter);
    window.map.pinsOnMap(newPins);
  };
  const successHandler = function (data) {
    pins = data;
    updateData();
  };

  TYPE_FILTER.addEventListener(`change`, function () {
    newValueTypeFilter = TYPE_FILTER.value;
    updateData();
  });

  window.filters = {
    update: updateData,
    success: successHandler,
    newType: newValueTypeFilter
  };
})();
