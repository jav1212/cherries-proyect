import insertQuery from "../../utils/insertQuery.js"
import selectQuery from "../../utils/selectQuery.js"

const getProveedores = (req, res) => {
    selectQuery("id,nombre","fah_proveedores",'','', (err,result) => {
        if (err)
                res.status(500).send(err)
            else{
                res.json(result)
            }
    })
}

const getConveniosProdPost = (req, res) => {
    const{id_prove} = req.body
    const condicion = "WHERE c.id_prove = "+ id_prove +" AND c.id_cat_prod = e.id"

    selectQuery("e.nombre nombre, c.id id","fah_convenios c, fah_empresasproductoras e ",condicion,'', (err,result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const getConveniosAsoPost = (req,res) => {
    const{id_prove} = req.body
    const condicion = "WHERE c.id_prove = "+id_prove+" AND c.id_asoc = a.id"

    selectQuery("a.nombre nombre, c.id id","fah_convenios c, fah_asociacionesregionales a ", condicion, '', (err,result) => {
        if (err)
            res.status(500).send(err)
        else
            res.json(result)
    })
}

const beneficioPost = (req,res) => {
    const{id_prove,id_conv,nombre,precio,descrip} = req.body

    const valores = "'" + id_prove + "','" + id_conv + "','" + nombre +
        "','" + precio + "','" + descrip + "'"
    const condicion = " WHERE id_prove = " + id_prove

    insertQuery("beneficios",condicion,"(id,id_prove,id_conv,nombre,precio,descrip)",valores,(err,result) => {
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

export const beneficiosController = {
    getConveniosProdPost, getConveniosAsoPost, beneficioPost, getProveedores
}