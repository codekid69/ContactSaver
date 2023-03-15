const express=require('express');
const app=express();
const port=process.env.PORT || 8000;
const db=require('./config/mongoose');
const cookie=require('cookie-parser');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport');
const googleStrategy=require('./config/passport-Google');
const MongoStore=require('connect-mongo');
const flash=require('connect-flash');
const customMiddleware=require('./config/middleware');
const expressEjsLayouts=require('express-ejs-layouts');
require('dotenv').config();
app.use(express.urlencoded());
app.use(cookie());
app.use(expressEjsLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.static('./assets'));
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'Contact-App',
    secret:'ENCRYPTEDKEY',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl:process.env.DATABASE,
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);
app.use('/',require('./routes/index'))
app.listen(port,function(error){
    if(error){
        console.log(`Error ${error}`);
        return;
    }
    console.log(`Server Running on Port ${port}`);
})