"use strict";

const { pluginId } = require("./plugin-id");

/**
 * @typedef {("request-id")} ServiceName
 */

/**
 * Get a plugin service.
 * @param {ServiceName} serviceName
 */
const getService = (serviceName) => {
  return strapi.plugin(pluginId).service(serviceName);
};

module.exports = {
  getService,
};
