require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('./logger')
const { startRelicDb, stopRelicDb } = require("./db");
const shutdownEmitter = require("./util/shutdownEmitter");
const app = new Koa();
const router = require('./routes');
const pg = require('pg');

app.context.db = { Pool: pg.Pool };

app.use(
  bodyParser({
    enableTypes: ['json', 'form', 'text'],
  }),
);
// TODO del before release - for testing purpose only
app.use((ctx, next) => {
  next();
});
app.use(router.routes()).use(router.allowedMethods());

const bot = require('./bot');

bot.launch();

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    await startRelicDb(app.context);
    logger.info(`app running on port ${port}...`);
  }catch (err) {
    await stopRelicDb(app.context);
    logger.info(`app stooped`);
    shutdownEmitter('SIGQUIT', `App is not properly started. Reason: ${err.message}. Shutting down.`);
  }
});
