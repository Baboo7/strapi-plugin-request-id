"use strict";

const { createNamespace } = require("cls-hooked");
const { v4: uuidv4 } = require("uuid");

const session = createNamespace("logger");

module.exports = (options, { strapi }) => {
  return async (ctx, next) => {
    const correlationId = ctx.request.get("X-Correlation-Id") || uuidv4();
    const requestId = uuidv4();

    ctx.response.set("X-Correlation-Id", correlationId);
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
