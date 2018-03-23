const db = require('../dbs/db.js');

module.exports.getLogin = async ctx => {
  let prop = {
    title: 'Login page'
  };

  ctx.set('Content-Type', 'text/html');
  ctx.body = ctx.app.pug.render('pages/login', prop);
};
