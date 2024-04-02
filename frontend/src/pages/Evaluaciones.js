import './Evaluaciones.css'
import fondo from './img/evaluaciones.jpg'
import Navigation from '../browser/Navigation';
import Button from 'react-bootstrap/esm/Button';

export default function Evaluaciones() {
    return (
        <>
            <figure className='figure w-100'>
                <Navigation/>
                <img className=' img-fluid w-100' src= {fondo} alt='variedades'/>
            </figure>
            <div>
                <h1 className='text-center'>Registros</h1>
            </div>
            <div className=' d-flex flex-wrap align-content-between justify-content-center gap-4 mb-xxl-5'>
                <Button href='/formevaluacionanual' className=' w-25 text-black bg-light rounded-0 border border-2 border-dark'>Evaluacion anual</Button>
                <Button href='/formcriterio' className=' w-25 text-black bg-light rounded-0 border border-2 border-dark'>Criterio</Button>
                <Button href='/formvaloraciones' className=' w-25 text-black bg-light rounded-0 border border-2 border-dark'>Valoraciones</Button>
            </div>
        </>
    )
}