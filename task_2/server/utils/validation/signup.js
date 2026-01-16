
// username: Joi.string().required().label("Username").messages({
//     "string.empty": "Username is required"

// }),
// email: Joi.string().email().required().label("Email").messages({
//     "string.empty": "Email is required",
//     "string.email": "Invalid email format"
// }),
// password: Joi.string().min(5).required().label("Password").messages({
//     "string.empty": "Password is required",
//     "string.min": "Password must be at least 5 characters long"
// })


const Joi = require('joi')
const validationSignup = (data) => {
    const Schema = Joi.object({
        username: Joi.string().required().label("Username").messages({
            "string.empty": "Username is required"

        }),
        email: Joi.string().email().required().label("Email").messages({
            "string.empty": "Email is required",
            "string.email": "Invalid email format"
        }),
        password: Joi.string().min(5).required().label("Password").messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 5 characters long"
        })
    })
    return Schema.validate(data);
}

module.exports = { validationSignup }