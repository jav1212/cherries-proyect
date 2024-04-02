import './ExportImport.css'
import fondo from './img/exportimport.jpg'
import Navigation from '../browser/Navigation';
import Button from 'react-bootstrap/esm/Button';

export default function ExportImport() {
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
                <Button href='/formempresacliente' className=' w-25 text-black bg-light rounded-0 border border-2 border-dark'>Empresa cliente</Button>
                <Button href='/formformapago' className=' w-25 text-black bg-light rounded-0 border border-2 border-dark'>Forma de Pago</Button>
                <Button href='/formpagocuota' className=' w-25 text-black bg-light rounded-0 border border-2 border-dark'>Pago de Cuotas</Button>
                <Button href='/formcontrato' className=' w-25 text-black bg-light rounded-0 border border-2 border-dark'>Contrato</Button>
                <Button href='/formrenovaciones' className=' w-25 text-black bg-light rounded-0 border border-2 border-dark'>Renovaciones</Button>
                <Button href='/formenvio' className=' w-25 text-black bg-light rounded-0 border border-2 border-dark'>Envio</Button>
            </div>
        </>
    )
}