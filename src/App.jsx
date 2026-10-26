import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import InicioPage from './pages/InicioPage'
import LoginPage from './pages/LoginPage'
import RegistroPage from './pages/RegistroPage'
import TareasPage from './pages/TareasPage'
import Navegacion from './components/Navegacion'
import PiePagina from './components/PiePagina'
import RutaProtegida from './components/RutaProtegida'
import useAutenticacion from './hooks/useAutenticacion'
import './App.css'

function Aplicacion() {
  const { usuario, registrar, iniciarSesion, cerrarSesion } = useAutenticacion()

  return (
    <BrowserRouter>
      <Navegacion usuario={usuario} onCerrarSesion={cerrarSesion} />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={usuario ? '/tareas' : '/login'} replace />}
          />

          <Route
            path="/inicio"
            element={<InicioPage usuario={usuario} />}
          />

          <Route
            path="/registro"
            element={
              usuario
                ? <Navigate to="/tareas" replace />
                : <RegistroPage onRegistrar={registrar} />
            }
          />

          <Route
            path="/login"
            element={
              usuario
                ? <Navigate to="/tareas" replace />
                : <LoginPage onIniciarSesion={iniciarSesion} />
            }
          />

          <Route
            path="/tareas"
            element={
              <RutaProtegida usuario={usuario}>
                <TareasPage usuario={usuario} />
              </RutaProtegida>
            }
          />

          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Routes>
      </main>

      <PiePagina nombreProyecto="TaskFlow" />
    </BrowserRouter>
  )
}

export default Aplicacion