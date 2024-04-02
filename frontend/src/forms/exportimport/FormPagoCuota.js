import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function FormCuotas(){
    const [clientes, setClientes] = useState([])
    const [productoras, setProductoras] = useState([])

    const [verificarCliente, setVerificarCliente] = useState(false)

    const[pago, setPago] =useState({
        id_prod_cont: '',
        id_client_cont: '',
        id_cont: '',
        monto: ''
    })

    const handleChange = (e) => {
        if (e.target.name !== 'productora'){
            setPago({
                ...pago,
                [e.target.name] : e.target.value,
            })

        }
        else{
            setPago({
                ...pago,
                id_prod_cont: productoras[e.target.value].productora,
                id_cont: productoras[e.target.value].contrato
            })
        }

        if (e.target.name === 'id_client_cont')
            setVerificarCliente(true)
    }

    const handleSubmit = () => {
        const {id_prod_cont, id_client_cont, monto} = pago
        if((id_prod_cont === '')||(id_client_cont === '')||(monto === '')){
            alert('Campos obligatorios vacios')
            return
        }
        
        axios.post('http://localhost:3001/api/pagos/registro', pago).then(res => {
            if (res.data.error !== undefined){
                alert(res.data.error + "\n" + res.data.sqlMessage)
                return
            }
            else
                alert('Registro realizado')
        }).catch(err => {console.log(err) ; alert('error')})
    }
    

    useEffect(() => {
        axios.get('http://localhost:3001/api/empresas/cliente').then(res => setClientes(res.data))
    }, [])

    useEffect(() =>{
        if (verificarCliente){
            console.log("Aqui")
            const {id_client_cont} = pago
            axios.post('http://localhost:3001/api/pagos/empresasProductoras', {id_client_cont}).then(res => {console.log(res.data);setProductoras(res.data)})
            setVerificarCliente(false)
        }
    },[verificarCliente])

    return(
        <>
            <div className='container mt-xxl-5 d-flex align-items-center justify-content-center'>
                <Form className='w-100' onSubmit= {handleSubmit}>
                <Form.Group>
                        <Form.Label>Empresa Cliente</Form.Label>
                            <Form.Select type='text' name='id_client_cont' defaultValue = 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                    {clientes.map( (cliente) => { 
                                        return <option key={cliente.id} value = {cliente.id}>{cliente.nombre}</option>
                                    })}        
                            </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Contrato activo con empresa productora</Form.Label>
                            <Form.Select type='text' name='productora' defaultValue = 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                    {productoras.map( (productora) => { 
                                        return <option key={productoras.indexOf(productora)} value = {productoras.indexOf(productora)}>{productora.nombre} ID Contrato: {productora.contrato}</option>
                                    })}        
                            </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Monto</Form.Label>
                        <Form.Control type='number' name='monto' min='1' onChange={handleChange} />
                    </Form.Group>
                    <Button className='mt-4'variant="primary" type="submit">
                            Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}