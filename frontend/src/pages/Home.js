import home from './Home.css'
import Carousel from 'react-bootstrap/Carousel';
import fondo1 from './img/fondo1.png'
import fondo2 from './img/fondo2.png'
import fondo3 from './img/fondo3.png'
import productores from './img/productores.jpg'
import expimp from './img/exportacionimportacion.jpg'
import evalua from './img/evaluacion.jpg'
import Button from 'react-bootstrap/Button';
import Navigation from '../browser/Navigation';
import Footer from '../browser/Footer'

export default function Home() {
    return (
        <>
            <Carousel fade>
                <Carousel.Item interval={2000} >
                    <Navigation/>
                    <img src={fondo1} className='img-fluid fondo-img' alt='' />
                    <Carousel.Caption >
                            <h1 className=' caroussel-text'>
                                La cereza es un fruto que puede consumirse fresco o utilizarse en la elaboración de tartas, 
                                mousses, mermeladas y compotas.
                            </h1>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <Navigation/>
                    <img src={fondo2} className='img-fluid w-100 fondo-img' alt=''/>
                    <Carousel.Caption>
                        <h1 className=' caroussel-text'>
                            El cerezo tuvo su origen probablemente en el mar Negro y en el mar Caspio,
                            difundiéndose después hacia Europa y Asia,
                            llevado por los pájaros y las migraciones humanas.
                        </h1>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <Navigation/>
                    <img src={fondo3} className='img-fluid w-100 fondo-img'  alt=''/>
                    <Carousel.Caption>
                        <h1 className=' caroussel-text'>
                            Las principales especies de cerezo cultivadas en el mundo son el cerezo dulce (Prunus avium), 
                            el guindo (P. cerasus) y el cerezo "Duke", híbrido de los anteriores.
                        </h1>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className='container d-flex align-items-center mt-5'>
                <div className='container d-grid'>
                    <h1>Productores</h1>
                        <p className=' m-lg-4 mb-4 text'> Se producen más de 2.000.000 de toneladas de cerezas al año en todo el mundo.
                            No se sabe con exactitud el lugar de procedencia de tan exquisita fruta,
                            se cree que el origen de la cereza dulce está en la región comprendida
                            entre el Mar Negro y el Mar Caspio, y el de la cereza ácida entre
                            los Alpes Suizos y el Mar Adriático....
                        </p>
                    <Button href='/mantenimiento' className=' w-25 mt-4 text-black bg-light rounded-0 border border-2 border-dark'>Ver mas</Button>
                </div>
                <img alt='' src={productores} className=' img-fluid w-50'/>
            </div>
            <div className='container d-flex align-items-center mt-5'>
                <img alt='' src={expimp} className=' img-fluid w-50'/>
                <div className='container d-grid'>
                    <h1>Exportacion e Importacion</h1>
                    <p className='m-lg-4 mb-4 text'>
                        En 2020, la Cereza fué el producto número 738to más comercializado en el mundo, 
                        siendo comercializado por un total de $3,92MM. 
                        Entre 2019 y 2020 las exportaciones de Cerezas, frescas grew en un 5,45%, desde $3,71MM a $3,92MM..
                    </p>
                    <Button href='/exportimport' className=' w-25 mt-4 text-black bg-light rounded-0 border border-2 border-dark'>Ver mas</Button>
                </div>
            </div>
            <div className='container d-flex align-items-center mt-5 mb-5'>
                <div className='container d-grid'>
                    <h1>Evaluaciones</h1>
                        <p className=' m-lg-4 mb-4 text'> 
                            Ensayos con la aplicación de distintos tratamientos y 
                            así evaluar su efecto sobre la calidad y 
                            vida postcosecha de distintas variedades de cerezas...
                        </p>
                    <Button href='/evaluaciones' className=' w-25 mt-4 text-black bg-light rounded-0 border border-2 border-dark'>Ver mas</Button>
                </div>
                <img alt='' src={evalua} className=' img-fluid w-50'/>
            </div>
        </>
    )
}