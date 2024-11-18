import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { JSEncrypt } from 'encryptlong'
import { hextopem } from '@/utils/aesKeyTools'
import { getPublicKey, getPrivateKey } from '@/api/aesKey'
import { getDeviceInfo } from '@/utils/getDeviceInfo'
import { detectInfo, type Browser, type Os } from '@/utils/detectInfo'
import { nanoid } from 'nanoid'
import { Buffer } from 'buffer'


export interface DeviceState {
    OS: string
    OSVersion: string
    UUID: string
    date: string
    deviceType: string
    browserInfo: string
    domain: string
    fingerprint: string
    language: string
    netWork: string
    screenHeight: number
    screenWidth: number
    userAgent: string
    is_update_device: boolean
    os?: Os
    browser?: Browser
    deviceName?: string
  }

const initialState: {aesKey: string; device: DeviceState } = {
    aesKey: '',
    device: {
        OS: '',
        OSVersion: '',
        UUID: '',
        date: '',
        deviceType: '',
        browserInfo: '',
        domain: '',
        fingerprint: '',
        language: '',
        netWork: '',
        screenHeight: 0,
        screenWidth: 0,
        userAgent: '',
        is_update_device: false,
        os: undefined,
        browser: undefined,
        deviceName: ''
    }
    
}

// 异步方法：初始化设备信息
export const initDeviceInfo = createAsyncThunk(
    'encrypt/initDeviceInfo',
    async () => {
      return new Promise<DeviceState>((resolve) => {
        getDeviceInfo(
          {
            info: [
              'deviceType',
              'OS',
              'OSVersion',
              'netWork',
              'language',
              'browserInfo',
              'userAgent',
              'date',
              'fingerprint',
              'UUID',
              'screenWidth',
              'screenHeight'
            ]
          },
          (deviceInfo: any) => {
            const { browser, os } = detectInfo()
            const deviceName = `${deviceInfo.OS}, ${deviceInfo.browserInfo.slice(
              0,
              deviceInfo.browserInfo.indexOf('（')
            )}, ${browser.version}`
  
            resolve({
              ...deviceInfo,
              domain: window.location.origin,
              os,
              browser,
              deviceName,
              fingerprint: nanoid()
            })
          }
        )
      })
    }
  )

// 异步方法：初始化 AES 密钥
export const initAesKey = createAsyncThunk(
    'encrypt/initAesKey',
    async (_, {  }: any) => {
      const encrypt = new JSEncrypt()
      const key = encrypt.getKey()
      const publicKey = key.getPublicKey()
  
      // 获取服务端公钥
      const res = await getPublicKey()
      const pubKeyServerHex = Buffer.from(res.data).toString('hex')
      const pubKeyServerPEM = hextopem(pubKeyServerHex, 'PUBLIC KEY')
  
      // 加密本地公钥
      const encrypt2 = new JSEncrypt()
      encrypt2.setPublicKey(pubKeyServerPEM)
      const encrypted = encrypt2.encryptLong(publicKey)
      const encryptedBuf = Buffer.from(encrypted, 'base64')
  
      // 获取服务端返回的 AES 密钥
      const res2 = await getPrivateKey(encryptedBuf)
      const aesKey = encrypt.decrypt(Buffer.from(res2.data).toString('base64')) || ''
  
      return aesKey
    }
  )
  

const encryptSlice = createSlice({
    name: 'encrypt',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // 处理 initDeviceInfo 的异步结果
        builder.addCase(initDeviceInfo.fulfilled, (state, action) => {
            state.device = action.payload
        })

        // 处理 initAesKey 的异步结果
        builder.addCase(initAesKey.fulfilled, (state, action) => {
            state.aesKey = action.payload
        })

    }

})

export const {  } = encryptSlice.actions
export default encryptSlice.reducer