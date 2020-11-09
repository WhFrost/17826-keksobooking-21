'use strict';

(function () {
  const disablePage = function () {
    window.map.block.classList.add(`map--faded`);
    window.form.block.classList.add(`ad-form--disabled`);
    window.form.address.value = window.map.mainPinX + `, ` + window.map.mainPinY;

    const disableFieldset = function (items) {
      items.forEach(function (element) {
        element.setAttribute(`disabled`, true);
      });
    };
    disableFieldset(window.map.filters);
    disableFieldset(window.form.fieldset);

    window.map.removePins();
    window.card.remove();
    window.form.block.reset();
    window.map.mainPin.style = `left: ` + window.map.defaultMainPinX + `px;` + `top: ` + window.map.defaultMainPinY + `px;`;
    window.form.address.value = window.map.mainPinX + `, ` + (window.map.mainPinY + window.map.mainPinOffset);
    window.map.mainPinEvent();
  };
  disablePage();

  const activatePage = function () {
    window.map.block.classList.remove(`map--faded`);
    window.form.block.classList.remove(`ad-form--disabled`);
    window.form.address.value = window.map.mainPinX + `, ` + (window.map.mainPinY + window.map.mainPinOffset);
    window.form.address.setAttribute(`readonly`, true);

    const activateFieldset = function (items) {
      items.forEach(function (element) {
        element.removeAttribute(`disabled`);
      });
    };
    activateFieldset(window.map.filters);
    activateFieldset(window.form.fieldset);

    window.backend.load(window.backend.method.GET, window.backend.url.DOWNLOAD, window.data.success, window.utils.createError);
  };
  window.main = {
    activate: activatePage,
    disable: disablePage
  };
})();
