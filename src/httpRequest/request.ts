import axios, { type InternalAxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios'
import { MD5 } from 'crypto-js'
// import store from '@/store'
// import { sleep } from "@/utils/tools"

// import {RootState } from "@/store"


const baseURL = window.location.origin + '/api'

// 配置新建一个 axios 实例
const service = axios.create({
  baseURL,
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 50000
})
let store: any

// 动态设置 Redux store 的方法
export const injectStore = (_store: any) => {
  store = _store;
};

  
// 添加请求拦截器
service.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {

    // let device = store.getState().device
    const qid = MD5(Date.now() + String(Math.random()))

    console.log(store,'store!!!');
        
    if (store) {
      const device = store.getState().device // 动态获取当前 Redux 状态
      Object.assign(config.headers, { 
        s1: device.fingerprint, 
        deviceId: device.UUID, 
        qid: qid 
      })
            
    }
    // while (!device.fingerprint) {
    //     await sleep(400)
    //     device = store.getState().device
    //   }
    // console.log(device,'device-----');
  
        
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

