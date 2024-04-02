import insertQuery from "../../utils/insertQuery.js"
import selectQuery from "../../utils/selectQuery.js"

const ingredientePost = (req, res) => {
    const{nombre, medicion,medicion_mix,descrip} = req.body

    let medicion_m = 0
    if(medicion_mix === 'on')
        medicion_m = 1

    let valores ="'" + nombre + "','"  + medicion + "','" + medicion_m + "','"

    if(descrip === '')
        valores+=null+"'"
    else
        valores+=descrip+"'"

    insertQuery('ingredientes','','(id,nombre,medicion,medicion_mix,descrip)',valores, (err,result) => {
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

export const ingredienteController = {
    ingredientePost
}