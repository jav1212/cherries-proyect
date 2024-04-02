import nav from './stylesNav.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//TODO: fix the underline function

export default function Navigation() {
    return(
        <Navbar collapseOnSelect expand="lg" className=' bg-dark'>
            <Container className='container w-auto'>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='nav'>
                        <Nav.Link className='link' href="/home">Home</Nav.Link>
                        <Nav.Link className='link' href="/variedades">Variedades</Nav.Link>
                        <Nav.Link className='link' href="/mantenimiento">Mantenimiento</Nav.Link>
                        <Nav.Link className='link' href="/exportimport">Exportacion/Importacion</Nav.Link>
                        <Nav.Link className='link' href="/evaluaciones">Evaluaciones</Nav.Link>
                        <Nav.Link className='link' href="/recetas">Recetas</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        /*
    <div classNameName='position-absolute nav d-flex align-items-center'>
        <Nav classNameName="justify-content-center mt-3">
            <Nav.Item >
                <Nav.Link classNameName='link' href='/home'>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link classNameName='link' href='/variedades'>Variedades</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link classNameName='link' href='/mantenimiento'>Mantenimiento</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link classNameName='link' href='/exportimport'>Exportacion/Importacion</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link classNameName='link' href='/evaluaciones'>Evaluaciones</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link classNameName='link' href='/recetas'>Recetas</Nav.Link>
            </Nav.Item>
        </Nav>
    </div>*/

    )

    /*<nav classNameName='nav'>
        <ul>
            <Links to={'/home'}>Home</Links>
            <Links to={'/variedades'}>Variedades</Links>
            <Links to={'/mantenimiento'}>Mantenimiento</Links>
            <Links to={'/exportimport'}>Exportacion/Importacion</Links>
            <Links to={'/evaluaciones'}>Evaluaciones</Links>
            <Links to={'/recetas'}>Recetas</Links>
        </ul>
    </nav>

    <Link to={to} {...props}>
                {children}
            </Link>

            function Links({to,children, ...props}) {
    return(
        <Nav.Item>
            <Nav.Link href={to} {...props}>{children}</Nav.Link>
        </Nav.Item>
    )
}
    */
}

