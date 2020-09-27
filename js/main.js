'use strict';

const OFFER_COUNT = 8;
const MAX_RANDOM = 100;
const USERS_ID = [1, 2, 3, 4, 5, 6, 7, 8];
const OFFER_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const OFFER_CHECKIN = [`12:00`, `13:00`, `14:00`];
const OFFER_CHECKOUT = [`12:00`, `13:00`, `14:00`];
const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const OFFER_PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const LOCATION_X = document.querySelector(`.map`).offsetWidth;
const LOCATION_Y = 630;
const MAP = document.querySelector(`.map`);
const MAP_PIN = document.querySelector(`.map__pins`);
const PIN_TEMPLATE = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

let getRandom = function (min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
};

let getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

let getNextRandomUserId = function () {
  return USERS_ID.splice((Math.floor(Math.random() * USERS_ID.length)), 1);
};

let getRandomArr = function (arr) {
  let length = getRandom(0, arr.length);
  let newArr = [];
  for (let i = 0; i < length; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
};

let getRandomOffer = function () {
  let userId = getNextRandomUserId();
  let locationX = getRandom(0, LOCATION_X);
  let locationY = getRandom(0, LOCATION_Y);
  return {
    author: {
      avatar: `img/avatars/user0` + userId + `.png`
    },
    offer: {
      title: `Объявление №` + userId,
      address: `` + locationX + `, ` + `` + locationY,
      price: getRandom(0, MAX_RANDOM),
      type: getRandomElement(OFFER_TYPE),
      rooms: getRandom(0, MAX_RANDOM),
      guests: getRandom(0, MAX_RANDOM),
      checkin: getRandomElement(OFFER_CHECKIN),
      checkout: getRandomElement(OFFER_CHECKOUT),
      features: getRandomArr(OFFER_FEATURES),
      description: `Описание`,
      photos: getRandomArr(OFFER_PHOTOS)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

let getOffersList = function () {
  let offersList = [];
  for (let i = 0; i < OFFER_COUNT; i++) {
    offersList.push(getRandomOffer());
  }
  return offersList;
};

let offersList = getOffersList();

MAP.classList.remove(`map--faded`);

let renderPin = function (i) {
  let pin = PIN_TEMPLATE.cloneNode(true);
  MAP_PIN.appendChild(pin);
  pin.style.left = offersList[i].location.x + PIN_TEMPLATE.offsetWidth / 2 + `px`;
  pin.style.top = offersList[i].location.y + PIN_TEMPLATE.offsetHeight + `px`;
  pin.querySelector(`img`).src = offersList[i].author.avatar;
  pin.querySelector(`img`).alt = offersList[i].offer.title;
};

let renderPins = function () {
  for (let i = 0; i < OFFER_COUNT; i++) {
    renderPin(i);
  }
};
renderPins();
