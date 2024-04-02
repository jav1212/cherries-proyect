import selectQuery from "../../../utils/selectQuery.js"
import insertQuery from "../../../utils/insertQuery.js"

const proveedorGet = (req, res) => {
    let paises = []
    let ramasNeg = []

    selectQuery("p.id, p.nombre", "fah_paises p", '', '',(err, result) => { 
        if (err)
            res.status(500).send(err)
        else{
            paises = result

            selectQuery("r.id, r.nombre", "fah_ramasnegocio r", '', '',(err, result) => {
                if (err)
                    res.status(500).send(err)
                else{
                    ramasNeg = result
                    res.json({paises, ramasNeg})
                }
            })
        }
    })    
}

const proveedorPost = (req, res) => {
    const {rama_neg, id_pais, id_cdad, nombre} = req.body

    const valores = rama_neg + ", " + id_pais + ", " + id_cdad + ", '" + nombre + "'"

    insertQuery('proveedores', '', " (id, rama_neg, id_pais, id_cdad, nombre)", valores, (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const ramaNegocioPost = (req, res) => {
    const {nombre} = req.body
    const valores = "'" + nombre + "'"

    insertQuery('ramasnegocio', '', " (id, nombre)", valores, (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

export const proveedorController = {
    proveedorGet, proveedorPost, ramaNegocioPost
}