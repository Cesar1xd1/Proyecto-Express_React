import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

const LandingPage = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="#">Tutorias TEC</Navbar.Brand>
          <Nav className="ms-auto">
            <a href="/login" class="btn btn-primary me-2">Iniciar Sesion</a>
            <a href="/registro" class="btn btn-primary me-2">Registrarse</a>

          </Nav>
        </Container>
      </Navbar>
      <div className="text-center py-5 ">
        <Container>
          <h1 className="display-4 fw-bold">Bienvenido a la página de tutorias</h1>
          <p className="lead text-muted mb-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti explicabo molestiae tempore rerum reiciendis eaque officiis dignissimos fugiat quas labore recusandae quam facilis eligendi ipsum magnam quae temporibus, sapiente animi.
          </p>
          <Button variant="primary" size="lg">
            Conoce más
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default LandingPage;
