import pool from "../../database/database.js"
import insertQuery from "../../utils/insertQuery.js"
import selectQuery from "../../utils/selectQuery.js"

const getCultivosProductoraPost = (req, res) => {
    const {id_prod, id_pais} = req.body

    const condicion = " WHERE c.id_prod = " + id_prod + " AND v.id = c.id_crz AND v.id = p.id_crz AND p.id_pais = " + id_pais + " AND isnull(p.fe_f) AND c.calibre = p.calibre"

    selectQuery("c.id_crz id_crz_cult, c.id id_cult, p.precio precio, v.nombre nombre, c.calibre calibre", " fah_variedadescrz v, fah_cultivos c, fah_precioscrzpais p ", condicion, '', 
        (err, result) => {
            if (err)
                res.status(500).send(err)
            else
                res.json(result)
        })
}

const verificarEmpresasPost = (req, res) => {
    const {id_prod, id_client} = req.body

    const condicion = " WHERE c.estatus = 'Activo' AND c.id_prod = " + id_prod + " AND c.id_client = " + id_client

    selectQuery("c.id id_cont", " fah_contratos c", condicion, '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else{
            if (result.length !== 0)
                res.send({error:"Existe un contrato activo entre las dos empresas", result})
            else
                res.json(result)
        }
    })
}

const contratoPost = (req, res) =>{
    const {id_prod, id_client, id_fr_pg, descuento, transp, monto} = req.body

    const condicion = " WHERE id_prod = " + id_prod + " AND id_client = " + id_client
    let columnas = " (id, id_prod, id_client, fe_emi, monto, transp, estatus, id_prod_pg, id_fr_pg"
    let valores = id_prod + ", " + id_client + ", CURDATE(), " + monto + ", '" + transp + "', 'Activo', " + id_prod + ", " + id_fr_pg 
    
    if (descuento !== ''){
        columnas+= ", descuento"
        valores+= ", " + descuento
    }

    columnas+= ") "

    insertQuery("contratos", condicion, columnas, valores, (err, result) => {
        if (err)
            res.status(500).send(err)
        else            
            res.json(result)
    })
}

const detalleContratoPost = (req, res) =>{
    const {id_cont, id_prod_cont, id_client_cont, id_crz_cult, id_cult, ctd, fe_envio} = req.body
    let valores = ''
    let columnas =''

    valores = "(" + id_prod_cont + ", " + id_client_cont + ", " + id_cont + ", " + id_prod_cont + ", " + id_crz_cult + ", " + id_cult + ", " + ctd
    columnas = "(id_prod_cont, id_client_cont, id_cont, id_prod_cult, id_crz_cult, id_cult, ctd"

    if (fe_envio !== ''){
        valores+= ", STR_TO_DATE('"+ fe_envio + "','%m/%d')"
        columnas+= ", fe_envio"
    }

    valores+= ") "
    columnas+=") "

    pool.query("INSERT INTO fah_detallescontrato " + columnas + " VALUES " + valores, (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const getContratosProductora = (req, res) =>{
    const {id_prod_cont} = req.body

    const condicion = " WHERE c.id_prod = " + id_prod_cont + " AND c.id_client = e.id AND c.estatus = 'Activo' "

    selectQuery("c.id_client id_client, e.nombre client, c.id id_cont", " fah_contratos c, fah_empresascliente e", condicion, '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const getDetallesContPost = (req, res) => {
    const {id_client_cont, id_cont, id_prod_cont} = req.body

    const condicion = " WHERE dc.id_prod_cont = " + id_prod_cont + " AND dc.id_client_cont = " + id_client_cont + " AND dc.id_cont = " + id_cont + " AND dc.id_crz_cult = v.id AND dc.id_cult = c.id AND c.id_prod = " + id_prod_cont

    selectQuery("dc.id_crz_cult, dc.id_cult, v.nombre, c.calibre", " fah_detallescontrato dc, fah_variedadescrz v, fah_cultivos c ", condicion, '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const envioPost = (req, res) => {
    const {id_prod_cont, id_client_cont, id_cont, fe_env, fe_recolec, cantidad, id_crz_cult, id_cult} = req.body.envio
    const valores = id_prod_cont + ", " + id_client_cont + ", " + id_cont + ", " + id_prod_cont  + ", " + id_crz_cult + ", " + id_cult + ", '" + fe_env + "', '" + fe_recolec + "', " + cantidad
    
    const condicion = " WHERE id_prod_cont = " + id_prod_cont + " AND id_client_cont = " + id_client_cont + " AND id_cont = " + id_cont + " AND id_crz_cult = " + id_crz_cult + " AND id_cult = " + id_cult
    insertQuery("enviosreales", condicion, " (id, id_prod_cont, id_client_cont, id_cont, id_prod_cult, id_crz_cult, id_cult, fe_env, fe_recolec, cantidad)", valores, (err, result) =>{
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

export const contratoController = {
    getCultivosProductoraPost, contratoPost, verificarEmpresasPost, detalleContratoPost, getContratosProductora, getDetallesContPost, envioPost
}