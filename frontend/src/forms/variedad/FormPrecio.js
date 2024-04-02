import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function FormPrecio(){

    const [precioVar, setPrecioVar] = useState({
        id_pais: '',
        id_crz: '',
        precio: '',
        calibre: ''
    })

    let [paises, setPaises] = useState([])
    let [variedades, setVariedades] = useState([])
    let [verificar, setVerificar] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3001/api/variedad/registrarPrecio').then(res => { setPaises(res.data.paises) ; setVariedades(res.data.variedades)})
    }, [])

    useEffect(() => {
        if (verificar){
            const {id_pais, id_crz, calibre} = precioVar
            
            if ((id_pais !== '')&&(id_crz !== '')&&(calibre !== '')){
                axios.post('http://localhost:3001/api/variedad/precioActual', {id_pais, id_crz, calibre})
                .then(res => {
                    if (res.data.length !== 0){
                        alert('Existe un precio activo para esta variedad\nDebe registar su fecha fin de validez para ingresar uno nuevo') //seria bueno que aqui lo retornara de una vez a la pagina anterior
                        return
                    }}
                ).catch(err => {console.log(err) ; alert('Consulta fallida')})
            }
            setVerificar(false)
        }
    }, [verificar])

    const handleChange = (e) => {
        setPrecioVar({
            ...precioVar,
            [e.target.name] : e.target.value
        })

        if ((e.target.name === 'id_pais') || (e.target.name === 'id_crz') || (e.target.name === 'calibre'))
            setVerificar(true)
    }

    const handleSubmit = () => {
        const {id_pais, id_crz, precio, calibre} = precioVar

        if ((id_pais === '')||(id_crz === '')||(precio === '')||(calibre === '')){
            alert('Todos los campos debene estar completos')
            return
        }

        axios.post('http://localhost:3001/api/variedad/registrarPrecio', precioVar).then(res => console.log(res)).catch(err => alert(err))
    }

    return(
        <>
            <div className='container mt-xxl-5 d-flex align-items-center justify-content-center'>
                <Form className='w-100' onSubmit= {handleSubmit}>
                    <Form.Group>
                        <Form.Label>Pais</Form.Label>
                            <Form.Select type='text' name='id_pais' defaultValue = 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {paises.map( (pais) => { 
                                    return <option key={pais.id} value = {pais.id}>{pais.nombre}</option>
                                })}
                            </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className = 'mt-4'>Variedad</Form.Label>
                            <Form.Select type='text' name='id_crz' defaultValue = 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {variedades.map ( (variedad) => {
                                    return (<option key = {variedad.id} value = {variedad.id}>{variedad.nombre}</option>)
                                })}
                            </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className = 'mt-4'>Calibre</Form.Label>
                            <Form.Select type='text' name='calibre' defaultValue='Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                <option key= '1' value= 'Large'>Large</option>
                                <option value='Extralarge'>Extralarge</option>
                                <option value= 'Jumbo'>Jumbo</option>
                                <option value= 'Extrajumbo'>Extrajumbo</option>
                            </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className = 'mt-4'>Precio del Kg</Form.Label>
                        <Form.Control type='text' name='precio' onChange={handleChange}/>
                    </Form.Group>

                    <Button className='mt-4'variant="primary" type="submit">
                            Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}