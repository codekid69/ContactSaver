const router = require('express').Router();
const user = require('../controllers/user_Controller');
const passport = require('passport');
router.get('/sign-up', user.signup);
router.get('/sign-in', user.signin);
router.get('/logout', passport.checkAuthentication, user.destroySession);
router.get('/delete/:id', passport.checkAuthentication, user.delete);
router.post('/create-user', user.createUser);
router.post('/create-session', passport.authenticate('local', { failureRedirect: '/user/sign-in' }), user.createSession);
router.post('/add-contact', passport.checkAuthentication, user.createContact);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/sign-in' }), user.createSession);
module.exports = router;