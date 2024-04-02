import pool from "../../../database/database.js";
import selectQuery from "../../../utils/selectQuery.js"

const catalogoGet = (req, res) => {
    let productoras = []
    let proveedores = []

    selectQuery("e.id, e.nombre", "fah_empresasproductoras e", '', '', (err, result) => { //
        if (err)
            res.status(500).send(err)
        
        else {
            productoras = result

            selectQuery("p.id, p.nombre", "fah_proveedores p", '', '', (err, result) => {
                if (err)
                    res.status(500).send(err)
                else{
                    proveedores = result
                    res.json({productoras, proveedores})
                }
            })
        }
    })
}

const catalogoPost = (req, res) => {
    const {id_prod, id_prove} = req.body

    pool.query("INSERT INTO fah_catalogoproveedores (id_prod, id_prove) VALUES (" + id_prod + ", " + id_prove + ")", (err, result) => {
        if (err)
            res.status(500).json(err)
        else
            res.json(result)
    })
}

export const catalogoController = {
    catalogoGet, catalogoPost
}