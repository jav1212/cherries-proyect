import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function FormCultivo(){
    const [productoras, setProductoras] = useState([])
    const [variedades, setVariedades] = useState([])
    const[cultivo , setCultivo] =useState({
        calibre: '',
        disp_i: '',
        disp_f: '',
        prod_esp: '',
        max_dist_exp: '',
        id_prod: '',
        id_crz: ''
    })

    const handleChange = (e) => {
        setCultivo({
            ...cultivo,
            [e.target.name] : e.target.value
        })
    }
    

    useEffect(() => {
        axios.get('http://localhost:3001/api/empresas/productora/registrarCultivo').then(res => {setProductoras(res.data.productoras); setVariedades(res.data.variedades)})
    }, [])

    const handleSubmit = () => {
        const {calibre, disp_i, disp_f, prod_esp, max_dist_exp, id_prod, id_crz} = cultivo
        if ((calibre === '')||(disp_i === '')||(disp_f === '')||(prod_esp === '')||
            (max_dist_exp === '')||(id_prod === '')||(id_crz === '')){
            alert('Existen campos vacios')
            return
        }
        else if (parseInt(cultivo.prod_esp) < parseInt(cultivo.max_dist_exp)){
            alert('La produccion esperada no puede ser menor que la cantidad a exportar')
            return
        }
        console.log(cultivo)
        axios.post('http://localhost:3001/api/empresas/productora/registrarCultivo', cultivo).then(res => {
            if (res.data.error !== undefined){
                alert(res.data.error + "\n" + res.data.sqlMessage)
                return
            }
            else
                alert('Registro realizado')
        }).catch(err => {console.log(err) ; alert(err)})
    }

    return(
        <>
            <div className='container mt-xxl-5 d-flex align-items-center justify-content-center'>
                <Form className='w-100' onSubmit= {handleSubmit}>
                    <Form.Group>
                        <Form.Label>Calibre</Form.Label>
                        <Form.Select type='text' name='calibre' defaultValue='Selecciona una opcion' onChange={handleChange}>
                            <option hidden>Selecciona una opcion</option>
                            <option>Large</option>
                            <option>Extralarge</option>
                            <option>Jumbo</option>
                            <option>Extrajumbo</option>
                            <option>Giant</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Disponibilidad inicial</Form.Label>
                            <Form.Control type='text' name='disp_i' onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Disponibilidad final</Form.Label>
                            <Form.Control type='text' name='disp_f' onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Produccion esperada</Form.Label>
                            <Form.Control type='number' name='prod_esp' min='1' onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Maximo en kg</Form.Label>
                            <Form.Control type='number' name='max_dist_exp' min='1' onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Empresa</Form.Label>
                            <Form.Select type='text' name='id_prod' defaultValue = 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                    {productoras.map( (productora) => { 
                                        return <option key={productora.id} value = {productora.id}>{productora.nombre}</option>
                                    })}        
                            </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Variedad</Form.Label>
                            <Form.Select type='text' name='id_crz' defaultValue = 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                    {variedades.map( (variedad) => { 
                                        return <option key={variedad.id} value = {variedad.id}>{variedad.nombre}</option>
                                    })}        
                            </Form.Select>
                    </Form.Group>
                    <Button className='mt-4'variant="primary" type="submit">
                            Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}