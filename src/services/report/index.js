const bot = require('../../bot');

const environments = require('../../dictionaries/links.json');
const logger = require('../../logger')
const { CHAT_ID } = process.env;

const send = async (newMSG, ctx) => {
  const error = newMSG.targets ? newMSG.targets[0].name : 'Error without name :(';
  const { timestamp, policy_name, condition_name, details } = newMSG;
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
  await pushDb(ctx, newMSG);
  return message;
};

const pushDb = async (ctx, msg) => {
  const query = {
    name: 'Insert data from MSG',
    text: 'INSERT INTO relic_msg (id, name, link, event_type, incident_id, details, timestamp, owner, policy_name, incident_url)' +
      'VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);',
    values: [msg?.targets[0].id,
            msg?.targets[0].name,
            msg?.targets[0].link,
            msg?.event_type,
            msg?.incident_id,
            msg?.details,
            new Date(msg?.timestamp).toISOString(),
            msg?.owner,
            msg?.policy_name,
            msg?.incident_url],
    rowMode: 'object',
  };
  try {
    const res = await ctx.db.pool.query(query);
  }
 catch (e) {
   logger.error(e)
 }

}
const reportServices = { send };

module.exports = reportServices;
