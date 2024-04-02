import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function FormEmpresaCliente(){
    const [paises, setPaises] = useState([])
    const [ciudades, setCiudades] = useState([])

    const [cambiarPais, setCambiarPais] = useState(false)

    const[empresa , setEmpresa] = useState({
        nombre: '',
        direc: '',
        t_negocio: '',
        id_pais: '',
        id_cdad: '',
        rgo_inf: '',
        rgo_sup: '',
        prt_acep: ''
    })

    const handleChange = (e) => {
        setEmpresa({
            ...empresa,
            [e.target.name] : e.target.value
        })

        if (e.target.name === 'id_pais')
            setCambiarPais(true)
    }

    const handleSubmit = () => {
        const {nombre , t_negocio, direc, id_pais, id_cdad, rgo_inf, rgo_sup, prt_acep} = empresa
        if( (nombre === '')||(t_negocio === '')||(direc === '')||(id_pais === '')||
            (id_cdad === '')||(rgo_inf === '')||(rgo_sup === '')||(prt_acep === '')){
            alert('Los campos no pueden estar vacios')
            return
        }

        axios.post('http://localhost:3001/api/empresas/cliente/registro', empresa).then(res => {
            if (res.data.error !== undefined){
                alert(res.data.error + "\n" + res.data.sqlMessage)
                return
            }
            else
                alert('Registro realizado')
        }).catch(err => {console.log(err) ; alert('error')})
    }

    useEffect(() => {
        axios.get('http://localhost:3001/api/lugar/registrarCdadReg').then(res => {setPaises(res.data)})
    }, [])


    useEffect(() => {
        if (cambiarPais){
            console.log("aqui "+empresa.id_pais)
            const {id_pais} = empresa
            axios.post('http://localhost:3001/api/empresas/cliente/ciudades', {id_pais}).then(res => {
                setCiudades(res.data)
                setEmpresa({...empresa, id_cdad: ''})
            })
            setCambiarPais(false)
        }
    }, [cambiarPais])

    return(
        <>
            <div className='container mt-xxl-5 d-flex align-items-center justify-content-center'>
                <Form className='w-100' onSubmit= {handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                            <Form.Control type='text' name='nombre' onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tipo de negocio</Form.Label>
                            <Form.Select type='text' name='t_negocio' defaultValue='Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                <option>Comercio</option>
                                <option>Industria</option>
                                <option>Distribuidor</option>
                            </Form.Select>
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
                        <Form.Label>Ciudad</Form.Label>
                            <Form.Select type='text' name='id_cdad' defaultValue= 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {ciudades.map( (ciudad) => { 
                                    return <option key={ciudad.id} value = {ciudad.id}>{ciudad.nombre}</option>
                                })}                         
                            </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Direccion</Form.Label>
                            <Form.Group className=' w-100' as='textarea' rows={3} name='direc' onChange={handleChange}>
                            </Form.Group>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Rango minimo de evaluacion</Form.Label>
                            <Form.Control type='number' name='rgo_inf' min='1' onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Rango maximo de evaluacion</Form.Label>
                            <Form.Control type='number' name='rgo_sup' min='1' onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Porcentaje de aceptacion</Form.Label>
                            <Form.Control type='text' name='prt_acep' min='0' onChange={handleChange}/>
                    </Form.Group>

                    <Button className='mt-4'variant="primary" type="submit">
                            Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}