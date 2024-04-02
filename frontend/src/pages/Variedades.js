import './Variedades.css'
import fondo from './img/variedades.jpg'
import Navigation from '../browser/Navigation';
import Button from 'react-bootstrap/esm/Button';

export default function Variedades() {

    return (
        <>
            <figure className='figure w-100'>
                <Navigation/>
                <img className=' img-fluid w-100' src= {fondo} alt='variedades'/>
            </figure>
            <div>
                <h1 className='text-center'>Registros</h1>
            </div>
            <div className=' d-flex align-items-center justify-content-center gap-4'>
                <Button href='/formvariedad' className=' w-25 text-black bg-light rounded-0 border border-2 border-dark'>Variedad</Button>
                <Button href='/formprecio' className=' w-25 text-black bg-light rounded-0 border border-2 border-dark'>Precio</Button>
            </div>
        </>
    )

    /*
        
    <Button as={Link} to='/multisteps'
                        className=' w-auto text-white text-black bg-transparent rounded-0 border border-2 border-white'>
                            Registrar
                    </Button> */
}