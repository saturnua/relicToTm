const Router = require('@koa/router');

const v1Router = require('./v1');

const router = new Router({ prefix: process.env.API_PREFIX });

router.use(v1Router.routes());

module.exports = router;
