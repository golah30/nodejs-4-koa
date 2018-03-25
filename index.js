const Koa = require('koa');
const app = new Koa();
const Pug = require('koa-pug');
const session = require('koa-session');
const flash = require('koa-flash');
const morgan = require('koa-morgan');

const router = require('./routes');
app.use(require('koa-static')('./public'));
app.use(morgan('dev'));
app.keys = ['loftschool'];
app.use(session(app));
app.use(flash());

app.pug = new Pug({
  viewPath: './views',
  basedir: './views',
  app: app
});

app.use(router.routes());

app.listen(3000);
