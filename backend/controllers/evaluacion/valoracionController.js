import insertQuery from "../../utils/insertQuery.js"
import selectQuery from "../../utils/selectQuery.js"

const valoracionPost = (req, res) => {
    const{id_client, interpretacion} = req.body

    const valores = "'" + id_client + "','" + interpretacion + "'"
    const condicion = 'WHERE id_client = ' + id_client + "'"

    insertQuery('valoraciones',condicion,'(id,id_client,interpretacion)',valores, (err, result) => {
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

export const valoracionController = {
    valoracionPost
}