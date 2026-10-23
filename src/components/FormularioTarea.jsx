import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function FormularioTarea({ onAgregar }) {
  const [nombre, setNombre] = useState('')
  const [prioridad, setPrioridad] = useState('media')
  const [fechaLimite, setFechaLimite] = useState('')
  const hoy = new Date()
  const fechaMinima = [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, '0'),
    String(hoy.getDate()).padStart(2, '0'),
  ].join('-')

  function handleSubmit(event) {
    event.preventDefault()
    const nombreLimpio = nombre.trim()

    if (!nombreLimpio) {
      return
    }

    onAgregar(nombreLimpio, prioridad, fechaLimite)
    setNombre('')
    setPrioridad('media')
    setFechaLimite('')
  }

  return (
    <Form className="formulario-tarea" onSubmit={handleSubmit}>
      <Form.Group className="flex-grow-1" controlId="nombre-tarea">
        <Form.Label>Nombre de la tarea</Form.Label>
        <Form.Control
          type="text"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          placeholder="¿Qué necesitás hacer?"
          maxLength={120}
          required
        />
      </Form.Group>
      <Form.Group controlId="fecha-limite-tarea">
        <Form.Label>Fecha límite</Form.Label>
        <Form.Control
          type="date"
          value={fechaLimite}
          min={fechaMinima}
          onChange={(event) => setFechaLimite(event.target.value)}
          aria-label="Fecha límite para presentar la tarea"
        />
      </Form.Group>
      <Form.Group controlId="prioridad-tarea">
        <Form.Label>Prioridad</Form.Label>
        <Form.Select
          value={prioridad}
          onChange={(event) => setPrioridad(event.target.value)}
        >
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </Form.Select>
      </Form.Group>
      <Button type="submit" className="align-self-end">
        Agregar
      </Button>
    </Form>
  )
}

export default FormularioTarea
