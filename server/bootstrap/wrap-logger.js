"use strict";

const { getConfig } = require("../utils/get-config");
const { getService } = require("../utils/get-service");

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

  const CORRELATION_ID_LOG_KEY = getConfig("correlationIdHeader").toLowerCase();

  for (const method of methods) {
    const original = strapi.log[method];

    if (!original) {
      continue;
    }

    const msgIdx = method === "log" ? 1 : 0;

    strapi.log[method] = function (...args) {
      const correlationId = getService("request-id").getCorrelationId();
      const requestId = getService("request-id").getRequestId();

      if (args[msgIdx] instanceof Error) {
        args[msgIdx] = args[msgIdx].stack;
      }

      return original.apply(strapi.log, [
        ...args,
        { "x-request-id": requestId, [CORRELATION_ID_LOG_KEY]: correlationId },
      ]);
    };
  }
};

module.exports = {
  wrapLogger,
};
