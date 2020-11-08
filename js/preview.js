"use strict";

(function () {
  const FILE_TYPES = [`jpg`, `jpeg`, `png`];
  const FILE_WIDTH = 40;
  const FILE_HEIGHT = 40;

  const avatarFileChooser = window.form.block.querySelector(`.ad-form-header__input`);
  const avatarPreview = window.form.block.querySelector(`.ad-form-header__preview img`);
  const offerPhotoFileChooser = window.form.block.querySelector(`.ad-form__input`);
  const offerPhotoWrapper = window.form.block.querySelector(`.ad-form__photo`);

  const resetFiles = function () {
    avatarPreview.src = `img/muffin-grey.svg`;
    while (offerPhotoWrapper.firstChild) {
      offerPhotoWrapper.firstChild.remove();
    }
  };

  const uploadFile = function (evt, target) {
    const file = evt.target.files[0];
    if (file) {
      const fileName = file.name.toLowerCase();
      const matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        const reader = new FileReader();
        reader.addEventListener(`load`, function () {
          target.width = FILE_WIDTH;
          target.height = FILE_HEIGHT;
          target.src = reader.result;
        });
        reader.readAsDataURL(file);
      }
    }
  };

  const getNewPhoto = function () {
    const offerPhoto = document.createElement(`img`);
    offerPhoto.style = `width: 70px; height: 70px`;
    const offerPhotoPreview = offerPhotoWrapper.appendChild(offerPhoto);
    return offerPhotoPreview;
  };

  avatarFileChooser.addEventListener(`change`, function (evt) {
    uploadFile(evt, avatarPreview);
  });
  offerPhotoFileChooser.addEventListener(`change`, function (evt) {
    uploadFile(evt, getNewPhoto());
  });

  window.preview = {
    reset: resetFiles
  };

})();
