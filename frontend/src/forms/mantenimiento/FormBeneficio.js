import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function FormBeneficio(){
    const[beneficios, setBeneficios] = useState({
        id_prove:'',
        id_conv:'',
        nombre:'',
        precio:'',
        descrip:'',
        id_cat_prod:'',
        id_asoc:''
    })

    const[proveedores,setProveedores] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/api/mantenimiento/listaproveedores').then(res => setProveedores(res.data))
    },[])

    const[verificarProd, setVerificarProd] = useState(false)
    const[verificarAso, setVerificarAso] = useState(false)

    const[convenios,setConvenios] = useState([])
    useEffect(() => {
        if(verificarProd){
            const { id_prove } = beneficios

            if(id_prove !== ''){
                axios.post('http://localhost:3001/api/mantenimiento/listaconveniosprod',{id_prove})
                .then(res => setConvenios(res.data))
                .catch(err => {console.log(err) ; alert('Consulta fallida')})
            }
        }
        else if(verificarAso){
            const { id_prove} = beneficios

            if(id_prove !== ''){
                axios.post('http://localhost:3001/api/mantenimiento/listaconveniosasoc',{id_prove})
                .then(res => setConvenios(res.data))
                .catch(err => {console.log(err) ; alert('Consulta fallida')})
            }
        }
    },[verificarProd, verificarAso, beneficios])

    const handleChange = (e) => {
        setBeneficios({
            ...beneficios,
            [e.target.name] : e.target.value
        })

        if(e.target.name === 'id_cat_prod'){
            setVerificarProd(true)
            setVerificarAso(false)
        }

        if(e.target.name === 'id_asoc'){
            setVerificarAso(true)
            setVerificarProd(false)
        }
    }

    const handleSubmit = () => {
        let {id_prove, id_conv, nombre, precio, descrip} = beneficios

        if ((id_prove === '')||(id_conv === '')||(nombre === '')||(precio === '')){
            alert('Todos los campos deben estar completos')
            return
        }

        axios.post('http://localhost:3001/api/mantenimiento/registrarbeneficios', {id_prove,id_conv,nombre,precio,descrip}).then(res => {
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
                <Form className='w-100' onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Proveedores</Form.Label>
                        <Form.Select className='mt-2' type='text' name='id_prove' defaultValue= 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {proveedores.map( (proveedor) => {
                                    return(<option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>)
                                })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Convenio con Productora</Form.Label>
                        <Form.Check checked={verificarProd} type='radio' defaultValue='' name='id_cat_prod' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Convenio con Asociacion</Form.Label>
                        <Form.Check checked={verificarAso} type='radio' defaultValue='' name='id_asoc' onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Convenios</Form.Label>
                        <Form.Select className='mt-2' type='text' name='id_conv' defaultValue= 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {convenios.map( (convenio) => {
                                    return(<option key={convenio.id} value={convenio.id}>{convenio.nombre}</option>)
                                })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className=' fs-5'>Nombre</Form.Label>
                            <Form.Control className='rounded-0 border' type='text' name='nombre' onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className=' fs-5'>Precio</Form.Label>
                            <Form.Control className='rounded-0 border' type='number' name='precio' onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className=' fs-5'>Descripcion</Form.Label>
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