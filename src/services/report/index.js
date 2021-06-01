const bot = require('../../bot');

const {CHAT_ID} = process.env;

const send = async (ctx) => {
    const appName = ctx.metadata ? ctx.metadata['entity.name'] : 'App without name';
    const error = ctx.targets ? ctx.targets[0]['name'] : 'Error without name :('
    const {severity} = ctx;
    const timeOfError = ctx.timestamp_utc_string;

    const message = `
    🔥
    App "${appName}" has ERROR with severity - "${severity}"\n
    happens at - ${timeOfError}\n
    ERROR  - "${error}"\n
   ️⛑⛑⛑🔥`;

    await bot.telegram.sendMessage(CHAT_ID, message);
    return message;
    // '🔥🔥🔥🔥🔥'
};
const reportServices = {send};

module.exports = reportServices;
