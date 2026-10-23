import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import InicioPage from './pages/InicioPage'
import LoginPage from './pages/LoginPage'
import Navegacion from './components/Navegacion'
import PiePagina from './components/PiePagina'
import RegistroPage from './pages/RegistroPage'
import TareasPage from './pages/TareasPage'
import './App.css'

function RutaProtegida({ usuario, children }) {
  const location = useLocation()

  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

function Aplicacion() {
  const [usuarios, setUsuarios] = useState([])
  const [usuario, setUsuario] = useState(null)

  function registrar(datos) {
    const email = datos.email.trim().toLowerCase()

    if (usuarios.some((cuenta) => cuenta.email === email)) {
      return false
    }

    const nuevaCuenta = { ...datos, email }
    setUsuarios((cuentasActuales) => [...cuentasActuales, nuevaCuenta])
    setUsuario(nuevaCuenta)
    return true
  }

  function iniciarSesion(email, password) {
    const cuenta = usuarios.find(
      (item) => item.email === email.trim().toLowerCase() && item.password === password,
    )

    if (!cuenta) {
      return false
    }

    setUsuario(cuenta)
    return true
  }

  function cerrarSesion() {
    setUsuario(null)
  }

  return (
    <BrowserRouter>
      <Navegacion usuario={usuario} onCerrarSesion={cerrarSesion} />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/inicio" replace />}
          />
          <Route
            path="/inicio"
            element={<InicioPage />}
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
