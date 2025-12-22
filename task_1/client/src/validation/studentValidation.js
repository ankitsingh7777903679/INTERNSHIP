import Joi from 'joi';

// 1. Schema Define Karein (Rules)
const studentSchema = Joi.object({
    name: Joi.string().min(3).required().label("Name").messages({
        "string.min": "Name should be at least 3 characters",
        "string.empty": "Name is required"
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().label("Email").messages({
        "string.email": "Please enter a valid email",
        "string.empty": "Email is required"
    }),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required().label("Phone").messages({
        "string.length": "Phone must be exactly 10 digits",
        "string.pattern.base": "Phone must contain only numbers",
        "string.empty": "Phone is required"
    }),
    stream: Joi.string().required().label("Stream").messages({
        "string.empty": "Stream is required"
    }),
    class: Joi.string().required().label("Class").messages({
        "string.empty": "Class is required"
    }),
    subject: Joi.array().min(1).required().label("Subject").messages({
        "array.min": "At least one subject is required",
        "any.required": "Subject is required"
    })
});

// 2. Validation Function 
export const validateStudentForm = (formData) => {
    const result = studentSchema.validate(formData, { abortEarly: false }); // abortEarly: false = Show all errors

    if (!result.error) return null; // error null

    
    const newErrors = {};
    for (let item of result.error.details) {
        newErrors[item.path[0]] = item.message;
    }
    return newErrors;
};