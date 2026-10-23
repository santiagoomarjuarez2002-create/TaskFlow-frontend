
import Inicio from '../components/Inicio'

function InicioPage({ usuario }) {
  return (
    <Inicio
      titulo="Bienvenido a TaskFlow"
      descripcion="Organizá tus tareas de manera fácil y rápida."
      usuario={usuario}
    />
  )
}

export default InicioPage
