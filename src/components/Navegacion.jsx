import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

function Navegacion({ usuario, onCerrarSesion }) {
  return (
    <header>
      <Navbar
        expand="md"
        collapseOnSelect
        className="navegacion-principal border-bottom py-3"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/inicio"
            className="fw-bold fs-3 text-primary"
          >
            TaskFlow
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="menu-principal"
            aria-label="Abrir o cerrar menú"
          />

          <Navbar.Collapse id="menu-principal">
            <Nav className="ms-auto gap-md-3">
              <Nav.Link as={Link} to="/inicio">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/tareas">Mis tareas</Nav.Link>
              {usuario ? (
                <>
                  <Navbar.Text className="me-md-2">
                    Hola, {usuario.nombre}
                  </Navbar.Text>
                  <Button variant="outline-light" size="sm" onClick={onCerrarSesion}>
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button as={Link} to="/login" variant="outline-light" size="sm">
                    Ingresar
                  </Button>
                  <Button as={Link} to="/registro" size="sm">
                    Registro
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Navegacion
