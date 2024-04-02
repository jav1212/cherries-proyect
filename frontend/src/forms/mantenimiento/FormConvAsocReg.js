import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function ConvenioAsocReg(){
    const [asociaciones, setAsociaciones] = useState([])
    const [proveedores, setProveedores] = useState([])

    const[convenio, setConvenio] =useState({
        id_asoc: '',
        id_prove: ''
    })

    const handleChange = (e) => {
        setConvenio({
            ...convenio,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = () => {
        const {id_asoc, id_prove} = convenio
        if ((id_asoc === '')||(id_prove === '')){
            alert('Debe seleccionar ambos campos')
            return
        }

        axios.post('http://localhost:3001/api/empresas/proveedor/convenio/registro', {id_prove, columna: 'id_asoc', valor: id_asoc}).then(res => {
            if (res.data.error !== undefined){
                alert(res.data.error + "\n" + res.data.sqlMessage)
                return
            }
            else
                alert('Registro realizado')
        }).catch(err => {console.log(err) ; alert(err)})
    }

    useEffect(() => {
        axios.get('http://localhost:3001/api/empresas/proveedor/convenio/registro').then(res => setProveedores(res.data))
        axios.get('http://localhost:3001/api/empresas/proveedor/convenio/registro/asocRegional').then(res => setAsociaciones(res.data))
    }, [])

    return(
        <>
            <div className='container mt-xxl-5 d-flex align-items-center justify-content-center'>
                <Form className='w-100' onSubmit= {handleSubmit}>
                    <Form.Group>
                        <Form.Label>Asociacion Regional</Form.Label>
                            <Form.Select className='mt-2' type='text' name='id_asoc' defaultValue = 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {asociaciones.map( (asociacion) => { 
                                    return <option key={asociacion.id} value = {asociacion.id}>{asociacion.nombre}</option>
                                })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Proveedor</Form.Label>
                            <Form.Select className='mt-2' type='text' name='id_prove' defaultValue = 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {proveedores.map( (proveedor) => { 
                                    return <option key={proveedor.id} value = {proveedor.id}>{proveedor.nombre}</option>
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