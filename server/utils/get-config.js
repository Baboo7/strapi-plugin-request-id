const { pluginId } = require("./plugin-id");

/**
 * @typedef {("correlationIdHeader")} ConfigParam
 */

/**
 * Get a config parameter.
 * @param {ConfigParam} param
 */
const getConfig = (param) => {
  return strapi.config.get(`plugin.${pluginId}.${param}`);
};

module.exports = {
  getConfig,
};
