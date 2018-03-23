const Koa = require('koa');
const app = new Koa();
const Pug = require('koa-pug');
const router = require('./routes');
app.use(require('koa-static')('./public'));

app.pug = new Pug({
  viewPath: './views',
  basedir: './views',
  app: app
});

app.use(router.routes());

app.listen(3000);
