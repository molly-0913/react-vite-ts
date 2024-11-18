import axios, { type InternalAxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios'
import { MD5 } from 'crypto-js'
import { useAppSelector } from "@/store/hooks"

const baseURL = window.location.origin + '/api'

// 配置新建一个 axios 实例
// 配置新建一个 axios 实例
const service = axios.create({
    baseURL,
    withCredentials: false, // send cookies when cross-domain requests
    timeout: 50000
})

// 添加请求拦截器
service.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
    const device = useAppSelector((state) => state.encrypt.device)
     
      const qid = MD5(Date.now() + String(Math.random()))
  
      Object.assign(config.headers, { s1: device.fingerprint, deviceId: device.UUID, qid: qid })
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )
  
  // 添加响应拦截器
  service.interceptors.response.use(
    async (res: AxiosResponse) => {
      return res
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )
  
  export default service