import './Recetas.css'
import fondo from './img/recetas.jpeg'
import Navigation from '../browser/Navigation';
import Button from 'react-bootstrap/esm/Button';

export default function Recetas() {
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
                <Button href='/formunidad' className=' w-25 text-black bg-light rounded-0 border border-2 border-dark'>Unidad de Medicion</Button>
                <Button href='/formingrediente' className=' w-25 text-black bg-light rounded-0 border border-2 border-dark'>Ingrediente</Button>
                <Button href='/formreceta' className=' w-25 text-black bg-light rounded-0 border border-2 border-dark'>Receta</Button>
            </div>
        </>
    )
}