import insertQuery from "../../utils/insertQuery.js"
import selectQuery from "../../utils/selectQuery.js"

const ciudadesGet = (req, res) => {
    const {id_pais} = req.body
    const condicion = " WHERE c.id_pais = "+ id_pais + " "
    selectQuery("c.id, c.nombre", " fah_ciudades c", condicion, '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const empresasClientePost = (req, res) => {
    const {nombre, direc, t_negocio, rgo_inf, rgo_sup, prt_acep, id_pais, id_cdad} = req.body
    
    const valores = "'" + nombre + "', '" + direc + "', '" + t_negocio + "', " + rgo_inf + ", " + rgo_sup + ", " + prt_acep + ", " + id_pais + ", " + id_cdad 
    
    insertQuery('empresascliente', '', " (id, nombre, direc, t_negocio, rgo_inf, rgo_sup, prt_acep, id_pais, id_cdad)", valores, (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const empresasClienteGet = (req, res) => {
    selectQuery("c.id, c.nombre", " fah_empresascliente c", '', '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })    
}

export const clienteController = {
    ciudadesGet, empresasClientePost, empresasClienteGet
}