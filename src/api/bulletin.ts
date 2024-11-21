import service from '@/httpRequest'
const url = '/bulletin'

/**
 * 获取跑马灯信息
 * @returns
 */
export function getBulletins(data?: { type?: number }) {
  return service({
    url: url + '/getBulletins',
    method: 'post',
    data
  })
}
