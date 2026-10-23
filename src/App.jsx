import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import InicioPage from './pages/InicioPage'
import LoginPage from './pages/LoginPage'
import Navegacion from './components/Navegacion'
import PiePagina from './components/PiePagina'
import RegistroPage from './pages/RegistroPage'
import TareasPage from './pages/TareasPage'
import './App.css'

const CLAVE_CUENTAS = 'taskflow-usuarios'

function cargarCuentas() {
  try {
    const guardadas = window.localStorage.getItem(CLAVE_CUENTAS)
    const cuentas = guardadas ? JSON.parse(guardadas) : []
    return Array.isArray(cuentas) ? cuentas : []
  } catch {
    return []
  }
}

function codificarBase64(bytes) {
  return window.btoa(String.fromCharCode(...bytes))
}

function decodificarBase64(valor) {
  return Uint8Array.from(window.atob(valor), (caracter) => caracter.charCodeAt(0))
}

async function crearHash(password, salGuardada) {
  const sal = salGuardada
    ? decodificarBase64(salGuardada)
    : window.crypto.getRandomValues(new Uint8Array(16))
  const material = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const resultado = await window.crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: sal, iterations: 120000, hash: 'SHA-256' },
    material,
    256,
  )

  return {
    sal: codificarBase64(sal),
    hash: codificarBase64(new Uint8Array(resultado)),
  }
}

function compararHashes(hashA, hashB) {
  const bytesA = decodificarBase64(hashA)
  const bytesB = decodificarBase64(hashB)

  if (bytesA.length !== bytesB.length) {
    return false
  }

  let diferencia = 0
  for (let indice = 0; indice < bytesA.length; indice += 1) {
    diferencia |= bytesA[indice] ^ bytesB[indice]
  }

  return diferencia === 0
}

function RutaProtegida({ usuario, children }) {
  const location = useLocation()

  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

function Aplicacion() {
  const [usuarios, setUsuarios] = useState(cargarCuentas)
  const [usuario, setUsuario] = useState(null)

  async function registrar(datos) {
    const email = datos.email.trim().toLowerCase()
    const cuentasGuardadas = cargarCuentas()

    if (cuentasGuardadas.some((cuenta) => cuenta.email?.trim().toLowerCase() === email)) {
      setUsuarios(cuentasGuardadas)
      return false
    }

    const credenciales = await crearHash(datos.password)
    const cuentasActuales = cargarCuentas()

    if (cuentasActuales.some((cuenta) => cuenta.email?.trim().toLowerCase() === email)) {
      setUsuarios(cuentasActuales)
      return false
    }

    const nuevaCuenta = {
      nombre: datos.nombre.trim(),
      email,
      sal: credenciales.sal,
      hash: credenciales.hash,
    }
    const cuentasActualizadas = [...cuentasActuales, nuevaCuenta]

    window.localStorage.setItem(CLAVE_CUENTAS, JSON.stringify(cuentasActualizadas))
    setUsuarios(cuentasActualizadas)
    setUsuario({ nombre: nuevaCuenta.nombre, email: nuevaCuenta.email })
    return true
  }

  async function iniciarSesion(email, password) {
    const cuenta = usuarios.find(
      (item) => item.email === email.trim().toLowerCase(),
    )

    if (!cuenta?.sal || !cuenta?.hash) {
      return false
    }

    const intento = await crearHash(password, cuenta.sal)
    if (!compararHashes(intento.hash, cuenta.hash)) {
      return false
    }

    setUsuario({ nombre: cuenta.nombre, email: cuenta.email })
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
