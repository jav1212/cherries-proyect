import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'
import FormMulti from './FormMulti'

export default function FormEvaluacionAnual(){
    const[evaluacion, setEvaluacion] = useState({
        id_prod: '',
        id_client: '',
        anio: '',
        result: '',
        prt_result: '',
        decision: '',
    })

    const[clientes, setClientes] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/api/evaluacion/listaclientes').then(res => setClientes(res.data))
    },[])

    let [verificarProductora, setverificarProductora] = useState(false)
    const[productoras, setProductoras] = useState([])
    useEffect(() => {
        if(verificarProductora){
            const {id_client} = evaluacion

            if(id_client !== ''){
                axios.post('http://localhost:3001/api/evaluacion/listaproductoras', {id_client})
                .then(res => setProductoras(res.data))
                .catch(err => {console.log(err) ; alert('Consulta fallida')})
            
            }
            setverificarProductora(false)
        }
    },[verificarProductora,evaluacion])


    const[contrato,setContrato] = useState(null)
    let [verificarDetalles, setVerificarDetalles] = useState(false)
    const[detalles, setDetalles] = useState([])
    useEffect(() => {
        if(verificarDetalles){
            const {id_client, id_prod} = evaluacion
            const {id_cont} = contrato

            let id_client_cont = id_client
            let id_prod_cont = id_prod
            console.log(id_client_cont,id_prod_cont,id_cont)
            axios.post('http://localhost:3001/api/evaluacion/listadetalles',{id_client_cont,id_prod_cont,id_cont})
            .then(res => setDetalles(res.data))
            .catch(err => {console.log(err) ; alert('Consulta fallida')})

            setVerificarDetalles(false)
        }
    },[verificarDetalles])

    const handleChange = (e) => {
        setEvaluacion({
            ...evaluacion,
            [e.target.name] : e.target.value
        })

        if(e.target.name === 'id_client')
            setverificarProductora(true)

        if(e.target.name === 'id_prod'){
            setEvaluacion({
                ...evaluacion, id_prod:
                productoras[e.target.value].id_prod
            })
            setContrato(productoras[e.target.value].id_cont)
            setVerificarDetalles(true)
        }
    }

    return(
        <>
            <div className='container mt-xxl-5 d-flex align-items-center justify-content-center'>
                <Form className='w-100'>
                    <Form.Group>
                        <Form.Label>Empresa cliente</Form.Label>
                        <Form.Select className='mt-2' type='text' name='id_client' defaultValue= 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {clientes.map( (cliente) => {
                                    return (<option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>)
                                })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Empresa productora</Form.Label>
                        <Form.Select className='mt-2' type='text' name='id_prod'  onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {productoras.map( (productora) => {
                                    return (<option key={productoras.indexOf(productora)} value={productoras.indexOf(productora)}>{productora.nombre}</option>)
                                } )}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Button className='mt-4'variant="primary">
                            Siguiente
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </>
    )
}