import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

import { useState } from 'react'

export default function FormPais() {
    const [pais, setPais] = useState({
        nombre: '',
        continent: ''
    })

    const handleChange = (e) => {
        console.log(e.target.value)
        setPais({
            ...pais,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = () => {
        const {nombre, continent} = pais
        if ((nombre === '')||(continent === '')){
            alert('Todos los campos deben estar completos')
            return
        }

        axios.post('http://localhost:3001/api/lugar/registrarPais', pais).then(res => {
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
                <Form onSubmit = {handleSubmit}>
                        <Form.Group controlId= "formNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control className='mt-2' type= "text" name= "nombre" onChange={handleChange}/>
                        </Form.Group>
                        
                        <Form.Group controlId= "formContinent" className='mt-4'>
                            <Form.Label>Continente</Form.Label>
                                <Form.Control className='mt-2' as= "select" type= "text" name= "continent" defaultValue = 'Selecciona una opcion' onChange={handleChange}>
                                    <option hidden>Selecciona una opcion</option>
                                    <option>América</option>
                                    <option>Europa</option>
                                    <option>Asia</option>
                                    <option>África</option>
                                    <option>Oceanía</option>
                                </Form.Control>
                        </Form.Group>

                        <Button className='mt-4'variant="primary" type="submit">    
                            Submit
                        </Button>

                </Form>
            </div>
        </>
    )
}