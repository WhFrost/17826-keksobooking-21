"use strict";

(function () {
  const getRandom = function (min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
  };
  const getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };
  const getNextRandomUserId = function (arr) {
    return arr.splice((Math.floor(Math.random() * arr.length)), 1);
  };
  const getRandomArr = function (arr) {
    let length = getRandom(0, arr.length);
    let newArr = [];
    for (let i = 0; i < length; i++) {
      newArr.push(arr[i]);
    }
    return newArr;
  };
  const createErrorMessage = function (errorMessage) {
    let errorBlock = document.createElement(`div`);
    errorBlock.style = `position: fixed; width: 50%; top: 25%; z-index: 20; left: 0; right: 0; margin: 0 auto; text-align: center; padding: 20px;
    font-size: 24px; background-color: white; border: 5px solid red; text-decoration: underline; text-decoration-color: red`;
    errorBlock.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, errorBlock);
  };

  window.utils = {
    random: getRandom,
    randomElement: getRandomElement,
    nextRandomUserId: getNextRandomUserId,
    randomArr: getRandomArr,
    error: createErrorMessage,
  };
})();
