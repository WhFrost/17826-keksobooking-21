"use strict";

(function () {
  const FILTERS_CONTAINER = document.querySelector(`.map__filters-container`);
  const CARD_TEMPLATE = document.querySelector(`#card`)
    .content
    .querySelector(`.popup`);
  let renderCardTemplate = function () {
    let cardOnMap = document.querySelector(`.map__card`);
    if (cardOnMap) {
      return;
    }
    let card = CARD_TEMPLATE.cloneNode(true);
    window.map.block.insertBefore(card, FILTERS_CONTAINER);
    const removeCard = function () {
      let pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
      for (let i = 0; i < pins.length; i++) {
        pins[i].classList.remove(`map__pin--active`);
      }
      card.remove();
      document.removeEventListener(`keydown`, onCardPressEsc);
    };
    const onCardCloseClick = function () {
      removeCard();
    };
    const onCardPressEsc = function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        removeCard();
      }
    };
    const toCloseCard = function () {
      let closeCard = card.querySelector(`.popup__close`);
      closeCard.addEventListener(`click`, onCardCloseClick);
      document.addEventListener(`keydown`, onCardPressEsc);
    };
    toCloseCard();
  };
  let renderCardAvatar = function (obj) {
    let popupAvatar = document.querySelector(`.popup__avatar`);
    if (obj.author.avatar) {
      popupAvatar.src = obj.author.avatar;
    } else {
      popupAvatar.style.display = `none`;
    }
  };
  let renderCardTitle = function (obj) {
    let popupTitle = document.querySelector(`.popup__title`);
    popupTitle.textContent = obj.offer.title;
  };
  let renderCardAddress = function (obj) {
    let popupAddress = document.querySelector(`.popup__text--address`);
    if (obj.offer.address) {
      popupAddress.textContent = obj.offer.address;
    } else {
      popupAddress.style.display = `none`;
    }
  };
  let renderCardPrice = function (obj) {
    let popupPrice = document.querySelector(`.popup__text--price`);
    popupPrice.textContent = obj.offer.price + `₽/ночь`;
  };
  let renderCardType = function (obj) {
    let popupType = document.querySelector(`.popup__type`);
    let typeTranslation = {
      palace: `Дворец`,
      flat: `Квартира`,
      house: `Дом`,
      bungalow: `Бунгало`
    };
    if (obj.offer.type) {
      popupType.textContent = typeTranslation[obj.offer.type];
    } else {
      popupType.style.display = `none`;
    }
  };
  let renderCardCapacity = function (obj) {
    let popupCapacity = document.querySelector(`.popup__text--capacity`);
    if (obj.offer.rooms && obj.offer.guests) {
      popupCapacity.textContent = obj.offer.rooms + ` комнаты для ` + obj.offer.guests + ` гостей`;
    } else {
      popupCapacity.style.display = `none`;
    }
  };
  let renderCardTime = function (obj) {
    let popupTime = document.querySelector(`.popup__text--time`);
    if (obj.offer.checkin && obj.offer.checkout) {
      popupTime.textContent = `Заезд после ` + obj.offer.checkin + `, выезд до ` + obj.offer.checkout;
    } else {
      popupTime.style.display = `none`;
    }
  };
  let renderCardFeatures = function (obj) {
    let popupFeatures = document.querySelector(`.popup__features`);
    while (popupFeatures.firstChild) {
      popupFeatures.firstChild.remove();
    }
    if (obj.offer.features) {
      const createFeatures = function (features) {
        features.forEach(function (element) {
          let feature = document.createElement(`li`);
          feature.classList.add(`popup__feature`);
          feature.classList.add(`popup__feature--` + element);
          popupFeatures.appendChild(feature);
        });
      };
      createFeatures(obj.offer.features);
    } else {
      popupFeatures.style.display = `none`;
    }
  };
  let renderCardDescription = function (obj) {
    let popupDescription = document.querySelector(`.popup__description`);
    if (obj.offer.description) {
      popupDescription.textContent = obj.offer.description;
    } else {
      popupDescription.style.display = `none`;
    }
  };
  let renderCardPhoto = function (obj) {
    let popupPhoto = document.querySelector(`.popup__photos`);
    while (popupPhoto.firstChild) {
      popupPhoto.firstChild.remove();
    }
    if (obj.offer.photos) {
      const createPhoto = function (photos) {
        photos.forEach(function (element) {
          let photo = document.createElement(`img`);
          photo.classList.add(`popup__photo`);
          photo.src = element;
          photo.width = 45;
          photo.height = 40;
          photo.alt = `Фотография жилья`;
          popupPhoto.appendChild(photo);
        });
      };
      createPhoto(obj.offer.photos);
    } else {
      popupPhoto.style.display = `none`;
    }
  };

  let renderCard = function (obj) {
    renderCardTemplate();
    renderCardAvatar(obj);
    renderCardTitle(obj);
    renderCardAddress(obj);
    renderCardPrice(obj);
    renderCardType(obj);
    renderCardCapacity(obj);
    renderCardTime(obj);
    renderCardFeatures(obj);
    renderCardDescription(obj);
    renderCardPhoto(obj);
  };

  const removeCardOnMap = function () {
    let card = document.querySelector(`.popup`);
    if (card) {
      card.remove();
    }
  };

  window.card = {
    filtersContainer: FILTERS_CONTAINER,
    get: renderCard,
    remove: removeCardOnMap,
  };
})();
