import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function FormAsociacionRegional(){
    const [paises, setPaises] = useState([])
    const [regiones, setRegiones] = useState([])
    const [verificar, setVerificar] = useState(false)
    
    const[asociacion, setAsociacion] =useState({
        id_pais: '',
        id_reg: '',
        nombre: ''
    })

    const handleChange = (e) => {
        setAsociacion({
            ...asociacion,
            [e.target.name] : e.target.value
        })

        if (e.target.name === 'id_pais')
            setVerificar(true)
    }

    const handleSubmit = () => {
        const {id_pais, id_reg, nombre} = asociacion
        if((nombre === '')||(id_reg === '')||(id_pais === '')){
            alert('Todos los campos deben estar completos')
            return
        }

        axios.post('http://localhost:3001/api/empresas/asociacionRegional/registro', asociacion).then(res => {
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

    useEffect(() => {
        if (verificar){
            const {id_pais} = asociacion
            console.log(id_pais)
            axios.post('http://localhost:3001/api/empresas/asociacionRegional', {id_pais}).then(res => setRegiones(res.data))
            setAsociacion({...asociacion, id_reg:''})
        }
        setVerificar(false)
    }, [verificar])

    return(
        <>
            <div className='container mt-xxl-5 d-flex align-items-center justify-content-center'>
                <Form className='w-100' onSubmit= {handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                            <Form.Control type='text' name='nombre' onChange={handleChange}/>
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
                    
                    <Form.Group>
                        <Form.Label>Region</Form.Label>
                            <Form.Select type='text' name='id_reg' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {regiones.map( (region) => { 
                                    return <option key={region.id} value = {region.id}>{region.nombre}</option>
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