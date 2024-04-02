import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function FormCatalogo(){
    const [productoras, setProductoras] = useState([])
    const [proveedores, setProveedores] = useState([])

    const[catalogo , setCatalogo] =useState({
        id_prod: '',
        id_prove: ''
    })

    const handleChange = (e) => {
        setCatalogo({
            ...catalogo,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = () => {
        const {id_prod, id_prove} = catalogo
        if((id_prod === '')||(id_prove === '')){
            alert('Debe seleccionar ambas opciones')
            return
        }

        axios.post('http://localhost:3001/api/empresas/productora/catalogoProveedores', catalogo).then(res => {
            if (res.data.error !== undefined){
                alert(res.data.error + "\n" + res.data.sqlMessage)
                return
            }
            else
                alert('Registro realizado')
            
        }).catch(err => {console.log(err) ; alert('error')})

    }

    useEffect(() => {
        axios.get('http://localhost:3001/api/empresas/productora/catalogoProveedores').then(res => {setProductoras(res.data.productoras) ; setProveedores(res.data.proveedores)})
    }, [])
    return(
        <>
            <div className='container mt-xxl-5 d-flex align-items-center justify-content-center'>
                <Form className='w-100' onSubmit= {handleSubmit}>
                    <Form.Group>
                        <Form.Label>Empresa Productora</Form.Label>
                            <Form.Select type='text' name='id_prod' defaultValue= 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {productoras.map( (productoras) => { 
                                    return <option key={productoras.id} value = {productoras.id}>{productoras.nombre}</option>
                                })}
                            </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Empresa Proveedora</Form.Label>
                            <Form.Select type='text' name='id_prove' defaultValue= 'Selecciona una opcion'onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {proveedores.map( (proveedor) => { 
                                    return <option key={proveedor.id} value = {proveedor.id}>{proveedor.nombre}</option>
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