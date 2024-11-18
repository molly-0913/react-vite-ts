import { encryptV2, decryptV2 } from '@/utils/encryptTools'

const isJson = (data: any) => {
  try {
    const json = JSON.parse(data)
    if (json) return true
  } catch (error) {
    return false
  }
}

export function setEncryptConfig() {
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    transformRequest: [
      function (data: any) {
        return encryptV2(JSON.stringify(data))
      }
    ],
    transformResponse: [
      function (data: any) {
        if (isJson(data)) return data
        try {
          const result = JSON.parse(decryptV2(data))
          return result
        } catch (error) {
          return error
        }
      }
    ]
  }
}
