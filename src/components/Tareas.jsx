import { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import FiltroTareas from './FiltroTareas'
import FormularioTarea from './FormularioTarea'
import Tarea from './Tarea'

function Tareas({ usuario }) {
  const claveAlmacenamiento = `taskflow-tareas-${encodeURIComponent(usuario.email)}`
  const [tareas, setTareas] = useState(() => {
    const guardadas = window.localStorage.getItem(claveAlmacenamiento)
    return guardadas ? JSON.parse(guardadas) : []
  })
  const [filtro, setFiltro] = useState('todas')
  const [filtroPrioridad, setFiltroPrioridad] = useState('todas')
  const [busqueda, setBusqueda] = useState('')
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
  const [aviso, setAviso] = useState(null)

  useEffect(() => {
    window.localStorage.setItem(claveAlmacenamiento, JSON.stringify(tareas))
  }, [claveAlmacenamiento, tareas])

  function notificar(mensaje, variante = 'success') {
    setAviso({ id: Date.now(), mensaje, variante })
  }

  function agregarTarea(nombre, prioridad, fechaLimite) {
    setTareas((actuales) => [
      ...actuales,
      {
        id: crypto.randomUUID(),
        nombre,
        prioridad,
        fechaLimite,
        completada: false,
      },
    ])
    notificar('La tarea se agregó correctamente.')
  }

  function cambiarEstado(id) {
    const tarea = tareas.find((item) => item.id === id)
    setTareas((actuales) =>
      actuales.map((item) =>
        item.id === id ? { ...item, completada: !item.completada } : item,
      ),
    )
    notificar(tarea?.completada ? 'Tarea marcada como pendiente.' : 'Tarea completada.')
  }

  function editarTarea(id, cambios) {
    setTareas((actuales) =>
      actuales.map((tarea) => (tarea.id === id ? { ...tarea, ...cambios } : tarea)),
    )
    notificar('Los cambios se guardaron.')
  }

  function eliminarTarea(id) {
    setTareas((actuales) => actuales.filter((tarea) => tarea.id !== id))
    notificar('La tarea se eliminó.', 'danger')
  }

  function eliminarCompletadas() {
    const cantidad = tareas.filter((tarea) => tarea.completada).length
    setTareas((actuales) => actuales.filter((tarea) => !tarea.completada))
    setMostrarConfirmacion(false)
    notificar(`${cantidad} ${cantidad === 1 ? 'tarea completada eliminada' : 'tareas completadas eliminadas'}.`, 'secondary')
  }

  const pendientes = tareas.filter((tarea) => !tarea.completada).length
  const completadas = tareas.length - pendientes
  const progreso = tareas.length === 0 ? 0 : Math.round((completadas / tareas.length) * 100)
  const consulta = busqueda.trim().toLocaleLowerCase('es')

  const tareasFiltradas = tareas.filter((tarea) => {
    const coincideEstado = filtro === 'todas'
      || (filtro === 'pendientes' && !tarea.completada)
      || (filtro === 'completadas' && tarea.completada)
    const coincidePrioridad = filtroPrioridad === 'todas' || tarea.prioridad === filtroPrioridad
    const coincideBusqueda = tarea.nombre.toLocaleLowerCase('es').includes(consulta)

    return coincideEstado && coincidePrioridad && coincideBusqueda
  })

  let mensajeVacio = 'Todavía no agregaste tareas.'
  if (consulta || filtroPrioridad !== 'todas') {
    mensajeVacio = 'No hay tareas que coincidan con esos filtros.'
  } else if (filtro === 'completadas') {
    mensajeVacio = 'Todavía no completaste ninguna tarea.'
  } else if (filtro === 'pendientes') {
    mensajeVacio = 'No tenés tareas pendientes.'
  }

  return (
    <section className="seccion-tareas">
      <Container>
        <div className="encabezado-tareas">
          <div>
            <span className="etiqueta-seccion">TU ESPACIO DE TRABAJO</span>
            <h1>Mis tareas</h1>
            <p>Organizá tus pendientes, una tarea a la vez.</p>
          </div>
          <span className="contador-tareas">
            {pendientes} {pendientes === 1 ? 'pendiente' : 'pendientes'}
          </span>
        </div>

        <Row className="resumen-tareas g-3 mb-4">
          <Col xs={12} sm={4}>
            <Card className="tarjeta-resumen">
              <Card.Body>
                <span>Total de tareas</span>
                <strong>{tareas.length}</strong>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={4}>
            <Card className="tarjeta-resumen">
              <Card.Body>
                <span>Pendientes</span>
                <strong>{pendientes}</strong>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={4}>
            <Card className="tarjeta-resumen tarjeta-resumen-destacada">
              <Card.Body>
                <span>Completadas</span>
                <strong>{completadas}</strong>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12}>
            <Card className="tarjeta-progreso">
              <Card.Body>
                <div className="progreso-encabezado">
                  <span>Progreso general</span>
                  <strong>{progreso}%</strong>
                </div>
                <ProgressBar
                  now={progreso}
                  aria-label={`Tareas completadas: ${progreso}%`}
                  className="barra-progreso"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <FormularioTarea onAgregar={agregarTarea} />

        <div className="controles-tareas">
          <div>
            <h2>Tu lista</h2>
            <p>Buscá, filtrá y actualizá tus actividades.</p>
          </div>
          <FiltroTareas filtro={filtro} onCambiarFiltro={setFiltro} />
        </div>

        <Row className="herramientas-tareas g-3 align-items-end">
          <Col xs={12} md={6}>
            <Form.Group controlId="buscar-tarea">
              <Form.Label>Buscar por nombre</Form.Label>
              <InputGroup>
                <InputGroup.Text aria-hidden="true" className="icono-busqueda">
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
                    <circle cx="6.75" cy="6.75" r="4.75" stroke="currentColor" strokeWidth="1.5" />
                    <path d="m10.25 10.25 3.5 3.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
                  </svg>
                </InputGroup.Text>
                <Form.Control
                  type="search"
                  value={busqueda}
                  onChange={(event) => setBusqueda(event.target.value)}
                  placeholder="Ej.: preparar presentación"
                  aria-label="Buscar tareas por nombre"
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Form.Group controlId="filtro-prioridad">
              <Form.Label>Prioridad</Form.Label>
              <Form.Select
                value={filtroPrioridad}
                onChange={(event) => setFiltroPrioridad(event.target.value)}
              >
                <option value="todas">Todas</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Button
              variant="outline-danger"
              className="w-100 boton-limpiar"
              disabled={completadas === 0}
              onClick={() => setMostrarConfirmacion(true)}
            >
              Eliminar completadas
            </Button>
          </Col>
        </Row>

        {tareasFiltradas.length > 0 ? (
          <ul className="lista-tareas">
            {tareasFiltradas.map((tarea) => (
              <Tarea
                key={tarea.id}
                tarea={tarea}
                onCambiarEstado={cambiarEstado}
                onEditar={editarTarea}
                onEliminar={eliminarTarea}
              />
            ))}
          </ul>
        ) : (
          <Alert variant="dark" className="estado-vacio">
            {mensajeVacio}
          </Alert>
        )}
      </Container>

      <Modal
        show={mostrarConfirmacion}
        onHide={() => setMostrarConfirmacion(false)}
        centered
        contentClassName="modal-taskflow"
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar tareas completadas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Se eliminarán {completadas} {completadas === 1 ? 'tarea completada' : 'tareas completadas'} de forma permanente.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-light" onClick={() => setMostrarConfirmacion(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={eliminarCompletadas}>
            Eliminar tareas
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-end" className="toast-taskflow p-3">
        <Toast
          key={aviso?.id}
          show={Boolean(aviso)}
          onClose={() => setAviso(null)}
          delay={3200}
          autohide
          bg={aviso?.variante}
          role="status"
        >
          <Toast.Header>
            <strong className="me-auto">TaskFlow</strong>
            <small>ahora</small>
          </Toast.Header>
          <Toast.Body>{aviso?.mensaje}</Toast.Body>
        </Toast>
      </ToastContainer>
    </section>
  )
}

export default Tareas
