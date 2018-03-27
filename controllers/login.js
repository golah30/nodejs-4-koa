const db = require('../dbs/db.js');

module.exports.getLogin = async ctx => {
  if (ctx.session.isAdmin) {
    return ctx.redirect('/admin');
  }
  let prop = {
    title: 'Login page'
  };
  let msg = ctx.flash.msglogin || null;

  if (msg !== null || msg !== undefined) {
    prop.msglogin = msg;
  }
  ctx.set('Content-Type', 'text/html');
  ctx.body = ctx.app.pug.render('pages/login', prop);
};

module.exports.login = async ctx => {
  const body = ctx.request.body;
  if (body.email === void 0 && body.password === void 0) {
    ctx.flash = { msglogin: 'Type something into fields' };
    return ctx.redirect('/login');
  }

  const { login, password } = db.getProperty('admin');

  if (body.email === login && body.password === password) {
    ctx.session.isAdmin = true;
  } else {
    ctx.flash = { msglogin: 'Email or password is wrong' };
    return ctx.redirect('/login');
  }

  ctx.redirect('/admin');
};
