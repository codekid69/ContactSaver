module.exports.signup = function (req, res) {
    return res.render('signup', {
        title: "Sign-Up"
    })
}
module.exports.signin = function (req, res) {
    return res.render('signin', {
        title: "Sign-In"
    })
}

//SIgn Up
const { registerValidation } = require('../validation');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
module.exports.createUser = async function (req, res) {
    const { error } = registerValidation(req.body);
    if (error) {
        req.flash('error',"" + error);
        return res.redirect('back');
    }
    if (req.body.password !== req.body.confirmpassword) {
        req.flash('error','Password and ConfirmPassword not matched');
        return res.redirect('back');
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        req.flash('error','User Already Exist');
        return res.redirect('back');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
    const register = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        register.save();
        req.flash('success','Registration Sucessfull');
        return res.redirect('/contact-app/user/sign-in')
    } catch (error) {
        console.log(error);
    }
}

//Log in
module.exports.createSession = function (req, res) {
    req.flash('success','Logged In');
    return res.redirect('/contact-app');
}

//Add Contact
const Contact = require('../models/Contact');
const {contactValidation}=require('../validation');
module.exports.createContact = async function (req, res) {
    try {
        const {error}=contactValidation(req.body);
        if(error){
            req.flash('error',""+error);
            return res.redirect('back');
        }
        let user = await User.findById(req.user.id);
        const contact = await Contact.create({
            name: req.body.name,
            contact: req.body.contact
        });
        user.contacts.push(contact);
        user.save();
        req.flash('success','Contact Added');
        return res.redirect('back');

    } catch (error) {
        console.log(error);
    }
}
//delete Contact
module.exports.delete = async function (req, res) {
    try {
        let contact = await Contact.findByIdAndDelete(req.params.id);
        req.flash('success','Contact Deleted');
        return res.redirect('back');

    } catch (error) {
        console.log(error);
    }

}

// logout
module.exports.destroySession = function (req, res) {
    // this logout function is provided by the passport js to remove the cookies and help us to log out
    req.logout(function (error) {
        if (error) {
            console.log(error);
            return;
        }
        req.flash('success','Logged Out');
        return res.redirect('/contact-app/user/sign-in');
    })
}