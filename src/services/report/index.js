const bot = require('../../bot');

const { CHAT_ID } = process.env;

const send = async (ctx) => {
  const appName = ctx.metadata ? ctx.metadata['entity.name'] : 'App without name';
  const error = ctx.targets ? ctx.targets[0].name : 'Error without name :(';
  const { severity } = ctx;
  const timestamp = ctx.timestamp;
  const message = `
    🔥
    App "${appName}" has ERROR with severity - "${severity}"\n
    happens at - ${new Date(timestamp).toString()}\n
    ERROR  - "${error}"\n
   ️⛑⛑⛑🔥`;

  await bot.telegram.sendMessage(CHAT_ID, message);
  return message;
};
const reportServices = { send };

module.exports = reportServices;
