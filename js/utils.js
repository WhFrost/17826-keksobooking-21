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
  window.utils = {
    random: getRandom,
    randomElement: getRandomElement,
    nextRandomUserId: getNextRandomUserId,
    randomArr: getRandomArr
  };
})();
