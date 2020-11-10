"use strict";

const mapFilters = window.card.filtersBlock.querySelector(`.map__filters`);
const typeFilter = mapFilters.querySelector(`#housing-type`);
const priceFilter = mapFilters.querySelector(`#housing-price`);
const roomsFilter = mapFilters.querySelector(`#housing-rooms`);
const guestsFilter = mapFilters.querySelector(`#housing-guests`);
const featuresFilter = mapFilters.querySelector(`#housing-features`);

let filteredOffers = {
  onTypeChange: () => {},
  onPriceChange: () => {},
  onRoomsChange: () => {},
  onGuestsChange: () => {},
  onFeaturesChange: () => {}
};

typeFilter.addEventListener(`change`, window.debounce(function () {
  let newType = typeFilter.value;
  filteredOffers.onTypeChange(newType);
}));
const setTypeHandler = function (cb) {
  filteredOffers.onTypeChange = cb;
};
priceFilter.addEventListener(`change`, window.debounce(function () {
  let newPrice = priceFilter.value;
  filteredOffers.onPriceChange(newPrice);
}));
const setPriceHandler = function (cb) {
  filteredOffers.onPriceChange = cb;
};
roomsFilter.addEventListener(`change`, window.debounce(function () {
  let newCountRooms = roomsFilter.value;
  filteredOffers.onRoomsChange(newCountRooms);
}));
const setRoomsHandler = function (cb) {
  filteredOffers.onRoomsChange = cb;
};
guestsFilter.addEventListener(`change`, window.debounce(function () {
  let newCountGuests = guestsFilter.value;
  filteredOffers.onGuestsChange(newCountGuests);
}));
const setGuestsHandler = function (cb) {
  filteredOffers.onGuestsChange = cb;
};

featuresFilter.addEventListener(`change`, window.debounce(function () {
  let newFeatures = [];
  let checkbox = featuresFilter.querySelectorAll(`input:checked`);
  for (let i = 0; i < checkbox.length; i++) {
    newFeatures.push(checkbox[i].value);
  }
  filteredOffers.onFeaturesChange(newFeatures);
}));
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
