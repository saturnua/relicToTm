const bot = require('../../bot');

const environments = require('../../dictionaries/links.json');
const { CHAT_ID } = process.env;

const send = async (ctx) => {
  const error = ctx.targets ? ctx.targets[0].name : 'Error without name :(';
  const { timestamp, policy_name, condition_name, details } = ctx;
  const targetEnv = environments.find((obj) => obj.name === condition_name);
  let host, linkToTargetELK;
  if (targetEnv) {
    host = targetEnv.name.slice(targetEnv.name.indexOf('(') + 1, targetEnv.name.indexOf(')'));
    linkToTargetELK = process.env[host] + `${targetEnv.link}`;
  } else {
    linkToTargetELK = '#';
  }
  const message = `
    🔥
    <b>happens at - ${new Date(timestamp).toLocaleString('en-US', {
      timeZone: 'Europe/Kiev',
    })} \n</b>
    <u>ERROR </u> - <b>"${error}"</b>\n
    <u>DETAILS </u>- <b>"${details}"</b>\n
    <u>PolicyName</u> - <b>"${policy_name}"</b>\n
    <u>ConditionName <a href="${linkToTargetELK}">${condition_name}</a></u>
  `;
  await bot.telegram.sendMessage(CHAT_ID, message, { parse_mode: 'HTML' });
  return message;
};
const reportServices = { send };

module.exports = reportServices;
