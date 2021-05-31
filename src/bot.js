require('dotenv').config();
const { Telegraf } = require('telegraf');

const token = process.env.BOT_TOKEN;
const bot = new Telegraf(token);

if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!');
}

bot.use(Telegraf.log());
bot.command('/start', (ctx) => ctx.reply('Welcome'));

module.exports = bot;
