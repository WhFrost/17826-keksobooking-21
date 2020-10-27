'use strict';

const disablePage = function () {
  window.map.map.classList.add(`map--faded`);
  window.form.form.classList.add(`ad-form--disabled`);
  window.form.address.value = window.map.mainPinX + `, ` + window.map.mainPinY;
  for (let i = 0; i < window.map.filters.length; i++) {
    window.map.filters[i].setAttribute(`disabled`, true);
  }
  for (let i = 0; i < window.form.fieldset.length; i++) {
    window.form.fieldset[i].setAttribute(`disabled`, true);
  }
};
disablePage();

const activatePage = function () {
  window.map.map.classList.remove(`map--faded`);
  window.form.form.classList.remove(`ad-form--disabled`);
  window.form.address.value = window.map.mainPinX + `, ` + (window.map.mainPinY + window.map.mainPinOffset);
  window.form.address.setAttribute(`readonly`, true);
  for (let i = 0; i < window.map.filters.length; i++) {
    window.map.filters[i].removeAttribute(`disabled`, true);
  }
  for (let i = 0; i < window.form.fieldset.length; i++) {
    window.form.fieldset[i].removeAttribute(`disabled`);
  }
  window.map.pinsOnMap();
  window.pin.clickPin(window.data.offersList);
  console.log(window.data.offersList);
};
window.main = {
  activate: activatePage,
  disable: disablePage
};
