// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId",utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:invId",utilities.handleErrors(invController.buildVehicleDetail));
router.get("/error",utilities.handleErrors(invController.buildErrorPage));
router.get("/", utilities.handleErrors(invController.buildManagementPage));
router.get("/addClassification", utilities.handleErrors(invController.buildNewClassificationPage));
router.post("/addedClassification",
    invValidate.classificationRules(),
    invValidate.checkClassificationData,
    utilities.handleErrors(invController.updateClassificationPage));

router.get("/addVehicle", utilities.handleErrors(invController.buildInventoryPage));
router.post("/addVehicle",
    invValidate.inventoryRules(),
    invValidate.checkInventoryData,
    utilities.handleErrors(invController.updateInventoryPage));



module.exports = router;