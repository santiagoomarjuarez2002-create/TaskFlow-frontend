import { useState } from 'react'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const variantesPrioridad = {
  alta: 'danger',
  media: 'warning',
  baja: 'success',
}

function Tarea({ tarea, onCambiarEstado, onEditar, onEliminar }) {
  const [editando, setEditando] = useState(false)
  const [nombre, setNombre] = useState(tarea.nombre)
  const [prioridad, setPrioridad] = useState(tarea.prioridad)
  const [fechaLimite, setFechaLimite] = useState(tarea.fechaLimite || '')

  function guardarEdicion(event) {
    event.preventDefault()
    const nombreLimpio = nombre.trim()

    if (!nombreLimpio) {
      return
    }

    onEditar(tarea.id, { nombre: nombreLimpio, prioridad, fechaLimite })
    setEditando(false)
  }

  function cancelarEdicion() {
    setNombre(tarea.nombre)
    setPrioridad(tarea.prioridad)
    setFechaLimite(tarea.fechaLimite || '')
    setEditando(false)
  }

  return (
    <li className={`tarea-item${tarea.completada ? ' tarea-completada' : ''}`}>
      {editando ? (
        <Form className="edicion-tarea" onSubmit={guardarEdicion}>
          <Form.Control
            aria-label="Nombre de la tarea"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            maxLength={120}
            required
          />
          <Form.Select
            aria-label="Prioridad"
            value={prioridad}
            onChange={(event) => setPrioridad(event.target.value)}
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </Form.Select>
          <Form.Control
            aria-label="Fecha límite"
            type="date"
            value={fechaLimite}
            onChange={(event) => setFechaLimite(event.target.value)}
          />
          <div className="acciones-tarea">
            <Button size="sm" type="submit">Guardar</Button>
            <Button size="sm" variant="outline-light" onClick={cancelarEdicion}>
              Cancelar
            </Button>
          </div>
        </Form>
      ) : (
        <>
          <Form.Check
            type="checkbox"
            id={`tarea-${tarea.id}`}
            label={tarea.nombre}
            checked={tarea.completada}
            onChange={() => onCambiarEstado(tarea.id)}
          />
          <Badge bg={variantesPrioridad[tarea.prioridad]}>
            Prioridad {tarea.prioridad}
          </Badge>
          {tarea.fechaLimite && (
            <span className="fecha-limite">
              Presentar hasta el{' '}
              {(() => {
                const [anio, mes, dia] = tarea.fechaLimite.split('-')
                return new Date(Number(anio), Number(mes) - 1, Number(dia))
                  .toLocaleDateString('es-AR')
              })()}
            </span>
          )}
          <div className="acciones-tarea">
            <Button
              size="sm"
              variant="outline-light"
              onClick={() => setEditando(true)}
            >
              Editar
            </Button>
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => onEliminar(tarea.id)}
            >
              Eliminar
            </Button>
          </div>
        </>
      )}
    </li>
  )
}

export default Tarea
