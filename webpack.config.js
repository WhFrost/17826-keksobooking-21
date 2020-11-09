const path = require("path");

module.exports = {
  entry: [
    "./js/utils.js",
    "./js/debounce.js",
    "./js/backend.js",
    "./js/card.js",
    "./js/map.js",
    "./js/filters.js",
    "./js/data.js",
    "./js/form.js",
    "./js/preview.js",
    "./js/main.js",
    "./js/move.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
