const Joi = require('joi')

const validateStudent = (data) => {
    const Schema = Joi.object({
        name: Joi.string().min(3).required().messages({
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name should have a minimum length of 3',
            'any.required': 'Name is a required field'
        }),

        email: Joi.string().email().trim().lowercase().required().messages({
            'string.email': 'Please enter a valid email',
            'any.required': 'Email is required'
        }),

        phone: Joi.string()
            .length(10)
            .pattern(/^[0-9]+$/)
            .required()
            .messages({
                'string.length': 'Phone number must be exactly 10 digits',
                'string.pattern.base': 'Phone number must contain only numbers',
                'any.required': 'Phone number is required'
            }
        ),
        stream: Joi.string().required().messages({
            'string.empty': 'Stream cannot be empty',
            'any.required': 'Stream is a required field'
        }),
        class: Joi.string().required().messages({
            'string.empty': 'Class cannot be empty',
            'any.required': 'Class is a required field'
        }),
        subject: Joi.array().min(1).required().messages({
            'array.min': 'At least one subject is required',
            'any.required': 'Subject is a required field'
        }),
    })
    return Schema.validate(data);
}

module.exports = {validateStudent}