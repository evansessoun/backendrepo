const pool = require("../database/")

/*
* Get all classification data
*/
async function getClassifications(){
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")   
}

/* 
* Get all inventory items and classification_name by classification_id
*/
async function getInventoryByClassificationId(classification_id) {
    try{
        const data = await pool.query(
            `SELECT * FROM public.inventory AS i
            JOIN public.classification AS c
            ON i.classification_id = c.classification_id
            WHERE i.classification_id = $1`, [classification_id]
        )
        return data.rows
    } catch (error) {
        console.error("getclassificationsbyid error " + error)
    }
}

async function getInventoryDetail(inv_id) {
    try{
        const detail = await pool.query(
            `SELECT * FROM public.inventory AS inventory
            WHERE inventory.inv_id = $1`, [inv_id]
        )
        return detail.rows
    }catch (error) {
        console.error("getInventoryDetail error" + error)
    }
}

async function setClassification(classification_name) {
    try{
        const value = await pool.query(
            `INSERT INTO public.classification (classification_name) VALUES ($1)`, [classification_name]
        )
    } catch (error) {
        console.error("setClassification error: " + error)
    }
}

async function setInventory(classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color) {
    try{
        const value = await pool.query(
            `INSERT INTO public.inventory(classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color]
        )
    } catch (error) {
        console.error("setInventory error: " + error)
    }
}



module.exports = {getClassifications, getInventoryByClassificationId, getInventoryDetail, setClassification, setInventory}