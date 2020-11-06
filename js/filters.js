"use strict";

(function () {
  const MAP_FILTERS = window.card.filtersContainer.querySelector(`.map__filters`);
  const TYPE_FILTER = MAP_FILTERS.querySelector(`#housing-type`);
  // const PRICE_FILTER = MAP_FILTERS.querySelector(`#housing-price`);
  // const ROOMS_FILTER = MAP_FILTERS.querySelector(`#housing-rooms`);
  // const GUESTS_FILTER = MAP_FILTERS.querySelector(`#housing-guests`);
  // const FEATURES_FILTER = MAP_FILTERS.querySelector(`#housing-features`);

  // let valueTypeFilter = `any`;
  // let valuePriceFilter = `any`;
  // let valueRoomsFilter = `any`;
  // let valueGuestsFilter = `any`;
  // let valueFeaturesFilter = [];

  let filteredOffers = {
    onTypeChange: function () {},
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

  window.filters = {
    filtered: filteredOffers,
    typeHandler: setTypeHandler
  };
})();
