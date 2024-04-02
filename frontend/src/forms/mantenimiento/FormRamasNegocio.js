import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState } from 'react'

export default function FormRamasNegocios(){
    const[rama , setRama] =useState({
        nombre: '',
    })

    const handleChange = (e) => {
        setRama({
            ...rama,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = () => {
        const {nombre} = rama
        if ((nombre === '')){
            alert('Ingresa el nombre de la rama de negocio')
            return
        }

        axios.post('http://localhost:3001/api/empresas/proveedor/ramaNegocio', rama).then(res => {
            if (res.data.error !== undefined){
                alert(res.data.error + "\n" + res.data.sqlMessage)
                return
            }
            else
                alert('Registro realizado')
        }).catch(err => {console.log(err) ; alert('error')})
    }

    return(
        <>
            <div className='container mt-xxl-5 d-flex align-items-center justify-content-center'>
                <Form className='w-100' onSubmit= {handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                            <Form.Control type='text' name='nombre' onChange={handleChange}/>
                    </Form.Group>
                    <Button className='mt-4'variant="primary" type="submit">
                            Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}