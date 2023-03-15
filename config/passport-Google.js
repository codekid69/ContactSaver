const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/User');
require('dotenv').config();
// using the google strategy
passport.use(new googleStrategy({
    clientID: process.env.ID,
    clientSecret:process.env.SECERET,
    callbackURL: 'http://localhost:8000/user/auth/google/callback'
},

    // if acesstoken expries then then refreshtoken get the new one without asking the  user to login
    function (accessToken, refreshToken, profile, done) {

        // finding the user in db 
        User.findOne({ email: profile.emails[0].value }).exec(function (error, user) {
            if (error) {
                console.log(error);
                return;
            }
            console.log(profile);

            // if user  found set it to req.user
            if(user){
                return done(null,user);
            }

            // if not then create the user
            else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(error,user){
                    if(error){
                        console.log(error);
                        return;
                    }
                    return done(null,user);
                })
            }
        })
    }

))

module.exports=passport;