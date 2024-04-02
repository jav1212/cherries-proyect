import insertQuery from '../utils/insertQuery.js'
import selectQuery from '../utils/selectQuery.js'

const formaPagoPost = (req, res) => {
    const {id_prod, tipo, conta_emi, conta_env, num_cuotas, prt_cuota} = req.body
    const condicion = " WHERE id_prod = " + id_prod
    let valores = id_prod + ", '" + tipo + "', "
    

    if ((conta_emi === '') && (conta_env === ''))
        valores += "NULL, NULL, " + num_cuotas + ", " + prt_cuota
    else
        valores += conta_emi + ", " + conta_env + ", NULL, NULL"

    insertQuery('formaspago', condicion, " (id, id_prod, tipo, conta_emi, conta_env, num_cuotas, prt_cuota) ", valores, (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const getProductorasPost = (req, res) => {
    const {id_client_cont} = req.body
    const condicion = " WHERE c.id_client = " + id_client_cont + " AND c.estatus = 'Activo' AND c.id_prod = p.id"

    selectQuery("c.id contrato, c.id_prod productora, p.nombre nombre", "fah_contratos c, fah_empresasproductoras p", condicion, '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const registrarPagoPost = (req, res) => {
    const {id_prod_cont, id_client_cont, id_cont, monto} = req.body

    const condicion = " WHERE id_prod_cont = " + id_prod_cont + " AND id_client_cont = " + id_client_cont + " AND id_cont = " + id_cont
    const valores = id_prod_cont + ", " + id_client_cont + ", " + id_cont + ", " + monto
    insertQuery("pagocuotas", condicion, " (id, id_prod_cont, id_client_cont, id_cont, monto) ", valores, (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const getFormasPagoPost = (req, res) => {
    const {id_prod} = req.body
    
    const condicion = " WHERE f.id_prod = " + id_prod

    selectQuery("*", "fah_formaspago f", condicion, '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })   
}

export const pagosController = {
    formaPagoPost, getProductorasPost, registrarPagoPost, getFormasPagoPost
}