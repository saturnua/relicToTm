const Router = require('@koa/router');

const reportRouter = require('./reportToTm');

const router = new Router({ prefix: '/v1' });

router.use(reportRouter.routes());

module.exports = router;
