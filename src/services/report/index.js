const bot = require('../../bot');

const { CHAT_ID } = process.env;

const send = async (ctx) => {
  const appName = ctx.metadata['entity.name'] ? ctx.metadata['entity.name'] : 'App without name';
  const error = ctx.targets ? ctx.targets[0].name : 'Error without name :(';
  const { severity, timestamp, policy_name, details } = ctx;
  const condition_name = 'http://google.com'

  const message = `
    🔥
    
    App "${appName}" has ERROR with severity - "${severity}"\n
    happens at - ${new Date(timestamp).toLocaleString('en-US', { timeZone: 'Europe/Kiev'})}\n
    ERROR  - "${error}"\n
    DETAILS - "${details}"\n
    PolicyName - "${policy_name}"\n
    ConditionName - "<a href="TEST_INFO">${condition_name}</a>"
  🔥`;

  await bot.telegram.sendMessage(CHAT_ID, message);
  return message;
};
const reportServices = { send };

module.exports = reportServices;
