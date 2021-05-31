const reportServices = require('../../services');

const send = async (ctx) => {
  const data = ctx.request.body;
  ctx.body = await reportServices.send(data);

  ctx.res.statusCode = 200;
};

const userControllers = { send };

module.exports = userControllers;
