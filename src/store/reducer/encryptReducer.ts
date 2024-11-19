import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { JSEncrypt } from 'encryptlong'
import { hextopem } from '@/utils/aesKeyTools'
import { getPublicKey, getPrivateKey } from '@/api/aesKey'
import { Buffer } from 'buffer'



const initialState: {aesKey: string} = {
  aesKey: '',
}

//异步方法：初始化 AES 密钥
export const initAesKey = createAsyncThunk(
  'encrypt/initAesKey', //异步action的名字 标识
  async (_, { rejectWithValue }) => { // 在这里请求数据 return出数据
    try {
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
    } catch (error) {
      console.error('Error in initAesKey:', error)
      return rejectWithValue(error)
    }
  }
)




  

const encryptSlice = createSlice({
  name: 'encrypt',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 处理 initAesKey 的异步结果
    builder.addCase(initAesKey.fulfilled, (state, action) => { // 请求结束时 赋值
      state.aesKey = action.payload
    }),
    builder.addCase(initAesKey.rejected, (state, action) => {
      console.error('Failed to initialize AES Key:', action.payload) // 请求失败时
    })

  }

})

export const {  } = encryptSlice.actions
export default encryptSlice.reducer