"use strict";

(function () {
  const MAP_FILTERS = window.card.filtersContainer.querySelector(`.map__filters`);
  const TYPE_FILTER = MAP_FILTERS.querySelector(`#housing-type`);
  const PRICE_FILTER = MAP_FILTERS.querySelector(`#housing-price`);
  const ROOMS_FILTER = MAP_FILTERS.querySelector(`#housing-rooms`);
  const GUESTS_FILTER = MAP_FILTERS.querySelector(`#housing-guests`);
  const FEATURES_FILTER = MAP_FILTERS.querySelector(`#housing-features`);

  let filteredOffers = {
    onTypeChange: () => {},
    onPriceChange: () => {},
    onRoomsChange: () => {},
    onGuestsChange: () => {},
    onFeaturesChange: () => {}
  };

  TYPE_FILTER.addEventListener(`change`, function () {
    let newType = TYPE_FILTER.value;
    filteredOffers.onTypeChange(newType);
  });
  const setTypeHandler = function (cb) {
    filteredOffers.onTypeChange = cb;
  };
  PRICE_FILTER.addEventListener(`change`, function () {
    let newPrice = PRICE_FILTER.value;
    filteredOffers.onPriceChange(newPrice);
  });
  const setPriceHandler = function (cb) {
    filteredOffers.onPriceChange = cb;
  };
  ROOMS_FILTER.addEventListener(`change`, function () {
    let newCountRooms = ROOMS_FILTER.value;
    filteredOffers.onRoomsChange(newCountRooms);
  });
  const setRoomsHandler = function (cb) {
    filteredOffers.onRoomsChange = cb;
  };
  GUESTS_FILTER.addEventListener(`change`, function () {
    let newCountGuests = GUESTS_FILTER.value;
    filteredOffers.onGuestsChange(newCountGuests);
  });
  const setGuestsHandler = function (cb) {
    filteredOffers.onGuestsChange = cb;
  };

  FEATURES_FILTER.addEventListener(`change`, function () {
    let newFeatures = [];
    let checkbox = FEATURES_FILTER.querySelectorAll(`input:checked`);
    for (let i = 0; i < checkbox.length; i++) {
      newFeatures.push(checkbox[i].value);
    }
    filteredOffers.onFeaturesChange(newFeatures);
  });
  const setFeaturesHandler = function (cb) {
    filteredOffers.onFeaturesChange = cb;
  };

  window.filters = {
    filtered: filteredOffers,
    typeHandler: setTypeHandler,
    priceHandler: setPriceHandler,
    roomsHandler: setRoomsHandler,
    guestsHandler: setGuestsHandler,
    featuresHandler: setFeaturesHandler
  };
})();
