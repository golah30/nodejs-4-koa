const db = require('../dbs/db.js');

module.exports.getAdmin = async ctx => {
  let prop = {
    title: 'Admin page'
  };
  const skills = db.getSkillsFromdb();
  if (skills.length !== 0) {
    prop.skills = {};
    prop.skills.age = skills[0].number;
    prop.skills.concerts = skills[1].number;
    prop.skills.cities = skills[2].number;
    prop.skills.years = skills[3].number;
  }
  ctx.set('Content-Type', 'text/html');
  ctx.body = ctx.app.pug.render('pages/admin', prop);
};
