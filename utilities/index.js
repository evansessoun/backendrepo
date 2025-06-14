const invModel = require("../models/inventory-model")
const Util = {}

/*
*Constructs the nav HTML unordered list
*/
Util.getNav = async function (req, res, next){
    let data = await invModel.getClassifications()
    let list = "<ul>"
    list += '<li><a href="/" title="Home Page">Home</a></li>'
    data.rows.forEach((row) => {
        list += "<li>"
        list += 
            '<a href="/inv/type/' +
            row.classification_id + '" title="See our inventory of ' +
            row.classification_name +
            ' vehicle">' +
            row.classification_name + "</a>"
        list += "</li>"
    })
    list += "</ul>"
    return list
}

/*
* Build the classification view HTML
*/
Util.buildClassificationGrid = async function(data) {
    let grid
    if(data.length > 0) {
        grid = '<ul id="inv-display">'
        data.forEach(vehicle => {
            grid += '<li>'
            grid += '<a href ="../../inv/detail/' + vehicle.inv_id +'" '
            + 'title= "View ' + vehicle.ivn_make + ' '+ vehicle.inv_model
            + 'details"> <img src="' + vehicle.inv_thumbnail
            + '" alt="Image of' + vehicle.inv_make + ' ' + vehicle.inv_model
            + ' on CSE Motors"></a>'
            grid += '<div class = "namePrice">'
            grid += '<hr>'
            grid += '<h2>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
            + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
            + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
            grid += '</h2>'
            grid += '<span>$'
            + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
            grid += '</div>'
            grid += '</li>'
        })
        grid += '</ul>'
    } else {
        grid += '<p class= "notice"> Sorry, no matching vehicles could be found. </p>'
    }
    return grid
}


/*
* Build the vehicle detail HTML
*/
Util.buildInventoryDetail = async function(detail) {
    let detail_page
    if(detail.length > 0) {
        detail_page = '<div id="vehicle-page">'
        detail_page += '<img src="' + detail[0].inv_image + '" alt= "Image of' 
        + detail[0].inv_year +detail[0].inv_make + detail[0].inv_model + '">'
        detail_page += '<div id="vehicle-info">' 
        detail_page += '<h2 id="vehicle-heading">' + detail[0].inv_make + ' '+ detail[0].inv_model + ' Details'
        detail_page +='</h2>'
        detail_page += '<h3>'+ '$ '+ new Intl.NumberFormat('en-US').format(detail[0].inv_price) + '</h3>'
        detail_page += '<p><span>Description: </span>' + detail[0].inv_description + '</p>'
        detail_page += '<p><span>Color: </span>' + detail[0].inv_color + '</p>'
        detail_page += '<p><span>Miles: </span>' + new Intl.NumberFormat('en-US').format(detail[0].inv_miles) + '</p>'
        detail_page += '</div>'
        detail_page += '</div>'
    }else {
        detail_page += '<p class= "notice"> Sorry, no detail information for this vehicle. </p>'
    }
    return detail_page
}

Util.buildError = async function(err) {
    let error_page
    error_page += '<div id= "error-screen">'
    error_page += '<p>This is '
    error_page += err
    error_page += '</p></div>'

    return error_page
}


Util.buildManagementView = function() {
    let management_page = '<div id="management-page">'  
    management_page += '<a href="/inv/addClassification"> Add New Classification</a>'
    management_page += '<br>'
    management_page += '<a href="/inv/addVehicle"> Add New Vehicle</a>'
    management_page += ' '
    management_page += '</div>'

    return management_page
}

Util.buildNewClassification = function() {
    let newClassPage = '<div id="new-classification">'  
    newClassPage += '<p><i>FIELD IS REQUIRED</i></p>'
    newClassPage += '<br>'
    newClassPage += '<form class="classification-form" action="/inv/addedClassification" method="post">'
    newClassPage += '<label for="classification_name">Classification Name</label>'
    newClassPage += '<br>'
    newClassPage += '<span><i>NAME MUST BE ALPHABETIC CHARACTERS ONLY</i></span>'
    newClassPage += '<br>'
    newClassPage += '<input type="text" name="classification_name" id="classification_name" required pattern="^[a-zA-Z]+$">'
    newClassPage += '<br>'
    newClassPage += '<button type="submit" id="submitBtn">Add Classification</button>'
    newClassPage += '<br>'
    newClassPage += '</form>'
    newClassPage += '</div>'

    return newClassPage
}

/////////////////////////////////////////////
Util.buildClassificationList = async function (classification_id = null) {
    let data = await invModel.getClassifications()
    let classificationList =
      '<select name="classification_id" id="classificationList" required>'
    classificationList += "<option " + `value="${data.classification_id || ''}"` +'>' + "Choose a Classification</option>"
    data.rows.forEach((row) => {
      classificationList += '<option value="' + row.classification_id + '"'
      if (
        classification_id != null &&
        row.classification_id == classification_id
      ) {
        classificationList += " selected "
      }
      classificationList += ">" + row.classification_name + "</option>"
    })
    classificationList += "</select>"
    return classificationList
  }

Util.buildNewInventory = async function(data = {}) {
    let classificationList = await Util.buildClassificationList();
    let newInvPage = '<div id="new-inventory">'  
    newInvPage += '<p><i>ALL FIELDS ARE REQUIRED</i></p>'
    newInvPage += '<br>'
    newInvPage += '<form class="inventory-form" action="/inv/addVehicle" method="post">'
    newInvPage += '<br>'
    newInvPage += '<label for="classificationList">Classification</label>'
    newInvPage += classificationList
    newInvPage += '<label for="inv_make">Make</label>'
    newInvPage += '<input type="text" name="inv_make" id="inv_make" required pattern="^[a-zA-Z]+$" placeholder="min of 3 characters" minlength="3" '+  `value="${data.inv_make || ''}"` +'>'
    newInvPage += '<br>'
    newInvPage += '<label for="inv_model">Model</label>'
    newInvPage += '<input type="text" name="inv_model" id="inv_model" required pattern="^[a-zA-Z]+$" placeholder="min of 3 characters" minlength="3" '+ `value="${data.inv_model || ''}"` +'>'
    newInvPage += '<br>'
    newInvPage += '<label for="inv_description">Description</label>'
    newInvPage += '<textarea name="inv_description" id="inv_description" required rows="5" cols="50" '+'>' + `${data.inv_description || ''}` + '</textarea>'
    newInvPage += '<br>'
    newInvPage += '<label for="inv_image">Image Path</label>'
    newInvPage += '<input type="text" name="inv_image" id="inv_image" required '+ `value="${data.inv_image || ''}"` +'>'
    newInvPage += '<br>'
    newInvPage += '<label for="inv_thumbnail">Thumbnail Path</label>'
    newInvPage += '<input type="text" name="inv_thumbnail" id="inv_thumbnail" required '+ `value="${data.inv_thumbnail || ''}"` +'>'
    newInvPage += '<br>'
    newInvPage += '<label for="inv_price">Price</label>'
    newInvPage += '<input type="number" name="inv_price" id="inv_price" required '+ `value="${data.inv_price || ''}"` +'>'
    newInvPage += '<br>'
    newInvPage += '<label for="inv_year">Year</label>'
    newInvPage += '<input type="number" name="inv_year" id="inv_year" step="1" required placeholder="4-digit year" min="1000" max="9999" '+ `value="${data.inv_year || ''}"` +'>'
    newInvPage += '<br>'
    newInvPage += '<label for="inv_miles">Miles</label>'
    newInvPage += '<input type="number" name="inv_miles" id="inv_miles" step="1" required placeholder="digits only" '+ `value="${data.inv_miles || ''}"` +'>'
    newInvPage += '<label for="inv_color">Color</label>'
    newInvPage += '<input type="text" name="inv_color" id="inv_color"  required pattern="^[a-zA-Z]+$" '+ `value="${data.inv_color || ''}"` +'>'

    newInvPage += '<br>'
    newInvPage += '<button type="submit" id="submitBtn">Add Classification</button>'
    newInvPage += '<br>'
    newInvPage += '</form>'
    newInvPage += '</div>'

    return newInvPage
}


/*
*Middlewae fro handling Errors
*Wrap other function in this for 
*General Error Handling
*/
Util.handleErrors = fn =>(req, res, next) => Promise.resolve(fn(req,res, next)).catch(next)

module.exports = Util