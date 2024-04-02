import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function FormFormaPago(){
    const [disableCont, setDisableCont] = useState(true)
    const [disableCuota, setDisableCuota] = useState(true)
    const [isContEmi, setIsContEmi] = useState(false)
    const [isContEnv, setIsContEnv] = useState(false)

    const [productoras, setProductoras] = useState([])
    
    const [verificarTipo, setVerificarTipo] = useState(false)

    const[forma , setForma] =useState({
        id_prod: '',
        tipo: '',
        conta_env: '',
        conta_emi: '',
        num_cuotas: '',
        prt_cuota: ''
    })

    const handleChange = (e) => {
        setForma({
            ...forma,
            [e.target.name] : e.target.value,
        })

        if (e.target.name === 'tipo')
            setVerificarTipo(true)
    }

    const handleCheckConta = (e) => {
        if (e.target.checked){
            setForma({
                ...forma,
                [e.target.name]: true
            })
            
            if (e.target.name === 'conta_emi')
                setIsContEmi(true)
            else
                setIsContEnv(true)
        }
        else{
            setForma({
                ...forma,
                [e.target.name]: false
            })
            if (e.target.name === 'conta_emi')
                setIsContEmi(false)
            else
                setIsContEnv(false)
        }
    }

    const handleSubmit = () => {
        const {id_prod, tipo, conta_env, conta_emi, num_cuotas, prt_cuota} = forma

        if ((id_prod === '')||(tipo === '')){
            alert('Campos obligatorios vacios')
            return
        }
        else if (((tipo === 'Contado') && ((conta_emi === '') || (conta_env === '')))||((tipo === 'Cuota') && ((num_cuotas === '') || (prt_cuota === '')))){
            alert('Campos obligatorios vacios')
            return    
        }

        axios.post('http://localhost:3001/api/pagos/formapago/registro', forma).then(res => {
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
        if (verificarTipo){
            if (forma.tipo === 'Contado'){
                setDisableCont(false)
                setDisableCuota(true)
                setForma({...forma, conta_emi: '', conta_env: '', num_cuotas: '', prt_cuota: ''})
            }
            else if (forma.tipo === 'Cuota'){
                setDisableCont(true)
                setDisableCuota(false)
                setIsContEmi(false)
                setIsContEnv(false)
                setForma({...forma, conta_emi: '', conta_env: '', num_cuotas: '', prt_cuota: ''})
            }
            setVerificarTipo(false)
        }
    }, [verificarTipo])

    return(
        <>
            <div className='container mt-xxl-5 d-flex align-items-center justify-content-center'>
                <Form className='w-100' onSubmit= {handleSubmit}>
                <Form.Group>
                    <Form.Label>Empresa Productora</Form.Label>
                        <Form.Select type='text' name='id_prod' defaultValue = 'Selecciona una opcion' onChange={handleChange}>
                            <option hidden>Selecciona una opcion</option>
                            {productoras.map( (productora) => { 
                                return <option key={productora.id} value = {productora.id}>{productora.nombre}</option>
                            })}        
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tipo de forma de pago</Form.Label>
                        <Form.Select type='text' name='tipo' defaultValue='Selecciona una opcion' onChange={handleChange}>
                            <option hidden>Selecciona una opcion</option>
                            <option>Contado</option>
                            <option>Cuota</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Check className= 'mt-4' label= 'La emision del pago es por contado' name= 'conta_emi' 
                                type= 'checkbox' id= 'conta_emi' onChange={handleCheckConta} disabled={disableCont} checked = {isContEmi}
                    />
            
                    <Form.Check className= 'mt-4' label= 'El envio de la mercancia de los detalles del contrato es por contado' 
                                name= 'conta_env' type= 'checkbox' id= 'conta_env' onChange={handleCheckConta} disabled={disableCont} checked={isContEnv}
                    />

                    <Form.Group>
                        <Form.Label>Numero de cuotas a pagar</Form.Label>
                            <Form.Control type='number' min='2' name='num_cuotas' onChange={handleChange} disabled={disableCuota}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Porcentaje de cada cuota a pagar</Form.Label>
                            <Form.Control type='text' name='prt_cuota' onChange={handleChange} disabled={disableCuota}/>
                    </Form.Group>

                    <Button className='mt-4'variant="primary" type="submit">
                            Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}