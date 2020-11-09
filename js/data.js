"use strict";

(function () {
  const OFFER_COUNT = 5;
  const ANY = `any`;
  const PRICE_LOW = `low`;
  const PRICE_MIDDLE = `middle`;
  const PRICE_HIGH = `high`;
  const MIN_PRICE = 10000;
  const MAX_PRICE = 50000;

  const closeActiveCard = function () {
    const card = document.querySelector(`.popup`);
    if (card) {
      card.remove();
    }
  };

  let pins = [];
  let similarityFeatures = [];

  let defaultValueTypeFilter = `any`;
  let defaultValuePriceFilter = `any`;
  let defaultValueRoomsFilter = `any`;
  let defaultValueGuestsFilter = `any`;
  let defaultValueFeaturesFilter = [];


  const getPriceRatio = function (offers) {
    switch (defaultValuePriceFilter) {
      case ANY:
        return offers.offer.price > 0;
      case PRICE_MIDDLE:
        return offers.offer.price >= MIN_PRICE && offers.offer.price < MAX_PRICE;
      case PRICE_LOW:
        return offers.offer.price < MIN_PRICE;
      case PRICE_HIGH:
        return offers.offer.price >= MAX_PRICE;
    }
    return true;
  };

  const getRank = function (offers) {
    let rank = 0;
    if (offers.offer.type === defaultValueTypeFilter || defaultValueTypeFilter === `any`) {
      rank += 1;
    }
    if (getPriceRatio(offers)) {
      rank += 1;
    }
    if (offers.offer.rooms === Number(defaultValueRoomsFilter) || defaultValueRoomsFilter === `any`) {
      rank += 1;
    }
    if (offers.offer.guests === Number(defaultValueGuestsFilter) || defaultValueGuestsFilter === `any`) {
      rank += 1;
    }
    if (getSimilarityFeatures(offers.offer.features, defaultValueFeaturesFilter).length !== 0 || defaultValueFeaturesFilter === `any`) {
      rank += similarityFeatures.length;
    }
    return rank;
  };

  const getSimilarityFeatures = function (defaultFeatures, newFeatures) {
    similarityFeatures = defaultFeatures.filter((el) => newFeatures.includes(el));
    return similarityFeatures;
  };

  const arrsLengthComparator = function (left, right) {
    if (left.length > right.length) {
      return 1;
    } else if (left.length < right.length) {
      return -1;
    } else {
      return 0;
    }
  };

  const updateData = function () {
    window.map.removePins();
    closeActiveCard();
    window.debounce(window.map.getPins(pins.sort(function (left, right) {
      let rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = arrsLengthComparator(left.offer.features, right.offer.features);
      }
      return rankDiff;
    }))
    );
  };

  window.filters.typeHandler(function (type) {
    defaultValueTypeFilter = type;
    updateData();
  });

  window.filters.priceHandler(function (price) {
    defaultValuePriceFilter = price;
    updateData();
  });
  window.filters.roomsHandler(function (rooms) {
    defaultValueRoomsFilter = rooms;
    updateData();
  });
  window.filters.guestsHandler(function (guests) {
    defaultValueGuestsFilter = guests;
    updateData();
  });
  window.filters.guestsHandler(function (guests) {
    defaultValueGuestsFilter = guests;
    updateData();
  });
  window.filters.featuresHandler(function (newFeatures) {
    defaultValueFeaturesFilter = newFeatures;
    updateData();
  });

  const successHandler = function (data) {
    pins = data;
    updateData();
  };

  window.data = {
    offersCount: OFFER_COUNT,
    update: updateData,
    success: successHandler
  };
})();
