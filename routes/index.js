const KoaRouter = require('koa-router');
const router = new KoaRouter();
const homePage = require('../controllers/homepage');
const loginPage = require('../controllers/login');
const adminPage = require('../controllers/adminpage');

router.get('/', homePage.getIndex);
router.get('/login', loginPage.getLogin);
router.get('/admin', adminPage.getAdmin);

module.exports = router;
