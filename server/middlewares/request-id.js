"use strict";

const { createNamespace } = require("cls-hooked");
const { v4: uuidv4 } = require("uuid");

const { getConfig } = require("../utils/get-config");

const session = createNamespace("logger");

module.exports = (options, { strapi }) => {
  const CORRELATION_ID_HEADER = getConfig("correlationIdHeader");

  return async (ctx, next) => {
    const correlationId = ctx.request.get(CORRELATION_ID_HEADER) || uuidv4();
    const requestId = uuidv4();

    ctx.response.set(CORRELATION_ID_HEADER, correlationId);
    ctx.response.set("X-Request-Id", requestId);

    ctx.state.correlationId = correlationId;
    ctx.state.requestId = requestId;

    await session.runPromise(async () => {
      session.set("correlationId", correlationId);
      session.set("requestId", requestId);

      await next();
    });
  };
};
