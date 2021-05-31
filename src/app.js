require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { Telegraf } = require('telegraf');

const token = process.env.BOT_TOKEN;

const app = new Koa();
const router = require('./routes');

if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!');
}

app.use(
    bodyParser({
        enableTypes: ['json', 'form', 'text'],
    }),
);

app.use(router.routes()).use(router.allowedMethods());

const bot = new Telegraf(token);
bot.command('/start', (ctx) => ctx.reply('Welcome'));
bot.launch();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`app running on port ${port}...`);
});