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
    weight: Joi.number().min(0).required().label("Weight").messages({
        "number.min": "Weight must be at least 0",
        "number.base": "Weight must be a number",
        "any.required": "Weight is required"
    })
    
})





export const validationDimondPriceForm = (DimondFormData) => {
    const result = dimondSchema.validate(DimondFormData, { abortEarly: true }); // abortEarly: false = Show all errors

    if (!result.error) return null; // error null
    const newErrors = {};
    for (let item of result.error.details) {
        newErrors[item.path[0]] = item.message;
    }
    return newErrors;
}

// Validate only a specific field
export const validationDimondPriceField = (fieldName, fieldValue = {}) => {
    const fieldSchema = dimondSchema.extract(fieldName);
    const result = fieldSchema.validate(fieldValue);
    
    if (!result.error) return null;
    return result.error.message;
}