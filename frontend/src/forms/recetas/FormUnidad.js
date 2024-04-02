import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState } from 'react'

export default function FormUnidad(){
    const[unidad , setUnidad] =useState({
        nombre: '',
        tipo: '',
        abrev: '',
        descrip: ''
    })

    const handleChange = (e) => {
        setUnidad({
            ...unidad,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = () => {
        const {nombre, tipo} = unidad
        if ((nombre === '')||(tipo === '')){
            alert('Todos los campos deben estar completos')
            return
        }

        axios.post('http://localhost:3001/api/recetas/registrarunidad', unidad).then(res => {
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
                        <Form.Control type='text'name='nombre' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Tipo</Form.Label>
                        <Form.Select type='text' name='tipo' defaultValue='Selecciona una opcion' onChange={handleChange}>
                            <option disabled>Selecciona una opcion</option>
                            <option>Líquido</option>
                            <option>Sólido</option>
                            <option>Mixto</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Abreviacion</Form.Label>
                        <Form.Control type='text'name='abrev' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId='formDescripcion'>
                        <Form.Label>Descripcion</Form.Label>
                            <Form.Group className=' w-100' as='textarea' rows={3} name='descrip' onChange={handleChange}>
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