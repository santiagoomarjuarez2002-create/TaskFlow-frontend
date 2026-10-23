import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

function Login({ onIniciarSesion }) {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  function handleSubmit(event) {
    event.preventDefault()
    const datos = Object.fromEntries(new FormData(event.currentTarget))
    const iniciado = onIniciarSesion(datos.email, datos.password)

    if (!iniciado) {
      setError('El correo o la contraseña no son correctos.')
      return
    }

    navigate(location.state?.from?.pathname || '/tareas', { replace: true })
  }

  return (
    <section className="seccion-autenticacion">
      <Container>
        <Card className="tarjeta-autenticacion">
          <Card.Body>
            <h1>Ingresar</h1>
            <p>Iniciá sesión para acceder a tus tareas.</p>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="login-email">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control name="email" type="email" autoComplete="email" required />
              </Form.Group>
              <Form.Group className="mb-4" controlId="login-password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </Form.Group>
              <Button type="submit" className="w-100">Ingresar</Button>
            </Form>
            <p className="texto-alternativo">
              ¿No tenés una cuenta? <Link to="/registro">Registrate</Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </section>
  )
}

export default Login
