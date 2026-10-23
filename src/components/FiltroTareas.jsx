import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

const filtros = [
  { valor: 'todas', etiqueta: 'Todas' },
  { valor: 'pendientes', etiqueta: 'Pendientes' },
  { valor: 'completadas', etiqueta: 'Completadas' },
]

function FiltroTareas({ filtro, onCambiarFiltro }) {
  return (
    <ButtonGroup aria-label="Filtrar tareas" className="filtros-tareas">
      {filtros.map((opcion) => (
        <Button
          key={opcion.valor}
          variant={filtro === opcion.valor ? 'primary' : 'outline-light'}
          aria-pressed={filtro === opcion.valor}
          onClick={() => onCambiarFiltro(opcion.valor)}
        >
          {opcion.etiqueta}
        </Button>
      ))}
    </ButtonGroup>
  )
}

export default FiltroTareas
