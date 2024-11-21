import axios, { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios'
import { setEncryptConfig } from './handlers/encryptHandler'
import { MD5 } from 'crypto-js'
import { getStroe } from "@/utils/tools"
import { Toast } from 'antd-mobile'
import dayjs from 'dayjs'



const baseURL = window.location.origin + '/api'
console.log(typeof(JSON.parse(import.meta.env.VITE_OPEN_ENCRYPT)) ,'import.meta.env.VITE_OPEN_ENCRYPT');

// 配置新建一个 axios 实例
const service = axios.create({
  baseURL,
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 50000,
  responseType: JSON.parse(import.meta.env.VITE_OPEN_ENCRYPT)  ? 'arraybuffer' : 'json',
  ...(JSON.parse(import.meta.env.VITE_OPEN_ENCRYPT) ? setEncryptConfig() : {})
})

// 添加请求拦截器
service.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let [aesKey, lang] = ['', '']
    let device:any;
    const store = getStroe()
    if (store) {
      device = store.getState().device 
      aesKey = store.getState().encrypt.aesKey
      lang = store.getState().common.lang
    }
    
    const { token } = store.getState().user
    const data = config.data || {}
    const s0 = token
    const platformString = 'H5'
    const productId = 'P91'
    const language = lang.startsWith('en') ? 'en_US' :  'zh_CN'

    const qid = MD5(Date.now() + String(Math.random()))

    Object.assign(data, {
      s0,
      terminalType: data.terminalType || platformString,
      domainName: window.location.hostname,
      productId,
      language
    })
    config.data = data
    config.headers['s1'] = device.fingerprint
    config.headers['deviceId'] = device.fingerprint
    config.headers['qid'] = qid
    config.headers['language'] = language

    // 存在token，设置token过期日期，30分钟
    // s0 && setTokenExpiredDate()
    const currentTime = dayjs()
    const tokenExpiredDate = dayjs().add(30, 'minute')
    if (s0 && currentTime.isAfter(tokenExpiredDate)) {
      console.log('清除user信息 重新登录');
      
    }
    console.log(`${config.url} 请求参数：`, config.data)

    return config
  },
  (error: AxiosError) => {
    // 对请求错误做些什么
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse): any => {
    console.log(`${res.config.url} 结果：`, res.data)

    const { code } = res.data.head

    if (code !== '0000') {
      if (['2222'].includes(code)) {
        return Promise.reject(res)
      }
      // 如果s1为空或者AES KEY 过期，则重新生成AES_KEY
      if (['400002', '400003'].includes(code)) {
        // window.location.href = '/login'
      }
      // 如果s1为空或者AES KEY 过期，则重新生成AES_KEY
      if (['1005', '1006'].includes(code)) {
        Toast.show({
          content: res.data.head.message,
        })
        // window.location.href = '/login'
      }
      Toast.show({
        content: res.data.head.message,
      })
      return Promise.reject(res)
    }
    return res
  },
  (error: AxiosError) => {
    if (error && error.toJSON) {
      const errData = error.toJSON() as any
      const msg = errData.message
      Toast.show({
        content: msg
      })
      return Promise.reject(msg)
    }
    if (error && error.response) {
      Toast.show({
        content: error.response.status + ':' + error.response.statusText
      })
    }
    return Promise.reject(error)
  }
)

export default service