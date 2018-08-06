const db = require('../dbs/db.js');
const nodemailer = require('nodemailer');
const config = require('../config.json');

module.exports.getIndex = async ctx => {
  let prop = {
    title: 'Home page'
  };
  let msg = ctx.flash.msgemail || null;

  if (msg !== null || msg !== undefined) {
    prop.msgemail = msg;
  }
  prop.skills = db.getSkillsFromdb();
  prop.products = db.getProductsFromdb();
  ctx.set('Content-Type', 'text/html');
  ctx.body = ctx.app.pug.render('pages/index', prop);
};

module.exports.sendEmail = async ctx => {
  const body = ctx.request.body;
  if (!body.name || !body.email || !body.message) {
    ctx.flash = { msgemail: 'Необходимо заполнить все поля' };
    return ctx.redirect('/#mail');
  }

  let transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: config.mail.from,
    to: config.mail.to,
    subject: config.mail.subject,
    text: `Пользователь ${body.name} написал: \n ${
      body.message
    }\n Отправил с: <${body.email}>`
  };

  let msg = await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        resolve('При отправке письма произошла ошибка');
      }
      resolve('Сообщение отправлено');
    });
  });
  ctx.flash = { msgemail: msg };
  return ctx.redirect('/#mail');
};
