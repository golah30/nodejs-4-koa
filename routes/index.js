const KoaRouter = require('koa-router');
const router = new KoaRouter();
const homePage = require('../controllers/homepage');

router.get('/', homePage.getIndex);

module.exports = router;
