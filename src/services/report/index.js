const bot = require('../../bot')

const { CHAT_ID } = process.env;

const send = async (ctx) => {
    const payload = ctx;
    await bot.telegram.sendMessage(CHAT_ID, payload)
    return payload;
};
const reportServices = { send }

module.exports = reportServices;