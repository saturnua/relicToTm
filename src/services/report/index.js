const bot = require('../../bot');

const { CHAT_ID } = process.env;

const send = async (ctx) => {
  const appName = ctx.metadata['entity.name'];
  const { severity } = ctx;
  const timeOfError = ctx.timestamp_utc_string;

  const message = `
    🔥🔥🔥🙏🙏🙏🙏🙏🙏🙏🙏🙏🔥🔥🔥\n
    App "${appName}" has ERROR with severity - "${severity}"\n
    happens at - ${timeOfError}
   🔥⛑️⛑️⛑️⛑️⛑️⛑️⛑️⛑️⛑️⛑️⛑️⛑⛑⛑🔥`;

  await bot.telegram.sendMessage(CHAT_ID, message);
  return message;
  // '🔥🔥🔥🔥🔥'
};
const reportServices = { send };

module.exports = reportServices;
