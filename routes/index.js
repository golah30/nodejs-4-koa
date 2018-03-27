const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const router = new KoaRouter();
const homePage = require('../controllers/homepage');
const loginPage = require('../controllers/login');
const adminPage = require('../controllers/adminpage');
const fs = require('fs');
const path = require('path');

async function isAdmin(ctx, next) {
  if (ctx.session.isAdmin) {
    return await next();
  }
  ctx.redirect('/');
}

async function isExist(ctx, next) {
  let upload = path.join('./public', 'uploads');
  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
    return await next();
  }
  ctx.redirect('/admin');
}

router.get('/', homePage.getIndex);

router.get('/login', loginPage.getLogin);
router.post('/login', koaBody(), loginPage.login);

router.get('/admin', isAdmin, adminPage.getAdmin);
router.post('/admin/skills', isAdmin, koaBody(), adminPage.setSkills);
router.post(
  '/admin/upload',
  isAdmin,
  isExist,
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: './public/uploads'
    }
  }),
  adminPage.setProduct
);

router.post('/', koaBody(), homePage.sendEmail);
module.exports = router;
