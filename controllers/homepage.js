const db = require('../dbs/db.js');

module.exports.getIndex = async ctx => {
  let prop = {
    title: 'Home page'
  };

  prop.skills = db.getSkillsFromdb();
  prop.products = db.getProductsFromdb();

  ctx.set('Content-Type', 'text/html');
  ctx.body = ctx.app.pug.render('pages/index', prop);
};
