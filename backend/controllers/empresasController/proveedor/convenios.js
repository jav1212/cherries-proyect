import selectQuery from "../../../utils/selectQuery.js"
import insertQuery from "../../../utils/insertQuery.js"

const beneficiosGet = (req, res) => {
    const {id_prove} = req.body

    const condicion = " WHERE id_prove = " + id_prove + " AND vigencia = 'Activo'"

    selectQuery("id", " fah_convenios", condicion, '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const beneficiosPost = (req, res) => {
    const {id_prove, id_conv, nombre, precio, descrip} = req.body

    const condicion = " WHERE id_prove = " + id_prove + " AND id_conv = " + id_conv

    let valores = id_prove + ", " + id_conv + ", '" + nombre + "', " + precio
    let columnas = ''

    if (descrip == ''){
        valores = valores + ")"
        columnas = " (id, id_prove, id_conv, nombre, precio) "
    }
    else{
        valores = valores + ", '" + descrip + "')"
        columnas = " (id, id_prove, id_conv, nombre, precio, descrip) "
    }
    
    insertQuery('beneficios', condicion, columnas, valores, (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const proveedorGet = (req, res) => {
    selectQuery("p.id, p.nombre", "fah_proveedores p", '', '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const asociacionRegGet = (req, res) => {
    selectQuery("a.id, a.nombre", "fah_asociacionesregionales a", '', '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    }) 
}

const catalogoProdPost = (req, res) => {
    const {id_cat_prod} = req.body
    const condicion = " WHERE c.id_prod = " + id_cat_prod + " AND c.id_prove = p.id"
    selectQuery("c.id_prove, p.nombre", "fah_catalogoproveedores c, fah_proveedores p", condicion, '', (err, result) => {
        if (err)
            res.status(500).json(err)
        else
            res.json(result)
    })
}

const convenioPost = (req, res) => {
    const {id_prove, columna, valor} = req.body
    
    const condicion = " WHERE id_prove = " + id_prove

    let valores = id_prove + ", CURDATE(), 'Activo', " + valor
    let columnas = ' (id, id_prove, fe_emision, vigencia, '

    if (columna == 'id_cat_prod'){
        valores = valores + ", " + id_prove 
        columnas = columnas + 'id_cat_prod, id_cat_prove)'
    }
    else
        columnas = columnas + 'id_asoc)'
    
    insertQuery('convenios', condicion, columnas , valores, (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const cancelarConvenioGet = (req, res) => {
    const {id_prove, valor, columna} = req.body
    const condicion = "WHERE id_prove = "+ id_prove + " AND " + columna + " = " + valor
    selectQuery("id", "fah_convenios", condicion, '', (err, result) => {
        if (err)
            res.send.status(500).json(err)
        else
            res.send.json(result)
    })
}

const cancelarConvenioPost = (req, res) => {
    const {id_prove, valor, columna} = req.body    
    pool.query("UPDATE fah_convenios SET vigencia = 'Cancelado' WHERE id_prove = " + id_prove + " AND " + columna + " = " + valor, (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

export const convenioController = {
    proveedorGet, catalogoProdPost, asociacionRegGet, convenioPost, cancelarConvenioGet, cancelarConvenioPost, beneficiosGet, beneficiosPost
}
