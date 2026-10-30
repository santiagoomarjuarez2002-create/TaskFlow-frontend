import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

function Inicio({ titulo, descripcion, usuario }) {
  return (
    <section id="inicio" className="presentacion text-center">
      <Container>
        <h1 className="display-4 fw-bold">{titulo}</h1>

        <p className="lead mb-4">{descripcion}</p>

        {!usuario && (
          <div className="acciones-inicio">
            <Button as={Link} to="/login" variant="primary" size="lg">
              Iniciar sesión
            </Button>
            <Button as={Link} to="/registro" variant="outline-light" size="lg">
              Crear cuenta
            </Button>
          </div>
        )}
      </Container>
    </section>
  )
}

export default Inicio
