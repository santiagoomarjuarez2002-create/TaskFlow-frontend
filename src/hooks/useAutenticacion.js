import { useState } from 'react'
import { cargarCuentas, CLAVE_CUENTAS } from '../utils/cuentas'
import { crearHash, compararHashes } from '../utils/seguridad'

export default function useAutenticacion() {
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

  return { usuario, registrar, iniciarSesion, cerrarSesion }
}