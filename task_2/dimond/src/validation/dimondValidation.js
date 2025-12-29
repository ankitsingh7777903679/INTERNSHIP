import Joi from "joi"

// 1. Schema Define Karein (Rules)
const dimondSchema = Joi.object({
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
    from: Joi.number().min(0).required().label("From").messages({
        "number.min": "From must be at least 0",
        "number.base": "From must be a number",
        "any.required": "From is required"
    }),
    to: Joi.number().min(0).required().label("To").messages({
        "number.min": "To must be greater than or equal to From",
        "number.base": "To must be a number",
        "any.required": "To is required"
    }),
    price: Joi.number().min(2).required().label("Price").messages({
        "number.min": "Price must be at least 2",
        "number.base": "Price must be a number",
        "any.required": "Price is required"
    })
})

export const validationDimondForm = (DimondFormData) => {
    const result = dimondSchema.validate(DimondFormData, { abortEarly: true }); // abortEarly: false = Show all errors

    if (!result.error) return null; // error null
    const newErrors = {};
    for (let item of result.error.details) {
        newErrors[item.path[0]] = item.message;
    }
    return newErrors;
}

// Validate only a specific field
export const validationDimondField = (fieldName, fieldValue = {}) => {
    const fieldSchema = dimondSchema.extract(fieldName);
    const result = fieldSchema.validate(fieldValue);
    
    if (!result.error) return null;
    return result.error.message;
}