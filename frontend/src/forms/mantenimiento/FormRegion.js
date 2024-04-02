import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function FormRegion(){
    const [paises, setPaises] = useState([])

    const [region, setRegion] = useState({
        nombre: '',
        id_pais: '',
    })

    const handleChange = (e) => {
        setRegion({
            ...region,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = () => {
        const {nombre, id_pais} = region
        if ((nombre === '')||(id_pais === '')){
            alert('Todos los campos deben estar completos')
            return
        }

        axios.post('http://localhost:3001/api/lugar/registrarCdadReg', { tabla:'regiones', ...region}).then(res => {
            if (res.data.error !== undefined){
                alert(res.data.error + "\n" + res.data.sqlMessage)
                return
            }
            else
                alert('Registro realizado')
        }).catch(err => {console.log(err) ; alert(err)})
    }

    useEffect(() => {
        axios.get('http://localhost:3001/api/lugar/registrarCdadReg').then(res => {setPaises(res.data)})
      }, [])

    return(
        <>
            <div className='container mt-xxl-5 d-flex align-items-center justify-content-center'>
                <Form className='w-100' onSubmit= {handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                            <Form.Control className='mt-2' type='text' name='nombre' onChange={handleChange}/>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Pais</Form.Label>
                        <Form.Select className='mt-2' type='text' name='id_pais' defaultValue = 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {paises.map( (pais) => { 
                                    return <option key={pais.id} value = {pais.id}>{pais.nombre}</option>
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