import aeskeyService from '@/httpRequest/request'
console.log(aeskeyService,'aeskeyService-----')

const url = '/gw'
/**
 * 获取服务端公钥
 * @param {*} data
 * @returns
 */
export function getPublicKey() {
  return aeskeyService({
    url: url + '/p1',
    method: 'post',
    responseType: 'arraybuffer'
  })
}

/**
 * 获取服务端AES Key
 * @param {*} data
 * @returns
 */
export function getPrivateKey(data: Buffer) {
  return aeskeyService({
    url: url + '/p2',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}
