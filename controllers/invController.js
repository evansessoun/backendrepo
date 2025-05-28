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