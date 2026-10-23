import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

function Inicio({ titulo, descripcion }) {
  return (
    <section id="inicio" className="presentacion text-center">
      <Container>
        <h1 className="display-4 fw-bold">{titulo}</h1>

        <p className="lead mb-4">{descripcion}</p>

        <Button as={Link} to="/tareas" variant="primary" size="lg">
          Ver mis tareas
        </Button>
      </Container>
    </section>
  )
}

export default Inicio