import { Form, Button, FormCheck, FormGroup, FormControl } from 'react-bootstrap'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function FormReceta(){
    const[recetas, setRecetas] = useState({
        nombre:'',
        tipo:'',
        descrip:'',
        tiempo_prep:'',
        racion:'',
        id_produ:'',
        id_cliente:'',
        escritor:'',
        cantidad:'',
        canti:'',
        variedad:'',
        ingrediente:''
    })
    const[listavariedad,setListavariedad] = useState([])
    const[listaingrediente,setListaingrediente] = useState([])

    const[checked,setCheked] = useState(true)
    useEffect(()=>{
        if(checked){
            listavariedad.forEach(element => {
                document.getElementById(element).hidden = false
            });
        }
    },[listavariedad,checked])

    

    const handleChange = (e) => {
        setRecetas({
            ...recetas,
            [e.target.name] : e.target.value,
        })

        if(e.target.name === 'id_produ'){
            setVeriempresa(true)
            setVericlient(false)
        }

        if(e.target.name === 'id_cliente'){
            setVericlient(true)
            setVeriempresa(false)
        }

        if(e.target.name === 'variedad'){
            if(e.target.checked){
                setListavariedad(listavariedad.concat(e.target.value))
            }
            else{
                let index = listavariedad.indexOf(e.target.value)
                listavariedad.splice(index,1)
                setListavariedad(listavariedad)
                document.getElementById(e.target.value).value = ''
                document.getElementById(e.target.value).hidden = true
            }
        }

        if(e.target.name === 'cantidad'){
            if(!listavariedad.includes(e.target.id))
                document.getElementById(e.target.id).value = ''
                
        }
        
        if(e.target.name === 'ingrediente'){
            if(e.target.checked){
                setListaingrediente(listaingrediente.concat(e.target.value))
            }
            else{
                let index = listaingrediente.indexOf(e.target.value)
                listaingrediente.splice(index,1)
                setListaingrediente(listaingrediente)
                document.getElementById(e.target.value+500).value = ''
                document.getElementById(e.target.value+500).hidden = true
            }
        }

        if(e.target.name === 'canti'){
            if(!listaingrediente.includes(e.target.id+500))
                document.getElementById(e.target.id+500).value = ''
        }
    }

    const[veriempresa, setVeriempresa] = useState(false)
    const[vericlient, setVericlient] = useState(false)

    const[escritores, setEscritores] = useState([])
    useEffect(() => {
        if(veriempresa){
            axios.get('http://localhost:3001/api/empresas/productora')
            .then(res => setEscritores(res.data))
            .catch(err => {console.log(err) ; alert('Consulta fallida')})
        }
        else if(vericlient){
            axios.get('http://localhost:3001/api/empresas/cliente')
            .then(res => setEscritores(res.data))
            .catch(err => {console.log(err) ; alert('Consulta fallida')})
        }
    },[recetas,veriempresa,vericlient])

    const[verivariedades, setVerivariedades] = useState(true)
    const[variedades, setVariedades] = useState([])
    useEffect(() => {
        if(verivariedades){
            axios.get('http://localhost:3001/api/variedad')
            .then(res => setVariedades(res.data))
            .catch(err => {console.log(err) ; alert('Consulta fallida')})
            setVerivariedades(false)
        }
    },[setVariedades,variedades,verivariedades,setVerivariedades])

    const[veriingredientes,setVeriingredientes] = useState(true)
    const[ingredientes,setIngredientes] = useState([])
    useEffect(() => {
        if(veriingredientes){
            axios.get('http://localhost:3001/api/registrareceta/listaingredientes')
            .then(res => setIngredientes(res.data))
            .catch(err => {console.log(err) ; alert('Consulta fallida')})
            setVeriingredientes(false)
        }
    },[veriingredientes])

    const handleSubmit = () => {
        const {nombre,tipo,descrip,tiempo_prep,racion,id_cliente,id_produ, escritor} = recetas

        if((nombre === '') || (tipo === '') || (descrip === '') || (tiempo_prep === '') || (racion === '') || (escritor === '')){
            alert('campo vacio')
            return
        }

        let id_prod = null
        let id_client = null

        if(veriempresa)
            id_prod = escritor
        else
            id_client = escritor

        axios.post('http://localhost:3001/api/registrareceta',
        {nombre,tipo,tiempo_prep,descrip,racion,id_prod,id_client})
        .then(res => {
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
                <Form className='w-100' onSubmit= {handleSubmit}>
                    <Form.Group>
                        <Form.Label className=' fs-5'>Nombre</Form.Label>
                        <Form.Control className='rounded-0 border' type='text' name='nombre' onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Tipo</Form.Label>
                            <Form.Select className='mt-2' type='text' name='tipo' defaultValue= 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                <option>Plato Salado</option>
                                <option>Postre</option>
                                <option>Bebida</option>
                            </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className=' fs-5'>Descripcion</Form.Label>
                            <Form.Group className=' w-100' as='textarea' rows={3} name='descrip' onChange={handleChange}>
                            </Form.Group>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className=' fs-5'>Tiempo de preparacion (en minutos)</Form.Label>
                            <Form.Control className='rounded-0 border' type='number' name='tiempo_prep' onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className=' fs-5'>Racion (Para personas)</Form.Label>
                            <Form.Control className='rounded-0 border' type='number' name='racion' onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Receta de empresa productora</Form.Label>
                        <Form.Check checked={veriempresa} type='radio' defaultValue={''} name='id_produ' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Receta de cliente</Form.Label>
                        <Form.Check checked={vericlient} type='radio' defaultValue={''} name='id_cliente' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Select className='mt-2' type='text' name='escritor' defaultValue= 'Selecciona una opcion' onChange={handleChange}>
                                <option hidden>Selecciona una opcion</option>
                                {escritores.map( (escritor) => {
                                    return(
                                        <option 
                                            key={escritor.id} 
                                            value={escritor.id}>
                                                {escritor.nombre}
                                        </option>)
                                })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Variedades</Form.Label>
                        {variedades.map( (variedad) => {
                            return(
                                <Form.Group>
                                    <FormCheck 
                                        key={variedad.id} 
                                        name='variedad'
                                        type='checkbox'
                                        value={variedad.id} 
                                        label={variedad.nombre} 
                                        onChange={handleChange} />
                                    <Form.Control
                                        hidden
                                        placeholder='Cantidad en kg'
                                        id={variedad.id}
                                        className='rounded-0 border' 
                                        type='number' 
                                        name='cantidad' 
                                        onChange={handleChange} />
                                </Form.Group>
                            )
                        })}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ingredientes</Form.Label>
                        {ingredientes.map( (ingrediente) => {
                            return(
                                <FormGroup>
                                    <FormCheck
                                        key={ingrediente.id}
                                        name='ingrediente'
                                        type='checkbox'
                                        value={ingrediente.id}
                                        label={ingrediente.nombre}
                                        onChange={handleChange}/>
                                    <FormControl
                                        hidden
                                        id={ingrediente.id+500}
                                        placeholder='cantidad en kg'
                                        className='rounded-0 border' 
                                        type='number' 
                                        name='canti' 
                                        onChange={handleChange} />
                                </FormGroup>
                            )
                        })}
                    </Form.Group>
                    <Button className='mt-4'variant="primary" type="submit">
                            Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}