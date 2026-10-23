import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

function Registro({ onRegistrar }) {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const datos = Object.fromEntries(new FormData(event.currentTarget))
    const registrado = onRegistrar({
      nombre: datos.nombre.trim(),
      email: datos.email.trim(),
      password: datos.password,
    })

    if (!registrado) {
      setError('Ya existe una cuenta con ese correo electrónico.')
      return
    }

    navigate('/tareas', { replace: true })
  }

  return (
    <section className="seccion-autenticacion">
      <Container>
        <Card className="tarjeta-autenticacion">
          <Card.Body>
            <h1>Crear cuenta</h1>
            <p>Registrate para empezar a organizar tus tareas.</p>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="registro-nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="nombre" type="text" autoComplete="name" required maxLength={80} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registro-email">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control name="email" type="email" autoComplete="email" required />
              </Form.Group>
              <Form.Group className="mb-4" controlId="registro-password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
              </Form.Group>
              <Button type="submit" className="w-100">Registrarme</Button>
            </Form>
            <p className="texto-alternativo">
              ¿Ya tenés una cuenta? <Link to="/login">Ingresá</Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </section>
  )
}

export default Registro
