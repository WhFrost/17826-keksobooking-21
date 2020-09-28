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
const FILTERS_CONTAINER = document.querySelector(`.map__filters-container`);
const CARD_TEMPLATE = document.querySelector(`#card`)
  .content
  .querySelector(`.popup`);

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

let renderPin = function (obj) {
  let pin = PIN_TEMPLATE.cloneNode(true);
  MAP_PIN.appendChild(pin);
  pin.style.left = obj.location.x + PIN_TEMPLATE.offsetWidth / 2 + `px`;
  pin.style.top = obj.location.y + PIN_TEMPLATE.offsetHeight + `px`;
  pin.querySelector(`img`).src = obj.author.avatar;
  pin.querySelector(`img`).alt = obj.offer.title;
};

let renderPins = function () {
  for (let i = 0; i < OFFER_COUNT; i++) {
    renderPin(offersList[i]);
  }
};
renderPins();

let renderCard = function (obj) {
  let card = CARD_TEMPLATE.cloneNode(true);
  MAP.insertBefore(card, FILTERS_CONTAINER);
  let popupAvatar = card.querySelector(`.popup__avatar`);
  let popupTitle = card.querySelector(`.popup__title`);
  let popupAddress = card.querySelector(`.popup__text--address`);
  let popupType = card.querySelector(`.popup__type`);
  let popupPrice = card.querySelector(`.popup__text--price`);
  let typeTranslation = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };
  let popupCapacity = card.querySelector(`.popup__text--capacity`);
  let popupTime = card.querySelector(`.popup__text--time`);
  let popupFeatures = card.querySelector(`.popup__features`);
  let popupDescription = card.querySelector(`.popup__description`);
  let popupPhoto = card.querySelector(`.popup__photos`);
  if (obj.author.avatar) {
    popupAvatar.src = obj.author.avatar;
  } else {
    popupAvatar.remove();
  }
  popupTitle.textContent = obj.offer.title;
  if (obj.offer.address) {
    popupAddress.textContent = obj.offer.address;
  } else {
    popupAddress.remove();
  }
  popupPrice.textContent = obj.offer.price + `₽/ночь`;
  if (obj.offer.type) {
    popupType.textContent = typeTranslation[obj.offer.type];
  } else {
    popupType.remove();
  }
  if (obj.offer.rooms && obj.offer.guests) {
    popupCapacity.textContent = obj.offer.rooms + ` комнаты для ` + obj.offer.guests + ` гостей`;
  } else {
    popupCapacity.remove();
  }
  while (popupFeatures.firstChild) {
    popupFeatures.firstChild.remove();
  }
  if (obj.offer.features) {
    for (let i = 0; i < obj.offer.features.length; i++) {
      let createFeature = function () {
        let feature = document.createElement(`li`);
        feature.classList.add(`popup__feature`);
        feature.classList.add(`popup__feature--` + obj.offer.features[i]);
        popupFeatures.appendChild(feature);
      };
      createFeature();
    }
  } else {
    popupFeatures.remove();
  }
  if (obj.offer.checkin && obj.offer.checkout) {
    popupTime.textContent = `Заезд после ` + obj.offer.checkin + `, выезд до ` + obj.offer.checkout;
  } else {
    popupTime.remove();
  }
  if (obj.offer.description) {
    popupDescription.textContent = obj.offer.description;
  } else {
    popupDescription.remove();
  }
  while (popupPhoto.firstChild) {
    popupPhoto.firstChild.remove();
  }
  if (obj.offer.photos) {
    for (let i = 0; i < obj.offer.photos.length; i++) {
      let createPhoto = function () {
        let photo = document.createElement(`img`);
        photo.classList.add(`popup__photo`);
        photo.src = obj.offer.photos[i];
        photo.width = 45;
        photo.height = 40;
        photo.alt = `Фотография жилья`;
        popupPhoto.appendChild(photo);
      };
      createPhoto();
    }
  } else {
    popupPhoto.remove();
  }
};
renderCard(offersList[0]);
