const Joi = require('@hapi/joi');

module.exports.registerValidation=(data) => {
    const Rschema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().min(7).required(),
        password: Joi.string().min(6).required(),
        confirmpassword: Joi.string().min(6).required()
    })
     return Rschema.validate(data);
}
module.exports.contactValidation=(data) => {
    const Rschema = Joi.object({
        name: Joi.string().min(4).required(),
        contact:Joi.string().min(10).required()
    })
     return Rschema.validate(data);
}