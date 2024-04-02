import insertQuery from "../utils/insertQuery.js"
import selectQuery from "../utils/selectQuery.js"

const ciudadregionGet = (req, res) => {
    selectQuery("id, nombre", " fah_paises", '', '', (err, result) => { 
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const ciudadregionPost = (req, res) => {
    const {tabla, id_pais, nombre} = req.body

    const condicion = " WHERE id_pais = "+ id_pais

    const valores = id_pais + ", '"+ nombre + "'"
    insertQuery(tabla, condicion, ' (id, id_pais, nombre)', valores, (err, result) => {
        if (err)
            res.status(500).json(err)
        else
            res.json(result)
    })
}

const paisPost = (req, res) => {
    const {nombre, continent} = req.body

    const valores = "'"+ nombre + "', '" + continent + "'"
     
    insertQuery('paises', '', ' (id, nombre, continent)', valores, (err, result) => {
        if (err){
                if (err.code === 'ER_DUP_ENTRY'){
                    const {code, sqlMessage} = err
                    res.json({ error: code, sqlMessage})
                }
                else
                    res.status(500)
        }
        else
            res.json(result)
    })
}

const ciudadesPost = (req, res) => {
    const {id_pais} = req.body

    selectQuery("c.id, c.nombre", " fah_ciudades c", " WHERE id_pais = " + id_pais, '', (err, result) => { 
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

export const lugarController = {
    paisPost, ciudadregionPost, ciudadregionGet, ciudadesPost
}