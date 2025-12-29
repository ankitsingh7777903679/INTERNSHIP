import Joi from "joi"

// 1. Schema Define Karein (Rules)
const addDimondSchema = Joi.object({
    stockId: Joi.string().required().label("Stock ID").messages({
        "string.empty": "Stock ID is required"
    }),
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
    }),
    rap: Joi.number().min(0).required().label("Rap").messages({
        "number.min": "Rap must be at least 0",
        "number.base": "Rap must be a number",
        "any.required": "Rap is required"
    }),
    discount: Joi.number().required().label("Discount").messages({
        "number.base": "Discount must be a number",
        "any.required": "discount is required"
    }),
    pricePerCarat: Joi.number().required().label("Price Per Carat").messages({
        "number.base": "Price Per Carat must be a number",
        "any.required": "Price Per Carat is required"
    }),
    amount: Joi.number().required().label("Amount").messages({
        "number.base": "Amount must be a number",
        "any.required": "Amount is required",
    })
    
})





export const validationAddDimondForm = (DimondFormData) => {
    const result = addDimondSchema.validate(DimondFormData, { abortEarly: true }); // abortEarly: false = Show all errors

    if (!result.error) return null; // error null
    const newErrors = {};
    for (let item of result.error.details) {
        newErrors[item.path[0]] = item.message;
    }
    return newErrors;
}

// Validate only a specific field
export const validationAddDimondField = (fieldName, fieldValue = {}) => {
    const fieldSchema = addDimondSchema.extract(fieldName);
    const result = fieldSchema.validate(fieldValue);
    
    if (!result.error) return null;
    return result.error.message;
}