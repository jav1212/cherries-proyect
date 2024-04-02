import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function FormValoraciones(){
    const[valoracion, setValoracion] = useState({
        id_client:'',
        interpretacion:''
    })

    const[clientes, setClientes] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/api/empresas/cliente/').then(res => setClientes(res.data))
    },[])

    const handleChange = (e) => {
        setValoracion({
            ...valoracion,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = () => {
        const {id_client, interpretacion} = valoracion
        if ((id_client === '')||(interpretacion === '')){
            alert('Todos los campos deben estar completos')
            return
        }

        axios.post('http://localhost:3001/api/evaluacionvaloracion/registrarvaloracion', valoracion).then(res => {
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
                <Form className='w-100' onSubmit = {handleSubmit}>
                    <Form.Group>
                        <Form.Label className=' fs-5'>Empresa Cliente</Form.Label>
                            <Form.Select className='mt-2' type='text' name='id_client' defaultValue= 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {clientes.map( (cliente) => {
                                    return (<option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>)
                                })}
                            </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className=' fs-5'>Descripcion</Form.Label>
                            <Form.Group className=' w-100' as='textarea' rows={3} name='interpretacion' onChange={handleChange}>
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