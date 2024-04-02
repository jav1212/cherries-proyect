import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function FormConvenioProveedor(){
    const [productoras, setProductoras] = useState([])
    const [proveedores, setProveedores] = useState([])
    const [solicitarProvs, setSolicitarProvs] = useState(false)
    
    const[convenioProd, setConvenioProd] =useState({
        id_cat_prod: '',
        id_prove: ''
    })

    const handleChange = (e) => {
        setConvenioProd({
            ...convenioProd,
            [e.target.name] : e.target.value
        })

        if (e.target.name === 'id_cat_prod')
            setSolicitarProvs(true)
    }

    const handleSubmit = () => {
        const {id_cat_prod, id_prove} = convenioProd
        if((id_cat_prod === '')||(id_prove === '')){
            alert('Debe seleccionar una opcion de ambos campos')
            return
        }

        axios.post('http://localhost:3001/api/empresas/proveedor/convenio/registro', {id_prove, columna: 'id_cat_prod', valor: id_cat_prod}).then(res => {
            if (res.data.error !== undefined){
                alert(res.data.error + "\n" + res.data.sqlMessage)
                return
            }
            else
                alert('Registro realizado')
        }).catch(err => {console.log(err) ; alert(err)})
    }

    useEffect(() => {
        axios.get('http://localhost:3001/api/empresas/productora').then(res => setProductoras(res.data))
    }, [])

    useEffect(() => {
        if (solicitarProvs){
            const {id_cat_prod} = convenioProd
            axios.post('http://localhost:3001/api/empresas/proveedor/convenio/registro/catalogoProd',{id_cat_prod}).then(res => setProveedores(res.data))
        }
        setSolicitarProvs(false)
    }, [solicitarProvs])
    

    return(
        <>
            <div className='container mt-xxl-5 d-flex align-items-center justify-content-center'>
                <Form className='w-100' onSubmit= {handleSubmit}>
                    <Form.Group>
                        <Form.Label>Empresa Productora</Form.Label>
                            <Form.Select type='text' name='id_cat_prod' defaultValue = 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {productoras.map( (productora) => { 
                                    return <option key={productora.id} value = {productora.id}>{productora.nombre}</option>
                                })}        
                            </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Empresa Proveedora</Form.Label>
                            <Form.Select className='mt-2' type='text' name='id_prove' defaultValue = 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {proveedores.map( (proveedor) => { 
                                    return <option key={proveedor.id_prove} value = {proveedor.id_prove}>{proveedor.nombre}</option>
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