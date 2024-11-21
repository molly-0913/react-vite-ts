import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getDeviceInfo } from '@/utils/getDeviceInfo'
import { detectInfo, type Browser, type Os } from '@/utils/detectInfo'
import { nanoid } from 'nanoid'

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
      const device: DeviceState = action.payload
      Object.assign(state, device)
    })  
  }

})

export const {  } = deviceSlice.actions
export default deviceSlice.reducer