"use strict";

const { getNamespace } = require("cls-hooked");

const wrapLogger = (strapi) => {
  const methods = [
    "log",
    "silly",
    "debug",
    "verbose",
    "http",
    "info",
    "warn",
    "error",
  ];

  for (const method of methods) {
    const original = strapi.log[method];

    strapi.log[method] = function (...args) {
      const session = getNamespace("logger");

      const correlationId = session?.get("correlationId") || "-";
      const requestId = session?.get("requestId") || "-";

      return original.apply(strapi.log, [
        ...args,
        { "x-request-id": requestId, "x-correlation-id": correlationId },
      ]);
    };
  }
};

module.exports = {
  wrapLogger,
};
