export const CLAVE_CUENTAS = 'taskflow-usuarios'

export function cargarCuentas() {
  try {
    const guardadas = window.localStorage.getItem(CLAVE_CUENTAS)
    const cuentas = guardadas ? JSON.parse(guardadas) : []
    return Array.isArray(cuentas) ? cuentas : []
  } catch {
    return []
  }
}