const koa = require('koa');
const app = new koa()
const Router = require('koa-router');
const router = new Router();

router.get('/', ctx => {
    ctx.body = 'Hello World from KOA!!!';
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(8080);