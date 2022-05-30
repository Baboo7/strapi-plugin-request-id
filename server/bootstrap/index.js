"use strict";

const { wrapLogger } = require("./wrap-logger");

module.exports = ({ strapi }) => {
  wrapLogger(strapi);
};
