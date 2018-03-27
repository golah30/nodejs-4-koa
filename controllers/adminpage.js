const db = require('../dbs/db.js');
const fs = require('fs');
const path = require('path');

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

  let msg = ctx.flash.msgskill || null;

  if (msg !== null || msg !== undefined) {
    prop.msgskill = msg;
  }

  msg = ctx.flash.msgfile || null;

  if (msg !== null || msg !== undefined) {
    prop.msgfile = msg;
  }

  ctx.set('Content-Type', 'text/html');
  ctx.body = ctx.app.pug.render('pages/admin', prop);
};

module.exports.setSkills = async ctx => {
  const msgskill = db.setSkills(ctx.request.body);

  ctx.flash = { msgskill: msgskill };
  return ctx.redirect('/admin');
};

module.exports.setProduct = async ctx => {
  const body = ctx.request.body;
  if (!body.fields.name || !body.fields.price) {
    fs.unlink(body.files.photo.path, err => {
      if (err) console.log(err);
      console.log('deleted');
    });
    ctx.flash = { msgfile: 'Необходимо заполнить все поля' };
    return ctx.redirect('/admin');
  }

  let upload = path.join('./public', 'uploads');
  let fileName = path.join(upload, body.files.photo.name);
  let msgfile = await new Promise((resolve, reject) => {
    fs.rename(body.files.photo.path, fileName, err => {
      if (err) {
        console.log(err);
        fs.unlink(fileName);
        fs.rename(body.files.photo.path, fileName);
        resolve('upload error');
      }
      let dir = fileName.substr(fileName.indexOf('\\'));
      try {
        db.setProduct(body.fields.name, body.fields.price, dir);
      } catch (e) {
        fs.unlink(fileName);
        resolve('database error');
      }
      resolve('uploaded');
    });
  });

  ctx.flash = { msgfile: msgfile };
  return ctx.redirect('/admin');
};
