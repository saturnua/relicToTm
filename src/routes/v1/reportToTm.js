const Router = require('@koa/router');

const { reportControllers } = require('../../controllers');

const router = new Router({ prefix: '/report' });
router.post('report', '/send', reportControllers.send);

module.exports = router;