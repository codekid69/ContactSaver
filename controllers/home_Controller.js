const User = require('../models/User');
module.exports.home = async function (req, res) {
    try {
        if(req.user){

            const user=await User.findOne({email:req.user.email}).populate('contacts');
            return res.render('home', {
                title: "Home",
                user: user
            });
        }
        else{
            return res.render('home', {
                title: "Home"
            });
        }
    } catch (error) {
        console.log("error"+error);
        return res.redirect('/contact-app')
    }
}