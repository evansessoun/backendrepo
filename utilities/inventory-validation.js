const utilities = require(".")
const invModel = require("../models/inventory-model")
const {body, validationResult} =  require("express-validator")
const validate = {}

/*
* Inventory Classification Update Data Validation Rules
* Unit 4, server-side activity
*/

validate.classificationRules = () => {
    return [
        //name is required and must be string
        body("classification_name")
            .trim()
            .isString()
            .isLength({min: 1})
            .matches(/^[A-Za-z]+$/)
            .withMessage("Enter Alphabets with no spaces and special characters"),
    ]
}

validate.checkClassificationData = async (req, res, next) => {
    const {classification_name} = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        let newClassPage = await utilities.buildNewClassification()
        res.render("inventory/add-classification", {
            errors,
            title: "Add New Classification",
            nav,
            newClassPage,
            classification_name,
        })
        return
    }
    next()
}

validate.inventoryRules = () => {
    return [
        //inv_make is required and must be string
        body("inv_make")
            .trim()
            .isString()
            .isLength({min: 3})
            .matches(/^[A-Za-z]+$/)
            .withMessage("Enter Alphabets of 3 minimum characters"),
        
        //inv_model is required and must be string
        body("inv_model")
            .trim()
            .isString()
            .isLength({min: 3})
            .matches(/^[A-Za-z]+$/)
            .withMessage("Enter Alphabets of 3 minimum characters"),
        
        //inv_model is required and must be string
        body("inv_description")
            .isString()
            .isLength({min: 1})
            .withMessage("Enter Alphabets of 1 minimum characters"),
        
        //inv_image is required and must be string
        body("inv_image")
            .trim()
            .isString()
            .isLength({min: 1})
            .withMessage("Enter a valid image URL"),

        //inv_thumbnail is required and must be string
        body("inv_thumbnail")
            .trim()
            .isString()
            .isLength({min: 1})
            .withMessage("Enter a valid thumbnail URL"),

        //inv_price is required and must be whole numbers no decimals
        body("inv_price")
            .trim()
            .isInt()
            .withMessage("Enter a valid price, No decimals"),

        //inv_year is required and must be integers between 1000 and 9999
        body("inv_year")
            .trim()
            .isNumeric({min:1000, max:9999})
            .withMessage("Enter a valid 4-digit year"),

        //inv_miles is required and must be integers
        body("inv_miles")
            .trim()
            .isInt()
            .withMessage("Enter a mileage value, Integers ONLY"),

        //inv_color is required and must be string
        body("inv_color")
            .trim()
            .isString()
            .isLength({min: 1})
            .withMessage("Enter a color name"),
        
    ]
}

validate.checkInventoryData = async (req, res, next) => {
    const {classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color} = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.locals.formData = req.body
        let nav = await utilities.getNav()
        let newInvPage = await utilities.buildNewInventory(res.locals.formData)
        res.render("inventory/add-inventory", {
            errors,
            title: "Add New Inventory",
            nav,
            newInvPage,
            classification_id,
            inv_make,
            inv_model,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_year,
            inv_miles,
            inv_color
        })
        return
    }
    next()
}


module.exports = validate