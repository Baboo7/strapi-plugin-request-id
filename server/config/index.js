"use strict";

module.exports = {
  default: {
    /**
     * Define the header to use to get/set the correlation id.
     */
    correlationIdHeader: "X-Correlation-Id",
  },
  validator: ({ correlationIdHeader } = {}) => {
    if (
      typeof correlationIdHeader !== "string" ||
      !correlationIdHeader ||
      /^\s*$/.test(correlationIdHeader)
    ) {
      throw new Error("correlationIdHeader has to be a non empty string.");
    }
  },
};
