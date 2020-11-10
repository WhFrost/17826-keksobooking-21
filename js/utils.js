"use strict";

const createErrorMessage = function (errorMessage) {
  let errorBlock = document.createElement(`div`);
  errorBlock.style = `position: fixed; width: 50%; top: 25%; z-index: 20; left: 0; right: 0; margin: 0 auto; text-align: center; padding: 20px;
    font-size: 24px; background-color: white; border: 5px solid red; text-decoration: underline; text-decoration-color: red`;
  errorBlock.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, errorBlock);
};

window.utils = {
  createError: createErrorMessage,
};
