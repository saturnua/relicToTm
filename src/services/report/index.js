const bot = require('../../bot');

const { CHAT_ID } = process.env;

const send = async (ctx) => {
  const appName = ctx.metadata['entity.name'] ? ctx.metadata['entity.name'] : 'App without name';
  const error = ctx.targets ? ctx.targets[0].name : 'Error without name :(';
  const details = ctx.details;
  const { severity } = ctx;
  const timestamp = ctx.timestamp;
  const policyName = ctx.policy_name;
  const condition_name = ctx.condition_name;
  const message = `
    🔥
    App "${appName}" has ERROR with severity - "${severity}"\n
    happens at - ${new Date(timestamp).toLocaleString('en-US', { timeZone: 'Europe/Kiev'})}\n
    ERROR  - "${error}"\n
    DETAILS - "${details}"\n
    PolicyName - "${policyName}"\n
    ConditionName - "${condition_name}"
  🔥`;

  await bot.telegram.sendMessage(CHAT_ID, message);
  return message;
};
const reportServices = { send };

module.exports = reportServices;
