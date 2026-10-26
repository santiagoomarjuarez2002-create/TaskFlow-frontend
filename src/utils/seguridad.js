export function codificarBase64(bytes) {
  return window.btoa(String.fromCharCode(...bytes))
}

export function decodificarBase64(valor) {
  return Uint8Array.from(window.atob(valor), (caracter) => caracter.charCodeAt(0))
}

export async function crearHash(password, salGuardada) {
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

export function compararHashes(hashA, hashB) {
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
