const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    }, async function (req, email, password, done) {
        const user = await User.findOne({ email: email });
        if (!user) {
            req.flash('error','User not eixst');
            return done(null, false);
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            req.flash('error','Invalid Credentials');
            return done(null, false);
        }
        return done(null, user);
    }
));

//serialising the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id); // this automatically encrypt it in the cookie so this is a cookie set up for the user and send it to the browser   
})

// Deserialising the user from the key in the cookie when browser made the request
passport.deserializeUser(async function (id, done) {
    // finding the user by id in databse
    const user = await User.findById(id);
    if (!user) {
        console.log("error");
        return done(null, false);
    }
    return done(null, user);
});

passport.checkAuthentication = function (req, res, next) {
    // if user signed in pass the request to the next function 
    // inbuilt funtion in pasport isauthentication()
    if (req.isAuthenticated()) {
        return next();
    }
    // if user is not signed in
    return res.redirect('/contact-app/user/sign-in');
}

// set the user for the views
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current sign in user form the session cookie and we are just sending this to the loacls for the views 
        res.locals.user = req.user;
    }
    next();
}

// after this install install npm i express-session "for using the passport"
module.exports = passport;