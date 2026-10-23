import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
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

  useEffect(() => {
    window.localStorage.setItem(claveAlmacenamiento, JSON.stringify(tareas))
  }, [claveAlmacenamiento, tareas])

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
  }

  function cambiarEstado(id) {
    setTareas((actuales) =>
      actuales.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea,
      ),
    )
  }

  function editarTarea(id, cambios) {
    setTareas((actuales) =>
      actuales.map((tarea) => (tarea.id === id ? { ...tarea, ...cambios } : tarea)),
    )
  }

  function eliminarTarea(id) {
    setTareas((actuales) => actuales.filter((tarea) => tarea.id !== id))
  }

  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === 'pendientes') {
      return !tarea.completada
    }

    if (filtro === 'completadas') {
      return tarea.completada
    }

    return true
  })

  return (
    <section className="seccion-tareas">
      <Container>
        <div className="encabezado-tareas">
          <div>
            <h1>Mis tareas</h1>
            <p>Organizá tus pendientes, una tarea a la vez.</p>
          </div>
          <p className="contador-tareas">
            {tareas.filter((tarea) => !tarea.completada).length} pendientes
          </p>
        </div>

        <FormularioTarea onAgregar={agregarTarea} />

        <div className="controles-tareas">
          <h2>Tu lista</h2>
          <FiltroTareas filtro={filtro} onCambiarFiltro={setFiltro} />
        </div>

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
          <p className="estado-vacio">
            {filtro === 'completadas'
              ? 'Todavía no completaste ninguna tarea.'
              : filtro === 'pendientes'
                ? 'No tenés tareas pendientes.'
                : 'Todavía no agregaste tareas.'}
          </p>
        )}
      </Container>
    </section>
  )
}

export default Tareas
