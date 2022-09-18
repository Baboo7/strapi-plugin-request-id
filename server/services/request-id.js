"use strict";

const { getNamespace } = require("cls-hooked");

const getCorrelationId = () => {
  return getNamespace("logger")?.get("correlationId") || "-";
};

const getRequestId = () => {
  return getNamespace("logger")?.get("requestId") || "-";
};

module.exports = ({ strapi }) => ({
  getCorrelationId,
  getRequestId,
});
