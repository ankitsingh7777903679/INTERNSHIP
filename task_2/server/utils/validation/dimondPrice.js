const Joi = require('joi')
const validationDimondPrice = (data) => {
    const Schema = Joi.object({
        shape: Joi.string().valid("round", "pear", "heart").required().label("Shape").messages({
                "any.only": "Shape must be one of round, pear, or heart",
                "string.empty": "Shape is required"
            }),
            color: Joi.string().valid("G", "H", "I", "J").required().label("Color").messages({
                "any.only": "Color must be one of G, H, I, or J",
                "string.empty": "Color is required"
            }),
            clarity: Joi.string().valid("SI1", "VS1", "VVS1", "VVS2").required().label("Clarity").messages({
                "any.only": "Clarity must be one of SI1, VS1, VVS1, or VVS2",
                "string.empty": "Clarity is required"
            }),
            size: Joi.number().min(0).required().label("Size").messages({
                "number.min": "Size must be at least 0",
                "number.base": "Size must be a number",
                "any.required": "Size is required"
            }),
            weight: Joi.number().min(0).required().label("Weight").messages({
                "number.min": "Weight must be at least 0",
                "number.base": "Weight must be a number",
                "any.required": "Weight is required"
            })
    })
    return Schema.validate(data);
}

module.exports = {validationDimondPrice}