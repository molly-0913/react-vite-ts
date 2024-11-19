import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getDeviceInfo } from '@/utils/getDeviceInfo'
import { detectInfo, type Browser, type Os } from '@/utils/detectInfo'
import { nanoid } from 'nanoid'


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

const initialState: DeviceState = {
  OS: "",
  OSVersion: "",
  UUID: "",
  date: "",
  deviceType: "",
  browserInfo: "",
  domain: "",
  fingerprint: "",
  language: "",
  netWork: "",
  screenHeight: 0,
  screenWidth: 0,
  userAgent: "",
  is_update_device: false,
  os: undefined,
  browser: undefined,
  deviceName: ''
}


// 异步方法：初始化设备信息
export const initDeviceInfo = createAsyncThunk(
  'device/initDeviceInfo',
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


const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 处理 initDeviceInfo 的异步结果
    builder.addCase(initDeviceInfo.fulfilled, (state, action) => {
      state.OS = action.payload.OS
      state.OSVersion = action.payload.OSVersion
      state.UUID = action.payload.UUID
      state.date = action.payload.date
      state.deviceType = action.payload.deviceType
      state.browserInfo = action.payload.browserInfo
      state.domain = action.payload.domain
      state.fingerprint = action.payload.fingerprint
      state.language = action.payload.language
      state.netWork = action.payload.netWork
      state.screenHeight = action.payload.screenHeight
      state.screenWidth = action.payload.screenWidth
      state.userAgent = action.payload.userAgent
      state.is_update_device = action.payload.is_update_device
      state.os = action.payload.os
      state.browser = action.payload.browser
      state.deviceName = action.payload.deviceName
    })

            
  }

})

export const {  } = deviceSlice.actions
export default deviceSlice.reducer