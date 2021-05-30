require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

const router = require('./routes');

app.use(
    bodyParser({
        enableTypes: ['json', 'form', 'text'],
    }),
);

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`app running on port ${port}...`);
});