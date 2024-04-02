import insertQuery from "../../utils/insertQuery.js"
import selectQuery from "../../utils/selectQuery.js"

const asociacionesRegGet = (req, res) => {
    const {id_pais} = req.body
    selectQuery("r.id, r.nombre", " fah_regiones r", " WHERE r.id_pais = " + id_pais, '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const asociacionesRegPost = (req, res) => {
    const {id_pais, id_reg, nombre} = req.body
    const valores = id_pais + ", " + id_reg + ", '" + nombre + "'"
    insertQuery('asociacionesregionales', '', " (id, id_pais, id_reg, nombre)", valores, (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

export const asocRegController = {
    asociacionesRegGet, asociacionesRegPost
}