"use strict";

(function () {
  const MAP_FILTERS = window.card.filtersContainer.querySelector(`.map__filters`);
  const TYPE_FILTER = MAP_FILTERS.querySelector(`#housing-type`);
  const PRICE_FILTER = MAP_FILTERS.querySelector(`#housing-price`);
  const ROOMS_FILTER = MAP_FILTERS.querySelector(`#housing-rooms`);
  const GUESTS_FILTER = MAP_FILTERS.querySelector(`#housing-guests`);
  // const FEATURES_FILTER = MAP_FILTERS.querySelector(`#housing-features`);

  let filteredOffers = {
    onTypeChange: () => {},
    onPriceChange: () => {},
    onRoomsChange: () => {},
    onGuestsChange: () => {}
  };

  const closeActiveCard = function () {
    const card = document.querySelector(`.popup`);
    if (card) {
      card.remove();
    }
  };

  TYPE_FILTER.addEventListener(`change`, function () {
    closeActiveCard();
    let newType = TYPE_FILTER.value;
    filteredOffers.onTypeChange(newType);
    window.data.update();
  });
  const setTypeHandler = function (cb) {
    filteredOffers.onTypeChange = cb;
  };
  PRICE_FILTER.addEventListener(`change`, function () {
    closeActiveCard();
    let newPrice = PRICE_FILTER.value;
    filteredOffers.onPriceChange(newPrice);
    window.data.update();
  });
  const setPriceHandler = function (cb) {
    filteredOffers.onPriceChange = cb;
  };
  ROOMS_FILTER.addEventListener(`change`, function () {
    closeActiveCard();
    let newCountRooms = ROOMS_FILTER.value;
    filteredOffers.onRoomsChange(newCountRooms);
    window.data.update();
  });
  const setRoomsHandler = function (cb) {
    filteredOffers.onRoomsChange = cb;
  };
  GUESTS_FILTER.addEventListener(`change`, function () {
    closeActiveCard();
    let newCountGuests = GUESTS_FILTER.value;
    filteredOffers.onGuestsChange(newCountGuests);
    window.data.update();
  });
  const setGuestsHandler = function (cb) {
    filteredOffers.onGuestsChange = cb;
  };

  window.filters = {
    filtered: filteredOffers,
    typeHandler: setTypeHandler,
    priceHandler: setPriceHandler,
    roomsHandler: setRoomsHandler,
    guestsHandler: setGuestsHandler
  };
})();
