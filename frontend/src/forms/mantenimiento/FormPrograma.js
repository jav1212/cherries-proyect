import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function FormPrograma(){
    const [cultivos, setCultivos] = useState([])
    const [solicitarCults, setSolicitarCults] = useState(false)
    const [productoras, setProductoras] = useState([])
    const [personas, setPersonas] = useState([])

    const[programa , setPrograma] =useState({
        id_prod: '',
        id_crz: '',
        id_per: '',
        aporte: '',
    })

    const handleChange = (e) => {
        if (e.target.name !== 'cultivo'){
            setPrograma({
                ...programa,
                [e.target.name] : e.target.value
            })
        }
        else{
            setPrograma({
                ...programa,
                id_crz: cultivos[e.target.value].variedad
            })
        }

        if (e.target.name === 'id_prod')
            setSolicitarCults(true)
    }

    const handleSubmit = () => {
        const {id_per, id_crz, id_prod, aporte} = programa

        if ((id_prod === '')||(id_crz === '')||(id_per === '')){
            alert('Campos obligatorios vacios')
            return
        }

        axios.post('http://localhost:3001/api/apadrinamientos/registrar', {id_per, id_crz, id_prod, aporte}).then(res => {
            if (res.data.error !== undefined){
                alert(res.data.error + "\n" + res.data.sqlMessage)
                return
            }
            else
                alert('Registro realizado')
            
        }).catch(err => {console.log(err) ; alert('error')})
        
    }

    useEffect(() => {
        axios.get('http://localhost:3001/api/apadrinamientos/registrar').then(res => {setProductoras(res.data.productoras); setPersonas(res.data.personas)})
    }, [])

    useEffect(() => {
        if (solicitarCults){
            const {id_prod} = programa
            axios.post('http://localhost:3001/api/empresas/productora/produccionAnual/cultivos',{id_prod}).then(res => setCultivos(res.data))
        }
        setSolicitarCults(false)
    }, [solicitarCults])

    return(
        <>
            <div className='container mt-xxl-5 d-flex align-items-center justify-content-center'>
                <Form className='w-100' onSubmit= {handleSubmit}>
                    <Form.Group>
                        <Form.Label>Empresa productora</Form.Label>
                            <Form.Select type='text' name='id_prod' defaultValue = 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                    {productoras.map( (productora) => { 
                                        return <option key={productora.id} value = {productora.id}>{productora.nombre}</option>
                                    })}        
                            </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cultivos</Form.Label>
                            <Form.Select type='text' name='cultivo' defaultValue = 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {cultivos.map( (cultivo) => { 
                                    return <option key={cultivos.indexOf(cultivo)} value = {cultivos.indexOf(cultivo)}>{cultivo.nombre}</option>
                                })}        
                            </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Persona</Form.Label>
                            <Form.Select type='text' name='id_per' defaultValue = 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                    {personas.map( (persona) => { 
                                        let nombre2 = ''
                                        let apellido2 = ''

                                        if (persona.nombre2 == null)
                                            nombre2 = ''
                                        else
                                            nombre2 = persona.nombre2
                                        if (persona.apellido2 == null)
                                            apellido2 = ''
                                        else
                                            apellido2 = persona.apellido2
                                        return <option key={persona.doc_id} value = {persona.doc_id}>{persona.nombre1 + " " + nombre2 + ' ' + persona.apellido1 + " " + apellido2}</option>
                                    })}        
                            </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{"Aporte anual (opcional)"}</Form.Label>
                                <Form.Control type='number' name='aporte' min='1' onChange={handleChange} />
                    </Form.Group>
                    <Button className='mt-4'variant="primary" type="submit">
                            Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}