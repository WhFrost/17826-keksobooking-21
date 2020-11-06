"use strict";

(function () {
  const OFFER_COUNT = 5;
  let pins = [];

  let valueTypeFilter = `flat`;
  const getRank = function (offers) {
    let rank = 0;
    if (offers.onTypeChange === valueTypeFilter) {
      rank += 5;
    }
    return rank;
  };
  const namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  const updateData = function () {
    window.map.pinsOnMap(pins.sort(function (left, right) {
      let rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };
  window.filters.typeHandler(function (type) {
    valueTypeFilter = type;
    updateData();
  });

  const successHandler = function (data) {
    pins = data;
    updateData();
  };

  window.data = {
    offerCount: OFFER_COUNT,
    update: updateData,
    success: successHandler
  };
})();
