import pool from "../database/database.js"
import insertQuery from "../utils/insertQuery.js"
import selectQuery from "../utils/selectQuery.js"

const variedadPaisesGet = (req, res) => {
    selectQuery("id, nombre", "fah_paises", '', '', (err, result) => { 
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const variedadesGet = (req, res) => {
    selectQuery("id, nombre", "fah_variedadescrz", '', '', (err, result) => { 
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const variedadPost = (req, res) => {
    const {id_pais, nombre, especie, preco, descrip} = req.body

    const valores = id_pais + ", '"+ nombre + "', '" + especie + "', '" + preco + "', '" + descrip + "'" 

    insertQuery('variedadescrz', '', ' (id, id_pais, nombre, especie, preco, descrip)', valores, (err, result) => {
        if (err)
            res.status(500).json(err)
        else
            res.json(result)
    })
}

const precioVariedadGet = (req, res) => {
    let paises = []
    let variedades = []

    selectQuery("id, nombre", "fah_paises", '', '', (err, result) => { 
        if (err)
            res.status(500).send(err)
        else{
            paises = result

            selectQuery("id, nombre", "fah_variedadescrz", '', '', (err, result) => { 
                if (err)
                    res.status(500).send(err)
                else{
                    variedades = result
                    res.json({paises, variedades})
                }
            })
        }
    }) 
}

const precioVarActualGet = (req, res) => {
    const {id_pais, id_crz, calibre} = req.body

    const condicion = " WHERE id_pais = "+ id_pais + " AND id_crz = "+ id_crz + " AND calibre = '" + calibre + "' AND fe_f IS NULL"

    selectQuery("id, precio, calibre", "fah_precioscrzpais", condicion, '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const precioVariedadPost = (req, res) => {
    const {id_pais, id_crz, precio, calibre} = req.body

    const condicion = " WHERE id_pais = " + id_pais + " AND id_crz = "+ id_crz
    const valores = id_pais + ", " + id_crz + ", " + precio + ", '" + calibre + "', CURDATE()" 

    insertQuery('precioscrzpais', condicion ,' (id, id_pais, id_crz, precio, calibre, fe_i)', valores, (err, result) => {
        if (err)
            res.status(500).json(err)
        else
            res.json(result)
    })
}

const cancelarPrecioPost = (req, res) => {
    const {id_pais, id_crz, id} = req.body

    pool.query("UPDATE fah_precioscrzpais SET fe_f = CURDATE() WHERE id_pais = "+ id_pais + " AND id_crz = "+ id_crz + " AND id = "+ id , (err, result) => {
        if (err)
            res.status(500).json(err)
        else
            res.json(result)
    })
}

export const variedadController = {
    variedadPaisesGet, variedadPost, precioVariedadGet, precioVarActualGet, precioVariedadPost, cancelarPrecioPost, variedadesGet
}