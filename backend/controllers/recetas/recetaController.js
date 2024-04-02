import insertQuery from "../../utils/insertQuery.js"
import selectQuery from "../../utils/selectQuery.js"

const ingredientesGet = (req, res) => {
    selectQuery("id,nombre","fah_ingredientes",'','', (err,result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const unidadmedidaGet = (req, res) => {
    selectQuery("id,nombre","fah_unidadesmedida",'','', (err,result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const recetaPost = (req, res) => {
    const {nombre,tipo,descrip,tiempo_prep,racion, id_prod,id_client} = req.body

    let valores = "'"+nombre+"','"+tipo+"','"+descrip+"',"+tiempo_prep+","+racion+","+id_prod+","+id_client

    insertQuery('recetas','','(id,nombre,tipo,descrip,tiempo_prep,racion,id_prod,id_client)',valores,(err,result) => {
        if(err){
            if(err.code === 'ER_DUP_ENTRY'){
                const {code,sqlMessage} = err
                res.json({ error: code,sqlMessage})
            }
            else
                res.status(500)
        }
        else
            res.json(result)
    })
}

const variedadRecetaPost = (req, res) => {

}

export const recetaController = {
    ingredientesGet, recetaPost
}
