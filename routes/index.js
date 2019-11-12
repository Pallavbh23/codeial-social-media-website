const express = require('express');
const router = express.Router();
const app = express();
app.use(express.urlencoded());
console.log('Router loaded');
const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);
router.use('/users/', require('./users'));
router.post('/display', homeController.display);
module.exports = router;