import insertQuery from "../../utils/insertQuery.js"
import selectQuery from "../../utils/selectQuery.js"

const criterioPost = (req, res) => {
    const{nombre, tipo, descripcion} = req.body

    const valores = "'"+ nombre + "','" + tipo + "','" + descripcion + "'"

    insertQuery('criterios','','(id,nombre,tipo,descripcion)',valores, (err,result) => {
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

export const criterioController = {
    criterioPost
}