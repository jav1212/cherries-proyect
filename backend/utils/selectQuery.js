import pool from "../database/database.js"

const selectQuery = (columnas, tabla, condicion, grupo, callback) => {

    pool.query("SELECT " + columnas + " FROM " + tabla + condicion + grupo, (err, result) => {
        if (err) 
            callback(err, null)
        else
            callback(null, result)
    })
}

export default selectQuery