// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")

// Route to build inventory by classification view
router.get("/type/:classificationId",utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:invId",utilities.handleErrors(invController.buildVehicleDetail));
router.get("/:intError",utilities.handleErrors(invController.buildErrorPage));

module.exports = router;