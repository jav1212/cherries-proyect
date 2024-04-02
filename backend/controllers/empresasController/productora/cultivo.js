import insertQuery from "../../../utils/insertQuery.js"
import selectQuery from "../../../utils/selectQuery.js"

const cultivosGet = (req, res) => {
    let productoras = []
    let variedades = []

    selectQuery("e.id, e.nombre", "fah_empresasproductoras e", '', '', (err, result) => { 
        if (err)
            res.status(500).send(err)
        else{
            productoras = result

            selectQuery("v.id, v.nombre", "fah_variedadescrz v", '', '', (err, result) => {
                if (err)
                    res.status(500).send(err)
                else{
                    variedades = result
                    res.json({productoras, variedades})
                }
                
            })
        }
    })
}

const cultivosPost = (req, res) => {
    let {id_prod, id_crz, calibre, disp_i, disp_f, prod_esp, max_dist_exp} = req.body

    disp_i = "STR_TO_DATE('" + disp_i + "' ,'%m/%d')"
    disp_f = "STR_TO_DATE('" + disp_f + "' ,'%m/%d')"

    const condicion = " WHERE id_prod = " + id_prod + " AND id_crz = " + id_crz

    const valores = id_prod + ", " + id_crz + ", '" + calibre + "', " + disp_i + ", " + disp_f + ", " + prod_esp + ", " + max_dist_exp 

    insertQuery('cultivos', condicion, ' (id, id_prod, id_crz, calibre, disp_i, disp_f, prod_esp, max_dist_exp)', valores, (err, result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

export const cultivosController = {
    cultivosGet, cultivosPost
}