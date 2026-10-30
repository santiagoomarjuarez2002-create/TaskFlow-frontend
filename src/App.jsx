import { BrowserRouter } from 'react-router-dom'
import Navegacion from './components/Navegacion'
import PiePagina from './components/PiePagina'
import Rutas from './components/routes/Rutas'
import useAutenticacion from './hooks/useAutenticacion'
import './App.css'

function Aplicacion() {
  const { usuario, registrar, iniciarSesion, cerrarSesion } = useAutenticacion()

  return (
    <BrowserRouter>
      <Navegacion usuario={usuario} onCerrarSesion={cerrarSesion} />

      <main>
        <Rutas
          usuario={usuario}
          registrar={registrar}
          iniciarSesion={iniciarSesion}
        />
      </main>

      <PiePagina nombreProyecto="TaskFlow" />
    </BrowserRouter>
  )
}

export default Aplicacion