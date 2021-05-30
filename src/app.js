const Koa = require('koa');
const app = new Koa();

// Our First Route
app.use(async ctx => {
    ctx.body = 'Hello World';
});

// Bootstrap the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`app running on port ${port}...`);
});