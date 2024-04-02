import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState } from 'react'

export default function FormIngrediente(){
    const[ingrediente , setIngrediente] =useState({
        nombre: '',
        medicion: '',
        medicion_mix: '',
        descrip: '',
    })

    const handleChange = (e) => {
        setIngrediente({
            ...ingrediente,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = () => {
        const {nombre, medicion} = ingrediente
        if((nombre === '')||(medicion === '')){
            alert('campo vacio')
            return
        }

        axios.post('http://localhost:3001/api/recetas/registraringrediente', ingrediente).then(res => {
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
                        <Form.Label>Medicion</Form.Label>
                        <Form.Select type='text' name='medicion' defaultValue='Selecciona una opcion' onChange={handleChange}>
                            <option disabled>Selecciona una opcion</option>
                            <option>Líquido</option>
                            <option>Sólido</option> 
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Descripcion</Form.Label>
                            <Form.Group className=' w-100' as='textarea' rows={3} name='descrip' onChange={handleChange}>
                            </Form.Group>
                    </Form.Group>
                    <Form.Group className=' mt-2'>
                        <Form.Check type='radio' label='Medicion mixta' name='medicion_mix' onChange={handleChange}/>
                    </Form.Group>
                    <Button className='mt-4'variant="primary" type="submit">
                            Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}