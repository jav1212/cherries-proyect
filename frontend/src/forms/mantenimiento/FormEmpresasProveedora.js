import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function FormEmpresaProveedora(){
    const [paises, setPaises] = useState([])
    const [ciudades, setCiudades] = useState([])

    const [ramasNeg, setRamasNeg] = useState([])

    const [verificarPais, setVerificarPais] = useState(false)

    const[proveedor , setProveedor] =useState({
        nombre: '',
        id_pais: '',
        id_cdad: '',
        rama_neg: ''
    })

    const handleChange = (e) => {
        setProveedor({
            ...proveedor,
            [e.target.name] : e.target.value
        })

        if (e.target.name === 'id_pais')
            setVerificarPais(true)
    }

    const handleSubmit = () => {
        const {nombre, id_pais, id_cdad, rama_neg} = proveedor
        if ((nombre === '') || (id_pais === '') || (id_cdad === '') || (rama_neg === '')){
            alert('No pueden haber campos vacios')
            return
        }

        axios.post('http://localhost:3001/api/empresas/proveedor/registro', proveedor).then(res => {
            if (res.data.error !== undefined){
                alert(res.data.error + "\n" + res.data.sqlMessage)
                return
            }
            else
                alert('Registro realizado')
        }).catch(err => {console.log(err) ; alert('error')})
    }

    useEffect(() => {
        axios.get('http://localhost:3001/api/empresas/proveedor/registro').then(res => {
            setPaises(res.data.paises)
            setRamasNeg(res.data.ramasNeg)
        })
    }, [])

    useEffect(() => {
        if (verificarPais){
            const {id_pais} = proveedor
            axios.post('http://localhost:3001/api/lugar/ciudades', {id_pais}).then(res => {
                setCiudades(res.data)
                setProveedor({...proveedor, id_cdad: ''})
            })
            setVerificarPais(false)
        }
    }, [verificarPais])

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
                        <Form.Label>Ciudad</Form.Label>
                            <Form.Select type='text' name='id_cdad' defaultValue= 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {ciudades.map( (ciudad) => { 
                                    return <option key={ciudad.id} value = {ciudad.id}>{ciudad.nombre}</option>
                                })}                         
                            </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Rama de Negocio</Form.Label>
                            <Form.Select type='text' name='rama_neg' defaultValue= 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {ramasNeg.map( (rama) => { 
                                    return <option key={rama.id} value = {rama.id}>{rama.nombre}</option>
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