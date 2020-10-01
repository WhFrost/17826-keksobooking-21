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
const MAP_MAIN_PIN = document.querySelector(`.map__pin--main`);
const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT = 65;
const MAIN_PIN_X = Math.round(MAIN_PIN_WIDTH / 2 + MAP_MAIN_PIN.offsetLeft);
const MAIN_PIN_Y = Math.round(MAIN_PIN_HEIGHT / 2 + MAP_MAIN_PIN.offsetTop);
const MAIN_PIN_OFFSET_Y = Math.round(MAIN_PIN_HEIGHT / 2 + 19);
const MAP_FILTERS = document.querySelectorAll(`.map__filter`);
const PIN_TEMPLATE = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
// const FILTERS_CONTAINER = document.querySelector(`.map__filters-container`);
// const CARD_TEMPLATE = document.querySelector(`#card`)
// .content
// .querySelector(`.popup`);
const FORM = document.querySelector(`.ad-form`);
const FORM_FIELDSET = FORM.querySelectorAll(`fieldset`);
const FORM_FIELD_ADDRESS = FORM.querySelector(`#address`);
const FORM_FIELD_ROOMS = FORM.querySelector(`#room_number`);
// const FORM_FIELD_ROOMS_VALUE = FORM_FIELD_ROOMS.querySelectorAll(`option`);
const FORM_FIELD_GUESTS = FORM.querySelector(`#capacity`);
// const FORM_FIELD_GUESTS_VALUE = FORM_FIELD_GUESTS.querySelectorAll(`option`);

const getRandom = function (min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
};

const getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getNextRandomUserId = function () {
  return USERS_ID.splice((Math.floor(Math.random() * USERS_ID.length)), 1);
};

const getRandomArr = function (arr) {
  let length = getRandom(0, arr.length);
  let newArr = [];
  for (let i = 0; i < length; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
};

const getRandomOffer = function () {
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

const getOffersList = function () {
  let offersList = [];
  for (let i = 0; i < OFFER_COUNT; i++) {
    offersList.push(getRandomOffer());
  }
  return offersList;
};

let offersList = getOffersList();

const renderPin = function (obj) {
  let pin = PIN_TEMPLATE.cloneNode(true);
  MAP_PIN.appendChild(pin);
  pin.style.left = obj.location.x + PIN_TEMPLATE.offsetWidth / 2 + `px`;
  pin.style.top = obj.location.y + PIN_TEMPLATE.offsetHeight + `px`;
  pin.querySelector(`img`).src = obj.author.avatar;
  pin.querySelector(`img`).alt = obj.offer.title;
};

const renderPins = function () {
  for (let i = 0; i < OFFER_COUNT; i++) {
    renderPin(offersList[i]);
  }
};

// let renderCardTemplate = function () {
//   let card = CARD_TEMPLATE.cloneNode(true);
//   MAP.insertBefore(card, FILTERS_CONTAINER);
// };
// let renderCardAvatar = function (obj) {
//   let popupAvatar = document.querySelector(`.popup__avatar`);
//   if (obj.author.avatar) {
//     popupAvatar.src = obj.author.avatar;
//   } else {
//     popupAvatar.remove();
//   }
// };
// let renderCardTitle = function (obj) {
//   let popupTitle = document.querySelector(`.popup__title`);
//   popupTitle.textContent = obj.offer.title;
// };
// let renderCardAddress = function (obj) {
//   let popupAddress = document.querySelector(`.popup__text--address`);
//   if (obj.offer.address) {
//     popupAddress.textContent = obj.offer.address;
//   } else {
//     popupAddress.remove();
//   }
// };
// let renderCardPrice = function (obj) {
//   let popupPrice = document.querySelector(`.popup__text--price`);
//   popupPrice.textContent = obj.offer.price + `₽/ночь`;
// };
// let renderCardType = function (obj) {
//   let popupType = document.querySelector(`.popup__type`);
//   let typeTranslation = {
//     palace: `Дворец`,
//     flat: `Квартира`,
//     house: `Дом`,
//     bungalow: `Бунгало`
//   };
//   if (obj.offer.type) {
//     popupType.textContent = typeTranslation[obj.offer.type];
//   } else {
//     popupType.remove();
//   }
// };
// let renderCardCapacity = function (obj) {
//   let popupCapacity = document.querySelector(`.popup__text--capacity`);
//   if (obj.offer.rooms && obj.offer.guests) {
//     popupCapacity.textContent = obj.offer.rooms + ` комнаты для ` + obj.offer.guests + ` гостей`;
//   } else {
//     popupCapacity.remove();
//   }
// };
// let renderCardTime = function (obj) {
//   let popupTime = document.querySelector(`.popup__text--time`);
//   if (obj.offer.checkin && obj.offer.checkout) {
//     popupTime.textContent = `Заезд после ` + obj.offer.checkin + `, выезд до ` + obj.offer.checkout;
//   } else {
//     popupTime.remove();
//   }
// };
// let renderCardFeatures = function (obj) {
//   let popupFeatures = document.querySelector(`.popup__features`);
//   while (popupFeatures.firstChild) {
//     popupFeatures.firstChild.remove();
//   }
//   if (obj.offer.features) {
//     for (let i = 0; i < obj.offer.features.length; i++) {
//       let createFeature = function () {
//         let feature = document.createElement(`li`);
//         feature.classList.add(`popup__feature`);
//         feature.classList.add(`popup__feature--` + obj.offer.features[i]);
//         popupFeatures.appendChild(feature);
//       };
//       createFeature();
//     }
//   } else {
//     popupFeatures.remove();
//   }
// };
// let renderCardDescription = function (obj) {
//   let popupDescription = document.querySelector(`.popup__description`);
//   if (obj.offer.description) {
//     popupDescription.textContent = obj.offer.description;
//   } else {
//     popupDescription.remove();
//   }
// };
// let renderCardPhoto = function (obj) {
//   let popupPhoto = document.querySelector(`.popup__photos`);
//   while (popupPhoto.firstChild) {
//     popupPhoto.firstChild.remove();
//   }
//   if (obj.offer.photos) {
//     for (let i = 0; i < obj.offer.photos.length; i++) {
//       let createPhoto = function () {
//         let photo = document.createElement(`img`);
//         photo.classList.add(`popup__photo`);
//         photo.src = obj.offer.photos[i];
//         photo.width = 45;
//         photo.height = 40;
//         photo.alt = `Фотография жилья`;
//         popupPhoto.appendChild(photo);
//       };
//       createPhoto();
//     }
//   } else {
//     popupPhoto.remove();
//   }
// };

// let renderCard = function (obj) {
//   renderCardTemplate();
//   renderCardAvatar(obj);
//   renderCardTitle(obj);
//   renderCardAddress(obj);
//   renderCardPrice(obj);
//   renderCardType(obj);
//   renderCardCapacity(obj);
//   renderCardTime(obj);
//   renderCardFeatures(obj);
//   renderCardDescription(obj);
//   renderCardPhoto(obj);
// };

// renderCard(offersList[0]);

//
const disablePage = function () {
  MAP.classList.add(`map--faded`);
  FORM.classList.add(`ad-form--disabled`);
  FORM_FIELD_ADDRESS.value = MAIN_PIN_X + `, ` + MAIN_PIN_Y;
  for (let i = 0; i < MAP_FILTERS.length; i++) {
    MAP_FILTERS[i].setAttribute(`disabled`, true);
  }
  for (let i = 0; i < FORM_FIELDSET.length; i++) {
    FORM_FIELDSET[i].setAttribute(`disabled`, true);
  }
};
disablePage();

const activatePage = function () {
  MAP.classList.remove(`map--faded`);
  FORM.classList.remove(`ad-form--disabled`);
  FORM_FIELD_ADDRESS.value = MAIN_PIN_X + `, ` + (MAIN_PIN_Y + MAIN_PIN_OFFSET_Y);
  renderPins();
  for (let i = 0; i < MAP_FILTERS.length; i++) {
    MAP_FILTERS[i].removeAttribute(`disabled`, true);
  }
  for (let i = 0; i < FORM_FIELDSET.length; i++) {
    FORM_FIELDSET[i].removeAttribute(`disabled`, true);
  }
};
const onMainPinClick = function () {
  activatePage();
};

MAP_MAIN_PIN.addEventListener(`mousedown`, function (evt) {
  if (evt.which === 1) {
    onMainPinClick();
  }
});
MAP_MAIN_PIN.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    onMainPinClick();
  }
});

// const validatesRoomAndGuest = function () {
//   if (Number(FORM_FIELD_GUESTS.value) === 0 && Number(FORM_FIELD_ROOMS.value) !== 100) {
//     FORM_FIELD_ROOMS.setCustomValidity(`Требуется больше комнат`);
//   } else if (Number(FORM_FIELD_GUESTS.value) > Number(FORM_FIELD_ROOMS.value)) {
//     FORM_FIELD_GUESTS.setCustomValidity(`Слишком много гостей для кол-ва выбранных комнат`);
//   } else {
//     FORM_FIELD_GUESTS.setCustomValidity(``);
//     FORM_FIELD_ROOMS.setCustomValidity(``);
//   }
// };

// FORM_FIELD_ROOMS.addEventListener(`input`, function () {
//   validatesRoomAndGuest();
// });
// FORM_FIELD_GUESTS.addEventListener(`input`, function () {
//   validatesRoomAndGuest();
// });

const validatesRoomAndGuest = function () {
  if ((Number(FORM_FIELD_GUESTS.value) !== 0 && Number(FORM_FIELD_GUESTS.value) > Number(FORM_FIELD_ROOMS.value)) || (Number(FORM_FIELD_GUESTS.value) === 0 && Number(FORM_FIELD_ROOMS.value) !== 100)) {
    FORM_FIELD_ROOMS.setCustomValidity(`Выберите больше комнат`);
  } else {
    FORM_FIELD_ROOMS.setCustomValidity(``);
  }
};
FORM_FIELD_GUESTS.addEventListener(`input`, function () {
  validatesRoomAndGuest();
});
FORM_FIELD_ROOMS.addEventListener(`input`, function () {
  validatesRoomAndGuest();
});
