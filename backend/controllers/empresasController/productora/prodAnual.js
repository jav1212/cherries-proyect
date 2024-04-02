import pool from "../../../database/database.js"
import selectQuery from "../../../utils/selectQuery.js"

const getCultivosPost = (req, res) => {
    const {id_prod} = req.body

    const condicion = " WHERE c.id_prod = " + id_prod + " AND c.id_crz = v.id"

    selectQuery("v.id variedad, v.nombre nombre, c.id cultivo, c.calibre calibre", " fah_variedadescrz v, fah_cultivos c ", condicion, '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const prodAnualPost = (req, res) => {
    let {id_prod, id_crz, id_cult, anio, prod_log} = req.body

    anio = "STR_TO_DATE('" + anio + "', '%Y')"

    const valores = "("+id_prod + ", " + id_crz + ", " + id_cult + ", " + anio + ", " + prod_log + ")"

    pool.query('INSERT INTO fah_producanuales (id_prod, id_crz, id_cult, anio, prod_log) VALUES '+ valores, (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)    
    })
}

export const prodAnualController = {
    getCultivosPost, prodAnualPost
}