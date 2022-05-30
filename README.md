# Strapi Plugin Request Id

Add a unique id to each request made to your server and track your users' activity in the logs.

<p align="center">
  <img src="./doc/logo.png" alt="UI" width="300"/>
</p>

## Features

- Add a unique `request id` and `correlation id` to each request.
- Automatically log the `request id` and `correlation id` when a message is logged.

## Table Of Content

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Requirements

Strapi v4 is required.

## Installation

1. Download

```
yarn add strapi-plugin-request-id
```

or

```
npm i strapi-plugin-request-id
```

2. Enable the plugin

In `config/plugins.js`, add:

```js
module.exports = ({ env }) => ({
  //...
  "request-id": {
    enabled: true,
  },
  //...
});
```

3. Add the `request-id` middleware:

In `config/middlewares.js`, add the middleware at the _bottom of the list_:

```js
module.exports = [
  //...
  "plugin::request-id.request-id",
];
```

## Usage

When a request is received, a unique `request id` and `correlation id` are added to it.

<br/>

> ☝️ If the header of the request contains the property `X-Correlation-Id`, this value is used as the `correlation id` instead generating a new one.

<br/>

### Example 1: logging

The `request id` and `correlation id` are automatically logged when a message is logged using the strapi logger.

This code:

```js
const endpoint = (ctx) => {
  const { user } = ctx.state;

  strapi.log.info(`user ${user.id} was there!`);

  ctx.status = 200;
};
```

Will produce the logs:

```json
{
  "level": "info",
  "message": "user 1 was there!",
  "timestamp": "2022-05-29 17:26:19",
  "x-correlation-id": "e5b97199-9003-4c36-8ead-28186e3f4a4f",
  "x-request-id": "04dd66c9-3d3e-4188-8ae8-32703d864862"
}
```

You can then track `user 1`'s activity by filtering the logs with `x-request-id="04dd66c9-3d3e-4188-8ae8-32703d864862"`, or accross your services using `x-correlation-id`.

By default, strapi doesn't display the logs as json in the console. If you want to see the `request id` and `correlation id` while developing, create the file `config/logger.js` and use this configuration:

```js
"use strict";

const { winston } = require("@strapi/logger");

module.exports = {
  transports: [
    new winston.transports.Console({
      level: "silly",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.json()
      ),
    }),
  ],
};
```

### Example 2: access the request/correlation id of a request

The `request id` and `correlation id` are added to the **headers of the response**. They can be accessed through the `ctx.response` object:

```js
const endpoint = (ctx) => {
  const requestId = ctx.response.get("X-Request-Id");
  const correlationId = ctx.response.get("X-Correlation-Id");

  const res = await fetch(`my-other-service/endpoint`, {
    method: "GET",
    headers: {
      // Add the correlation id when calling an external service.
      "X-Correlation-Id": correlationId
    },
  });

  ctx.body = { data: res.data };
};
```

## Author

Baboo - [@Baboo7](https://github.com/Baboo7)
