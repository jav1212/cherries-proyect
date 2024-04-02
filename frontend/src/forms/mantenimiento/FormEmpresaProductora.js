import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function FormEmpresaProductora(){
    const [paises, setPaises] = useState([])
    const [regiones, setRegiones] = useState([])

    const [selectCoop, setSelectCoop] = useState(true)
    const [selectAsoc, setSelectAsoc] = useState(true)

    const [checkCoop, setCheckCoop] = useState(true)
    
    const [isCoopCheck, setIsCoopCheck] = useState(false)
    const [isAsocCheck, setIsAsocCheck] = useState(false)
    
    const [verificarTipo, setVerificarTipo] = useState(false)
    const [verificarPais, setVerificarPais] = useState(false)

    const [cooperativas, setCooperativas] = useState([])
    
    const [solicitarEmpresas, setSolicitarEmpresas] = useState(false)
    const [asociaciones, setAsociaciones] = useState([])

    const[empresa , setEmpresa] =useState({
        id_pais: '',
        id_reg: '',
        nombre: '',
        tipo: '',
        direc: '',
        envase: '',
        id_asoc: '',    
        id_coop: ''
    })

    const handleChange = (e) => {
        setEmpresa({
            ...empresa,
            [e.target.name] : e.target.value
        })

        if (e.target.name === 'tipo')
            setVerificarTipo(true)

        if (e.target.name === 'id_pais')
            setVerificarPais(true)
        
        if (e.target.name === 'id_reg')
            setSolicitarEmpresas(true)            
    }

    const handleSubmit = () => {
        const {id_pais, id_reg, nombre, tipo, direc, envase} = empresa

        if ((nombre === '') || (tipo === '') || (envase === '') ||
            (id_pais === '') || (id_reg === '') || (direc === '')){
                alert('Campos obligatorios vacios')
                return
        }

        axios.post('http://localhost:3001/api/empresas/productora/registro', empresa).then(res => {
            if (res.data.error !== undefined){
                alert(res.data.error + "\n" + res.data.sqlMessage)
                return
            }
            else
                alert('Registro realizado')
        }).catch(err => {console.log(err) ; alert('error')})
    }

    const handleCheckCoop = (e) => {
        if (e.target.checked){
            if (cooperativas.length === 0)
                setSolicitarEmpresas(true)
            setSelectCoop(false)
            setIsCoopCheck(true)
        }
        else{
            setSelectCoop(true)
            setIsCoopCheck(false)
        }
    }

    const handleCheckAsoc = (e) => {
        if (e.target.checked){
            if (asociaciones.length === 0)
                setSolicitarEmpresas(true)
            setSelectAsoc(false)
            setIsAsocCheck(true)
        }
        else{
            setSelectAsoc(true)   
            setIsAsocCheck(false)
        }    
    }

    useEffect(() => {
        axios.get('http://localhost:3001/api/lugar/registrarCdadReg').then(res => {setPaises(res.data)})
    }, [])

    useEffect(() => {
        if (verificarPais){
            const {id_pais} = empresa
            axios.post('http://localhost:3001/api/empresas/asociacionRegional', {id_pais}).then(res => {
                setRegiones(res.data)
                if (isAsocCheck)
                    setAsociaciones([])
                if (isCoopCheck)
                    setCooperativas([])
                setEmpresa({...empresa, id_reg: '', id_asoc: ''})

            })
            setVerificarPais(false)
        }
    }, [verificarPais])

    useEffect(() => {
        if (verificarTipo){
            console.log(empresa.tipo)
            if (empresa.tipo === 'Productora')
                setCheckCoop(false)
            
            else if (empresa.tipo === 'Cooperativa'){
                setIsCoopCheck(false)
                setCheckCoop(true)
                setSelectCoop(true)
                setEmpresa({...empresa, id_coop:''})
            }
            setVerificarTipo(false)
        }
    }, [verificarTipo, empresa])

    useEffect(() => {
        if (solicitarEmpresas){
            console.log(empresa.id_reg)
            if (empresa.id_reg !== ''){
                const {id_pais, id_reg} = empresa
                if (isAsocCheck){
                    axios.post('http://localhost:3001/api/empresas/productora/registro/asocRegs', {id_pais, id_reg}).then( res => setAsociaciones(res.data))
                    setEmpresa({...empresa, id_asoc:''})
                    console.log("en solicitar asocs")
                    console.log(empresa)
                }
                if (isCoopCheck){
                    axios.post('http://localhost:3001/api/empresas/productora/registro/cooperativas', {id_pais, id_reg}).then( res => setCooperativas(res.data))
                    setEmpresa({...empresa, id_coop:''})
                }
            }
            else if (empresa.id_reg === ''){
                alert('Debe ingresar la region donde se encuentra ubicado')
                setEmpresa({...empresa, id_asoc:'', id_coop:''})                
            }
            setSolicitarEmpresas(false)
        }   
    }, [solicitarEmpresas, empresa])

    return(
        <>
            <div className='container mt-xxl-5 d-flex align-items-center justify-content-center'>
                <Form className='w-100' onSubmit= {handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                            <Form.Control type='text' name='nombre' onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className= 'mt-4'>
                        <Form.Label>Envase estandar</Form.Label>
                            <Form.Control type='text' name='envase' onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className= 'mt-4'>
                        <Form.Label>Tipo de empresa</Form.Label>
                            <Form.Select type='text' name='tipo' defaultValue= 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                <option>Productora</option>
                                <option>Cooperativa</option>
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
                        <Form.Label>Region</Form.Label>
                            <Form.Select type='text' name='id_reg' defaultValue= 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {regiones.map( (region) => { 
                                    return <option key={region.id} value = {region.id}>{region.nombre}</option>
                                })}                         
                            </Form.Select>
                    </Form.Group>

                    <Form.Group className= 'mt-4'>
                        <Form.Label>Direccion</Form.Label>
                            <Form.Group className='w-100' as='textarea' rows={3} name='direc' onChange={handleChange}/>
                    </Form.Group>

                    <Form.Check
                        className= 'mt-4'
                        label= 'Pertenezco a una asociacion regional'
                        name= 'asoc_check'
                        type= 'checkbox'
                        id= 'asoc_check'
                        onChange={handleCheckAsoc}
                    />
                    <Form.Group className= 'mt-4'>
                        <Form.Label>Asociacion Regional</Form.Label>
                            <Form.Select type='text' name='id_asoc' onChange={handleChange} disabled= {selectAsoc} defaultValue= 'Selecciona una opcion'>
                                <option hidden>Selecciona una opcion</option>
                                {asociaciones.map( (asociacion) => { 
                                    return <option key={asociacion.id} value = {asociacion.id}>{asociacion.nombre}</option>
                                })}
                            </Form.Select>
                    </Form.Group>
                    
                    <Form.Check
                        className= 'mt-4'
                        label= 'Pertenezco a una cooperativa'
                        name= 'coop_check'
                        type= 'checkbox'
                        id= 'coop_check'
                        disabled = {checkCoop}
                        onChange = {handleCheckCoop}
                        checked = {isCoopCheck}
                    />

                    <Form.Group className= 'mt-4'>
                        <Form.Label>Cooperativa</Form.Label>
                            <Form.Select type='text' name='id_coop' onChange={handleChange} defaultValue= 'Selecciona una opcion' disabled={selectCoop}>
                                <option hidden>Selecciona una opcion</option>
                                {cooperativas.map( (cooperativa) => { 
                                    return <option key={cooperativa.id} value = {cooperativa.id}>{cooperativa.nombre}</option>
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