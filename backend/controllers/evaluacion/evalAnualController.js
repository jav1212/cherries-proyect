import insertQuery from "../../utils/insertQuery.js"
import selectQuery from "../../utils/selectQuery.js"

const clientesEvaluacionGet = (req, res) => {
    let clientes = []
    selectQuery("id, nombre, direc, t_negocio, rgo_inf, rgo_sup, prt_acep, id_pais, id_cdad", 
        "fah_empresascliente", '', '', (err , result) => {
            if (err)
                res.status(500).send(err)
            else{
                clientes = result
                res.json(clientes)
            }
        })
}

const productorasContratoPost = (req, res) => {
    const {id_client} = req.body
    const condicion = " WHERE c.id_client = " + id_client + " AND c.estatus = 'Activo' AND c.id_prod = p.id"
    let productoras = []

    selectQuery("p.id id_prod, p.nombre nombre, c.id id_cont", " fah_empresasproductoras p, fah_contratos c ", condicion, '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else{
            productoras = result
            res.json(productoras)
        }
    })
}

const getDetallesContratoPost = (req, res) => {
    const {id_client_cont, id_prod_cont, id_cont} = req.body

    const condicion = " WHERE dc.id_client_cont = " + id_client_cont + " AND dc.id_prod_cont = " + id_prod_cont + " AND dc.id_cont = " + id_cont 

    selectQuery("dc.id_crz_cult, v.nombre, v.especie ", " fah_detallescontrato dc, fah_variedadescrz v", condicion, '', (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const getFormulasPost = (req, res) => {
    
}

export const evalAnualController = {
    clientesEvaluacionGet ,productorasContratoPost, getDetallesContratoPost
}