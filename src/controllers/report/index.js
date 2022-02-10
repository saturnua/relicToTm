const reportServices = require('../../services');
const isDuplicatedMSG = require('../../util/isDuplicatedMSG');

let oldMSG = {};

const send = async (ctx) => {
  const newMSG = ctx.request.body;

  if (!isDuplicatedMSG(newMSG, oldMSG)) {
    oldMSG = newMSG;
    ctx.body = await reportServices.send(newMSG, ctx);
    ctx.res.statusCode = 200;
  }
};

const userControllers = { send };

module.exports = userControllers;
