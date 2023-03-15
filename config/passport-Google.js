const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/User');
require('dotenv').config();
// using the google strategy
passport.use(new googleStrategy({
    clientID: process.env.ID,
    clientSecret: process.env.SECRET,
    callbackURL: 'http://localhost:8000/user/auth/google/callback'
},

    // if acesstoken expries then then refreshtoken get the new one without asking the  user to login
    async function (accessToken, refreshToken, profile, done) {
        try {
            // finding the user in db 
            let user = await User.findOne({ email: profile.emails[0].value });
            console.log(profile);
            // if user  found set it to req.user
            if (user) {
                return done(null, user);
            }
            // if not then create the user
            else {
                let user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });
                try {
                    user.save();
                } catch (error) {
                    console.log(error);
                }
            }
        }catch(error){
            console.log(error);
        }  
    }

))

module.exports = passport;