require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// TODO add logger implementation
// const logger = require('./logger')

const app = new Koa();
const router = require('./routes');

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
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
