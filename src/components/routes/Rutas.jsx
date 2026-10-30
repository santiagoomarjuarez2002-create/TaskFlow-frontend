import { Navigate, Route, Routes } from 'react-router-dom'
import InicioPage from '../../pages/InicioPage'
import LoginPage from '../../pages/LoginPage'
import RegistroPage from '../../pages/RegistroPage'
import TareasPage from '../../pages/TareasPage'
import RutaProtegida from '../RutaProtegida'

function Rutas({ usuario, registrar, iniciarSesion }) {
  return (
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
  )
}

export default Rutas
