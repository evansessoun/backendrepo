const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")


const invCont = {}

/*
*Build inventory by classification view
*/
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

invCont.buildVehicleDetail = async function(req, res, next) {
    const vehicle_id = req.params.invId
    const detail = await invModel.getInventoryDetail(vehicle_id)
    const detail_page = await utilities.buildInventoryDetail(detail)
    let nav = await utilities.getNav()
    const vehicleName = detail[0].inv_year + ' '+ detail[0].inv_make +' ' + detail[0].inv_model
    res.render("./inventory/vehicle", {
        title: vehicleName,
        nav,
        detail_page,
    })
}

invCont.buildManagementPage = async function(req, res, next) {
    const management_page = await utilities.buildManagementView()
    let nav = await utilities.getNav()
    res.render("inventory/management", {
        title: "Vehicle Management",
        nav,
        management_page,
        errors:null
    })
}

invCont.buildNewClassificationPage = async function(req,res, next) {
    const newClassPage = await utilities.buildNewClassification()
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
        title: "Add New Classification",
        nav,
        newClassPage,
        scripts: '<script src="/js/addClassification.js"></script>',
        errors:null
    })
   

}

invCont.updateClassificationPage = async function(req,res, next) {
    const {classification_name} = req.body
    try{
        await invModel.setClassification(classification_name)
    } catch (error){
        req.flash("notice", 
            "Sorry, there was an error updating vehicle classification.")
    }
    invCont.buildNewClassificationPage(req, res, next)

}

invCont.buildInventoryPage = async function(req,res, next) {
    let data = res.locals
    console.log(data)
    const newInvPage = await utilities.buildNewInventory(data)
    let nav = await utilities.getNav()
    res.render("inventory/add-inventory", {
        title: "Add New Inventory",
        nav,
        newInvPage,
        errors:null
    })

}

invCont.updateInventoryPage = async function(req,res, next) {
    const {classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color} = req.body
    try{
        await invModel.setInventory(classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color)

        req.flash(
            "notice",
            `Congratulations, you\'ve added ${inv_make} ${inv_model} to inventory `
        )
    } catch (error){
        req.flash("notice", 
            "Sorry, there was an error updating vehicle inventory.")
    }
    invCont.buildInventoryPage(req, res, next)

}

invCont.buildErrorPage = async function(req, res,next) {
    const err = "Intentional Error"
    const error_link = await utilities.buildError(err)
    let nav = await utilities.getNav()
    res.render("./intError", {
        title: err,
        nav,
        error_link
    })
}

module.exports = invCont