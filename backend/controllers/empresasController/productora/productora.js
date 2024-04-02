import insertQuery from "../../../utils/insertQuery.js";
import selectQuery from "../../../utils/selectQuery.js"

const productoraRegGet = (req, res) => {  
    selectQuery("r.id_pais, r.id, r.nombre", "fah_regiones r", '', '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const productoraAsocRegGet = (req, res) => {
    const {id_pais, id_reg} = req.body
    selectQuery("a.id, a.nombre", "fah_asociacionesregionales a", " WHERE id_reg = " + id_reg + " AND id_pais = " + id_pais, '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    }) 
}

const productoraCoopPost = (req, res) => {
    const {id_pais, id_reg} = req.body
    const condicion = " WHERE e.tipo = 'Cooperativa' AND e.id_pais = " + id_pais + " AND e.id_reg = " + id_reg + " "
    selectQuery("e.id, e.nombre", "fah_empresasproductoras e", condicion, '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else{
            console.log(result)
            res.json(result)
        }
    }) 
}

const productorasGet = (req, res) => {
    selectQuery("p.id, p.nombre", "fah_empresasproductoras p", '', '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })    
}

const productorasPaisesGet = (req, res) => {
    selectQuery("p.id, p.nombre, p.id_pais", "fah_empresasproductoras p", '', '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })    
}

const productoraPost = (req, res) => {
    const {id_pais, id_reg, nombre, tipo, direc, envase, id_asoc, id_coop} = req.body

    let valores = id_pais + ", "+ id_reg + ", '" + nombre + "', '" + tipo + "', '" + direc + "', '" + envase + "'"
    let columnas = " (id, id_pais, id_reg, nombre, tipo, direc, envase"

    if (id_asoc != ''){
        valores+= ", " + id_asoc
        columnas+= ", id_asoc"
    }
    if (id_coop != ''){
        valores+= ", "+ id_coop
        columnas+=  ", id_coop"
    }

    insertQuery('empresasproductoras', '', columnas + ") ", valores, (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

export const prodController = {
    productoraRegGet, productoraPost, productoraAsocRegGet, productoraCoopPost, 
    productoraPost, productorasGet, productorasPaisesGet
}