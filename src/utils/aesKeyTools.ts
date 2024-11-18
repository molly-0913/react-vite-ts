import { hextob64 } from 'jsrsasign'

function hextob64nl(s: string) {
  const b64 = hextob64(s)
  let b64nl = b64.replace(/(.{64})/g, '$1\r\n')
  b64nl = b64nl.replace(/\r\n$/, '')
  return b64nl
}

export function hextopem(dataHex: string, pemHeader: string) {
  const pemBody = hextob64nl(dataHex)
  return (
    '-----BEGIN ' + pemHeader + '-----\r\n' + pemBody + '\r\n-----END ' + pemHeader + '-----\r\n'
  )
}
