'use strict';

const disablePage = function () {
  window.map.disable();
  window.form.disable();
};
disablePage();

const activatePage = function () {
  window.map.activate();
  window.form.activate();
  window.backend.load(window.backend.method.GET, window.backend.url.DOWNLOAD, window.data.success, window.utils.createError);
};
window.main = {
  activate: activatePage,
  disable: disablePage
};
