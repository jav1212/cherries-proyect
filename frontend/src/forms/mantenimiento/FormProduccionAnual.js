import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

export default function FormEmpresaProductora(){
    const [cultivos, setCultivos] = useState([])
    const [solicitarCults, setSolicitarCults] = useState(false)
    const [productoras, setProductoras] = useState([])

    const [startDate, setStartDate] = useState(new Date())

    const[prodAnual , setProdAnual] =useState({
        id_prod: '',
        id_crz: '',
        id_cult: '',
        anio: '',
        prod_log: ''
    })

    const handleChange = (e) => {
        if (e.target.name !== 'cultivo')
            setProdAnual({
                ...prodAnual,
                [e.target.name] : e.target.value
            })
        else{
            setProdAnual({
                ...prodAnual,
                id_crz: cultivos[e.target.value].variedad,
                id_cult: cultivos[e.target.value].cultivo
            })
        }

        if (e.target.name === 'id_prod')
            setSolicitarCults(true)
    }

    const handleDate = (date) => {
        setStartDate(date)
        setProdAnual({
            ...prodAnual,
            anio: date.getFullYear()
        })
    }

    const handleSubmit = () => {
        const {id_prod , id_cult, anio, prod_log} = prodAnual
        if((id_prod === '')||(id_cult === '')||(anio === '')||(prod_log === '')){
            alert('No pueden haber campos vacios')
            return
        }

        axios.post('http://localhost:3001/api/empresas/productora/produccionAnual', prodAnual).then(res => {
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
        if (solicitarCults){
            const {id_prod} = prodAnual
            axios.post('http://localhost:3001/api/empresas/productora/produccionAnual/cultivos',{id_prod}).then(res => setCultivos(res.data))
        }
        setSolicitarCults(false)
    }, [solicitarCults])
    
    
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
                        <Form.Label>Cultivos</Form.Label>
                            <Form.Select type='text' name='cultivo' defaultValue = 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {cultivos.map( (cultivo) => { 
                                    return <option key={cultivos.indexOf(cultivo)} value = {cultivos.indexOf(cultivo)}>{cultivo.nombre + ' ' + cultivo.calibre}</option>
                                })}        
                            </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Año de produccion</Form.Label>
                            <DatePicker
                                selected= {startDate}
                                onChange={handleDate}
                                showYearPicker
                                dateFormat='yyyy'
                            />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Produccion lograda</Form.Label>
                                <Form.Control type='number' name='prod_log' min='1' onChange={handleChange} />
                    </Form.Group>

                    <Button className='mt-4'variant="primary" type="submit">
                            Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}