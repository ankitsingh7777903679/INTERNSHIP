const Joi = require('joi')

const validationDimond = (data) => {
    const Schema = Joi.object({
        shape: Joi.string().valid("round", "pear", "heart").required().messages({
            'any.only': 'Shape must be one of round, pear, or heart',
            'string.empty': 'Shape is required',
            'any.required': 'Shape is a required field'
        }),
        color: Joi.string().valid("G", "H", "I", "J").required().messages({
            'any.only': 'Color must be one of G, H, I, or J',
            'string.empty': 'Color is required',
            'any.required': 'Color is a required field'
        }),
        clarity: Joi.string().valid("SI1", "VS1", "VVS1", "VVS2").required().messages({
            'any.only': 'Clarity must be one of SI1, VS1, VVS1, or VVS2',
            'string.empty': 'Clarity is required',
            'any.required': 'Clarity is a required field'
        }),
        from: Joi.number().min(0).required().messages({
            'number.min': 'From must be at least 0',
            'number.base': 'From must be a number',
            'any.required': 'From is required'
        }),
        to: Joi.number().min(Joi.ref('from')).required().messages({
            'number.min': 'To must be greater than or equal to From',
            'number.base': 'To must be a number',
            'any.required': 'To is required'
        }),
        price: Joi.number().min(2).required().messages({
            'number.min': 'Price must be at least 2',
            'number.base': 'Price must be a number',
            'any.required': 'Price is required'
        }),
    })
    return Schema.validate(data);
}
module.exports = {validationDimond}