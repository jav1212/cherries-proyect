import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function FormEnvio(){
    const [productoras, setProductoras] = useState([])
    const [contratos, setContratos] = useState([])
    const [detallesCont, setDetallesCont] = useState([])

    const [cambiarProductora, setCambiarProductora] = useState(false)
    const [cambiarContrato, setCambiarContrato] = useState(false)

    const[envio , setEnvio] =useState({
        id_prod_cont: '',
        id_client_cont: '',
        id_cont: '',
        fe_env: '',
        fe_recolec: '',
        cantidad: '',
        id_crz_cult:'',
        id_cult:''
    })

    const handleChange = (e) => {
        if (e.target.name === 'contratos'){
            setEnvio({
                ...envio,
                id_client_cont: contratos[e.target.value].id_client,
                id_cont: contratos[e.target.value].id_cont,
            })
        }
        else if (e.target.name === 'detallescontrato'){
            setEnvio({
                ...envio,
                id_crz_cult: detallesCont[e.target.value].id_crz_cult,
                id_cult: detallesCont[e.target.value].id_cult
            })
        }
        else{
            setEnvio({
                ...envio,
                [e.target.name] : e.target.value,
            })
        }

        if (e.target.name === 'id_prod_cont')
            setCambiarProductora(true)

        if (e.target.name === "contratos")
            setCambiarContrato(true)
    }

    const handleSubmit = () => {
        const {id_prod_cont, id_client_cont, fe_env, fe_recolec, cantidad} = envio

        if( (id_prod_cont === '')||(id_client_cont === '')||
            (fe_env === '')||(fe_recolec === '')||(cantidad === '')){
            alert('Campos obligatorios vacios')
            return
        }

        axios.post('http://localhost:3001/api/contratos/envio/registro', {envio}).then(res => {
            if (res.data.error !== undefined){
                alert(res.data.error + "\n" + res.data.sqlMessage)
                return
            }
            else
                alert('Registro realizado')
        }).catch(err => {console.log(err) ; alert('error')})
    }

    useEffect(() => {
        axios.get('http://localhost:3001/api/empresas/productora').then(res => setProductoras(res.data))
    }, [])

    useEffect(() => {
        if (cambiarProductora){
            const {id_prod_cont} = envio
            axios.post('http://localhost:3001/api/contratos/envio', {id_prod_cont}).then(res => {
                setContratos(res.data)
                setEnvio({
                    ...envio,
                    id_client_cont:'',
                    id_cont:'',
                    id_crz_cult:'',
                    id_cult:''
                })
            })
            setCambiarProductora(false)
        }
    }, [cambiarProductora])

    useEffect(() =>{
        if (cambiarContrato){
            const {id_cont, id_client_cont, id_prod_cont} = envio
            axios.post('http://localhost:3001/api/contratos/envio/detallesContrato', {id_prod_cont, id_client_cont, id_cont}).then(res => {
                setDetallesCont(res.data)
                setEnvio({
                    ...envio,
                    id_crz_cult:'',
                    id_cult:''
                })
            })
            setCambiarContrato(false)
        }
    }, [cambiarContrato])
    

    return(
        <>
            <div className='container mt-xxl-5 d-flex align-items-center justify-content-center'>
                <Form className='w-100' onSubmit= {handleSubmit}>
                    <Form.Group>
                        <Form.Label>Empresa</Form.Label>
                            <Form.Select type='text' name='id_prod_cont' defaultValue = 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                    {productoras.map( (productora) => { 
                                        return <option key={productora.id} value = {productora.id}>{productora.nombre}</option>
                                    })}        
                            </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contrato con la empresa cliente</Form.Label>
                            <Form.Select type='text' name='contratos' defaultValue='Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {contratos.map( (contrato) => { 
                                    return <option key={contratos.indexOf(contrato)} value = {contratos.indexOf(contrato)}>{contrato.client}</option>
                                })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Variedad del detalle de contrato</Form.Label>
                            <Form.Select type='text' name='detallescontrato' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                    {detallesCont.map( (detalle) => { 
                                        return <option key={detallesCont.indexOf(detalle)} value = {detallesCont.indexOf(detalle)}>{detalle.nombre + " " + detalle.calibre}</option>
                                })}
                            </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fecha de envio</Form.Label>
                        <Form.Control type='date' name='fe_env' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fecha de recoleccion</Form.Label>
                        <Form.Control type='date' name='fe_recolec' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cantidad en kg</Form.Label>
                        <Form.Control type='number' min='1' name='cantidad' onChange={handleChange} />
                    </Form.Group>
                    <Button className='mt-4'variant="primary" type="submit">
                            Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}