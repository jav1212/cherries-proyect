import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'reactjs-popup/dist/index.css'

export default function FormContrato(){
    const [productoras, setProductoras] = useState([])
    const [clientes, setClientes] = useState([])

    const [formasPago, setFormasPago] = useState([])
    const [verificarFormPago, setVerificarFormPago] = useState(false)

    const [registrarDetalle, setRegistrarDetalle] = useState(true)

    const [abrirModal, setAbrirModal] = useState(false)

    const [detallesCont, setDetallesCont] = useState([])

    const [cultivos, setCultivos] = useState([])

    const [monto, setMonto] = useState(0)

    const [submit, setSubmit] = useState(false)

    const navigate = useNavigate()

    const[contrato , setContrato] =useState({
        id_prod: '',
        id_client: '',
        transp: '',
        descuento: '',
        id_fr_pg: '',
        id_prod_pais: ''
    })

    const [detContrato, setDetContrato] = useState({
        id_client_cont: '',
        id_prod_cont: '',
        id_crz_cult: '',
        id_cult: '',
        ctd: '',
        nombre: '',
        precioxPais: '',
        monto: '',
        fe_envio: '',
        calibre:''
    })

    const handleChangeContrato = (e) => {
        if (e.target.name === 'id_prod'){
            setContrato({
                ...contrato,
                id_prod: productoras[e.target.value].id,
                id_prod_pais: productoras[e.target.value].id_pais
            })
            setVerificarFormPago(true)
        }
        else
            setContrato({
                ...contrato,
                [e.target.name] : e.target.value,
            })
    }

    const handleChangeDetContrato = (e) => {
        if (e.target.name === 'cultivo'){
            setDetContrato({
                ...detContrato,
                id_crz_cult: cultivos[e.target.value].id_crz_cult,
                id_cult: cultivos[e.target.value].id_cult,
                precioxPais: cultivos[e.target.value].precio,
                nombre: cultivos[e.target.value].nombre,
                calibre: cultivos[e.target.value].calibre
            })
        }
        else{
            setDetContrato({
                ...detContrato,
                [e.target.name]: e.target.value
            })
        }
        console.log(e.target.name + " " + e.target.value)
    }

    const handleSiguiente = () => {
        const {id_prod, id_client, transp, id_fr_pg} = contrato
        const id_pais = contrato.id_prod_pais

        if ((id_prod === '')||(id_client === '')||(transp === '')||(id_fr_pg === '')){
            alert('Los campos no pueden estar vacios')
            return
        }    

        axios.post('http://localhost:3001/api/contratos/verificacionregistro', {id_prod, id_client}).then(res => {
            if (res.data.error !== undefined){
                alert(res.data.error)
                setContrato({
                    id_prod: '',
                    id_client: '',
                    transp: '',
                    descuento: '',
                    id_fr_pg: '',
                    id_prod_pais: ''
                })
                document.getElementById("id_client").value = ""
                document.getElementById("id_prod").value = ""
                document.getElementById("descuento").value = ""
                document.getElementById("id_fr_pg").value = ""
                document.getElementById("transp").value = ""
                return
            }
            else{
                axios.post('http://localhost:3001/api/contratos/detalleContrato/cultivosproductora',{id_prod, id_pais}).then(res => setCultivos(res.data))
                setRegistrarDetalle(false)
            }
                
        }).catch(err => {console.log(err) ; alert('error')})        
    }

    const handleConfirm = () => {
        const {id_cult, ctd} = detContrato
        
        if ((id_cult === '')||(ctd ===''))
            alert('Campos obligatorios vacios')
        else{
            const repetido = detallesCont.find((detalle) => {return detalle.id_cult === id_cult})
            if (!repetido){
                let montoDetCont = Number(detContrato.ctd * detContrato.precioxPais).toFixed(2)
                let montoCont = Number(Number(montoDetCont) + Number(monto)).toFixed(2)
                
                setDetContrato({
                    ...detContrato, 
                    id_prod_cont: contrato.id_prod,
                    id_client_cont: contrato.id_client,
                    monto: montoDetCont
                })

                setMonto(montoCont)

                if (detallesCont.length === cultivos.length-1){
                    setSubmit(true)
                    setAbrirModal(false)
                }
                else
                    setAbrirModal(true)
            }
            else{
                setDetContrato({
                    id_crz_cult: '',
                    id_cult: '',
                    ctd: '',
                    nombre: '',
                    precioxPais: '',
                    monto: '',
                    fe_envio: ''
                })
                document.getElementById("cultivo").value = ""
                document.getElementById("ctd").value = ""
                document.getElementById("fe_envio").value = ""
                setAbrirModal(false)
                alert("Detalle de contrato no valido, ya lo ha ingresado antes")
            } 
        }        
    }
    
    const handleAgregarDet = () => {
        setAbrirModal(false)
        let auxDetallesCont = detallesCont
        auxDetallesCont.push(detContrato)
        setDetallesCont(auxDetallesCont)
        setDetContrato({
            id_crz_cult: '',
            id_cult: '',
            ctd: '',
            nombre: '',
            precioxPais: '',
            monto: '',
            fe_envio: ''
        })
        document.getElementById("cultivo").value = ""
        document.getElementById("ctd").value = ""
        document.getElementById("fe_envio").value = ""
        
    }

    const handleFinalizar = () =>{
        let auxDetallesCont = detallesCont
        auxDetallesCont.push(detContrato)
        setDetallesCont(auxDetallesCont)
        setSubmit(true)
    }

    useEffect(() => {
        if (submit){
            const {id_prod, id_client, id_fr_pg, descuento, transp} = contrato
            axios.post('http://localhost:3001/api/contratos/registrar', {id_prod, id_client, id_fr_pg, descuento, transp, monto}).then(() => {
                axios.post('http://localhost:3001/api/contratos/verificacionregistro',{id_prod, id_client}).then(res => {
                    const {id_cont} = res.data.result[0]

                    let auxDetallesCont = detallesCont
                    auxDetallesCont.push(detContrato)
                    auxDetallesCont.map((detalle) => {
                        const {id_prod_cont, id_client_cont, id_crz_cult, id_cult, ctd, fe_envio} = detalle
                        axios.post('http://localhost:3001/api/contratos/detalleContrato/registrar', {id_cont, id_prod_cont, id_client_cont, id_crz_cult, id_cult, ctd, fe_envio}).then(res => {
                            if (res.data.error !== undefined){
                                alert(res.data.error + "\n" + res.data.sqlMessage)
                                return
                            }
                        }).catch(err => {console.log(err) ; alert('error')})
                    })                    
                    setSubmit(false)
                    navigate('/exportimport')    
                    
                })            
            })
            
        }
    }, [submit])

    useEffect(() => {
        axios.get('http://localhost:3001/api/empresas/productora/paises').then(res => setProductoras(res.data))
        axios.get('http://localhost:3001/api/empresas/cliente').then(res => setClientes(res.data))
    }, [])

    useEffect(() => {
        if (verificarFormPago){
            const {id_prod} = contrato
            axios.post('http://localhost:3001/api/pagos/formaspago/productora', {id_prod}).then(res => setFormasPago(res.data))
            setContrato({...contrato, id_fr_pg: ''})
            setVerificarFormPago(false)
        }
    }, [verificarFormPago])

    return(
        <>
            <div className='container mt-xxl-5 d-flex align-items-center justify-content-center'>
                <Form className='w-100'>
                    <Form.Group hidden={!registrarDetalle}>
                        <Form.Group>
                            <Form.Label>Empresa cliente</Form.Label>
                                <Form.Select type='text' id='id_client' name='id_client' defaultValue = 'Selecciona una opcion' onChange={handleChangeContrato}>
                                    <option hidden>Selecciona una opcion</option>
                                        {clientes.map( (cliente) => { 
                                            return <option key={cliente.id} value = {cliente.id}>{cliente.nombre}</option>
                                        })}        
                                </Form.Select>

                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label>Contrato activo con empresa productora</Form.Label>
                                <Form.Select type='text' id='id_prod' name='id_prod' defaultValue = 'Selecciona una opcion' onChange={handleChangeContrato}>
                                    <option hidden>Selecciona una opcion</option>
                                        {productoras.map( (productora) => { 
                                            return <option key={productoras.indexOf(productora)} value = {productoras.indexOf(productora)}>{productora.nombre}</option>
                                        })}        
                                </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Transporte de la mercancia</Form.Label>
                            <Form.Select id='transp' name='transp' defaultValue='Selecciona una opcion' onChange={handleChangeContrato}>
                                <option hidden>Selecciona una opcion</option>
                                <option>Aéreo</option>
                                <option>Terrestre</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Porcentaje de descuento</Form.Label>
                            <Form.Control id='descuento' type='number' name='descuento' min='1' onChange={handleChangeContrato} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Forma de pago</Form.Label>
                            <Form.Select id='id_fr_pg' name='id_fr_pg' defaultValue='Selecciona una opcion' onChange={handleChangeContrato}>
                                <option hidden>Selecciona una opcion</option>
                                    {formasPago.map((forma) => {
                                        let texto = ''
                                        if (forma.tipo === 'Contado'){
                                            texto = forma.tipo
                                            if (forma.conta_emi === 1)
                                                texto += ' con emision de pago por contado'
                                            else
                                                texto += ' sin emision de pago por contado'
                                            
                                            if (forma.conta_env === 1)
                                                texto += ' y con envio por contado'
                                            else
                                                texto+= ' y sin envio por contado' 
                                        }
                                        else
                                            texto+= forma.num_cuotas + ' cuotas, c/u de ' + forma.prt_cuota + '%'
                                        
                                        return <option key={forma.id} value={forma.id}>{texto}</option>
                                    })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Button className='mt-4' variant="primary" onClick={handleSiguiente}>
                                Siguiente
                            </Button>
                        </Form.Group>

                    </Form.Group>
                   
                    <Form.Group hidden={registrarDetalle}>
                        <h2>Detalles de contrato</h2>
                            
                        <Form.Group className='mt-4' >
                            <Form.Label>Variedad cereza</Form.Label>
                                <Form.Select type='text' id='cultivo' name='cultivo' defaultValue = 'Selecciona una opcion' onChange={handleChangeDetContrato}>
                                    <option hidden>Selecciona una opcion</option>
                                    {cultivos.map( (cultivo) => { 
                                        return <option key={cultivos.indexOf(cultivo)} value = {cultivos.indexOf(cultivo)}>{cultivo.nombre + " " + cultivo.calibre + " " + cultivo.precio + "$/kg"}</option>
                                    })}
                                </Form.Select>
                        </Form.Group>

                        <Form.Group className='mt-4'>
                            <Form.Label>Cantidad a comprar en kg</Form.Label>
                            <Form.Control type='number' id='ctd' name='ctd' min='1' onChange={handleChangeDetContrato} />
                        </Form.Group>

                        <Form.Group className='mt-4'>
                            <Form.Label>Fecha de envio aproximada {"(opcional)"}</Form.Label>
                            <Form.Control type='text' id='fe_envio' name='fe_envio' min='1' onChange={handleChangeDetContrato} />
                        </Form.Group>
                        
                        <Form.Group className='mt-4'>
                            <Button color='success' onClick={handleConfirm}>Confirmar</Button>
                        </Form.Group>


                    </Form.Group>

                    <Modal isOpen={abrirModal}>
                        <ModalHeader>
                            Detalle de contrato 
                        </ModalHeader>

                        <ModalBody>
                            <Container>
                                <Row className="mt-xxl-5 d-flex align-items-center justify-content-center" xs="auto">{"Precio total a pagar por " + detContrato.nombre + " " + detContrato.calibre + ": " + detContrato.monto}</Row>
                                <Row className="mt-xxl-5 d-flex align-items-center justify-content-center" xs="auto">{"Total a pagar actual del contrato: " + monto + "$"}</Row>
                            </Container>
                        </ModalBody>    

                        <ModalFooter>
                            <Container>
                                <Row className="mt-xxl-5 d-flex align-items-center justify-content-center" xs="auto">Agregar otro detalle</Row>
                                <Row className="mt-xxl-5 d-flex align-items-center justify-content-center" xs="auto" >
                                    <Col><Button color='primary' onClick={handleAgregarDet}>Si</Button></Col>
                                    <Col><Button color='black' onClick={handleFinalizar}>No</Button></Col>
                                </Row>
                            </Container>                        
                        </ModalFooter>
                    </Modal>   
                </Form> 

                                                              
            </div>
        </>
    )
}