const reportServices  = require ('../../services');

const send = async (ctx) => {
    const data = ctx.request.body;
    ctx.body = await reportServices.send(data);
};

const userControllers = { send };

module.exports = userControllers;
