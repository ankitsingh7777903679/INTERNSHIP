import Joi from "joi"

const loginSchema = Joi.object({
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

export const validationSignup = (signupFormData) => {
    const result = loginSchema.validate(signupFormData, { abortEarly: true }); // abortEarly: false = Show all errors

    if (!result.error) return null; // error null
    const newErrors = {};
    for (let item of result.error.details) {
        newErrors[item.path[0]] = item.message;
    }
    return newErrors;
}