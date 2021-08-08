const reportServices = require('../../services');
const isDuplicatedMSG = require('../../util/isDuplicatedMSG');

let oldMSG = {};

const send = async (ctx) => {
  const newMSG = ctx.request.body;
  // TODO: remove before release
  log('-----------NEW---MSG--------------');
  console.log(newMSG);
  log('-----------OLD---MSG--------------');
  console.log(oldMSG);
  if (!isDuplicatedMSG(newMSG, oldMSG)) {
    oldMSG = newMSG;
    ctx.body = await reportServices.send(newMSG);
    ctx.res.statusCode = 200;
  }
};

const userControllers = { send };

module.exports = userControllers;
