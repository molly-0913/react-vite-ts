import service from '@/httpRequest'
const url = '/exchangeUser'

/**
 * 获取用户信息
 * @returns
 */
export function getUserInfo(data?: { s0?: string }) {
  return service({
    url: url + '/getUserInfo',
    method: 'post',
    data
  })
}

