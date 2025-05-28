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

/*
*Middlewae fro handling Errors
*Wrap other function in this for 
*General Error Handling
*/
Util.handleErrors = fn =>(req, res, next) => Promise.resolve(fn(req,res, next)).catch(next)

module.exports = Util