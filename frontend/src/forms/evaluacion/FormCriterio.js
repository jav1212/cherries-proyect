import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function FormCriterio(){

    const[criterio, setCriterio] = useState({
        nombre:'',
        tipo:'',
        descripcion:''
    })

    const handleChange = (e) => {
        setCriterio({
            ...criterio,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = () => {
        const {nombre, tipo} = criterio
        if ((nombre === '')||(tipo === '')){
            alert('Todos los campos deben estar completos')
            return
        }

        axios.post('http://localhost:3001/api/evaluacioncriterio/registrarcriterio', criterio).then(res => {
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
                <Form onSubmit = {handleSubmit} className='w-100'>
                    <Form.Group>
                        <Form.Label className=' fs-5'>Nombre</Form.Label>
                            <Form.Control className='rounded-0 border' type='text' name='nombre' onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className=' fs-5'>Tipo</Form.Label>
                            <Form.Select className='rounded-0 border' name='tipo' defaultValue='Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                <option>Variedad</option>
                                <option>Individual</option>
                            </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className=' fs-5'>Descripcion</Form.Label>
                            <Form.Group className=' w-100' as='textarea' rows={3} name='descripcion' onChange={handleChange}>
                            </Form.Group>
                    </Form.Group>
                    <Button className='mt-4'variant="primary" type="submit">    
                            Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}