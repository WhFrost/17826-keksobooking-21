"use strict";

(function () {
  const OFFER_COUNT = 8;
  // const MAX_RANDOM = 100;
  // const USERS_ID = [1, 2, 3, 4, 5, 6, 7, 8];
  // const OFFER_TYPE = [`palace`, `flat`, `house`, `bungalow`];
  // const OFFER_CHECKIN = [`12:00`, `13:00`, `14:00`];
  // const OFFER_CHECKOUT = [`12:00`, `13:00`, `14:00`];
  // const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  // const OFFER_PHOTOS = [
  //   `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  //   `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  //   `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  // ];
  // const LOCATION_X = document.querySelector(`.map`).offsetWidth;
  // const LOCATION_Y = 630;

  // const getRandomOffer = function () {
  //   let userId = window.utils.nextRandomUserId(USERS_ID);
  //   let locationX = window.utils.random(0, LOCATION_X);
  //   let locationY = window.utils.random(0, LOCATION_Y);
  //   return {
  //     author: {
  //       avatar: `img/avatars/user0` + userId + `.png`
  //     },
  //     offer: {
  //       title: `Объявление №` + userId,
  //       address: `` + locationX + `, ` + `` + locationY,
  //       price: window.utils.random(0, MAX_RANDOM),
  //       type: window.utils.randomElement(OFFER_TYPE),
  //       rooms: window.utils.random(0, MAX_RANDOM),
  //       guests: window.utils.random(0, MAX_RANDOM),
  //       checkin: window.utils.randomElement(OFFER_CHECKIN),
  //       checkout: window.utils.randomElement(OFFER_CHECKOUT),
  //       features: window.utils.randomArr(OFFER_FEATURES),
  //       description: `Описание`,
  //       photos: window.utils.randomArr(OFFER_PHOTOS)
  //     },
  //     location: {
  //       x: locationX,
  //       y: locationY
  //     }
  //   };
  // };

  // const getOffersList = function (count) {
  //   let offersList = [];
  //   for (let i = 0; i < count; i++) {
  //     offersList.push(getRandomOffer());
  //   }
  //   return offersList;
  // };

  window.data = {
    offerCount: OFFER_COUNT,
    // offersList: getOffersList(OFFER_COUNT)
  };
})();
