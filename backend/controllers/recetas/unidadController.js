import insertQuery from "../../utils/insertQuery.js"
import selectQuery from "../../utils/selectQuery.js"

const unidadPost = (req, res) => {
    const{nombre,tipo,abrev,descrip} = req.body

    const valores ="'" + nombre + "','" + tipo + "','" + abrev + "','" + descrip + "'"

    insertQuery('unidadesmedida','','(id,nombre,tipo,abrev,descrip)',valores, (err,result) => {
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

export const unidadController = {
    unidadPost
}