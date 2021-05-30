const Koa = require('koa');
const app = new Koa();

// Our First Route
app.use(async ctx => {
    ctx.body = 'Hello World';
});

// Bootstrap the server
app.listen(3000);