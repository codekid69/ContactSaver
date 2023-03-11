const router=require('express').Router();
const home=require('../controllers/home_Controller');
const passport=require('passport');
router.get('/',home.home);
router.use('/user',require('./user'));
module.exports=router;