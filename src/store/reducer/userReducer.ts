import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUserInfo } from "@/api/userInfo"



const initialState: userState = {
  token: "",
  id: 0,
  userId: 0,
  loginName: "",
  countryCode: "",
  phone: "",
  email: "",
  nickName: "",
  userName: "",
  headUrl: "",
  accountInvalidEnd: '',
  accountInvalidStart: '',
  buyInvalidEnd: '',
  buyInvalidStart: '',
  hasTranPass: false,
  rechargeInvalidEnd: '',
  rechargeInvalidStart: '',
  replySms: false, // 回复短信验证开关: true - 开启; false - false(默认)
  sellInvalidEnd: '',
  sellInvalidStart: '',
  successOrderNum: 0,
  totalOrderNum: 0,
  userType: 0,
  withdrawalInvalidEnd: '',
  withdrawalInvalidStart: '',
  balanceList: [],
  tototalBalance: {} as TotalBalance,
  addressList: [],
  accountLock: false,
  buyLock: false,
  sellLock: false,
  rechargeLock: false,
  withdrawlLock: false,
  offlineStore: '',
  redDots: {} as RedDots,
  // 1 - 短信, 2 - 邮箱, 3 - GA
  authMethods: [],
  // 登录密码是否过期，过期会强制修改密码
  pwdExpired: false,
  // 是否绑定OTP（比如GA）
  boundOtp: false,
  antiPhishingCode: '', // 防钓鱼码
  screenshotProtection: false, // 是否开启截屏保护
  securityLevel: 1,
  verifyEmail: false, // 安全验证是否开启邮箱验证
  verifyOtp: false, // 安全验证是否开启OTP验证
  verifyPhone: false, // 安全验证是否开启手机验证
  addressWhitelist: false, // 是否开启提币白名单
  dcboxFirstLogin: true, // 是否是EZpay迁移用户首次登录, 如果是需要用户设置登录密码与昵称
  rechargeFlag: 0, // 用户充币状态: 0 - 永久禁用; 1 - 有效; 2 - 临时禁用
  transferFlag: 0, // 用户转账状态: 0 - 永久禁用; 1 - 有效; 2 - 临时禁用
  userFlag: 0, // 用户状态: 0 - 永久禁用; 1 - 有效; 2 - 临时禁用
  withdrawFlag: 0, // 用户提币状态: 0 - 永久禁用; 1 - 有效; 2 - 临时禁用
  tokenExpiredDate: '', // 前端设置的token过期日期，每次调用接口都会刷新记录一次
  transPwdExpired: false,
  kycInfo: [],
  kycLevel: 0,
  kycApplyStatus: 0,
  kycAllLimitSwitchOn: false,
  isTranPassAudit: false, // 交易密码审核中
  tranPassFailTimes: 0, // 交易密码连续错误次数
  hasCreditCard: false, //是否有成功开过卡
  creditSwitchOn: false, // 卡片开关
  kycRealName: '',
  sellFlag: 0, // 用户卖币状态: 0 - 永久禁用; 1 - 有效; 2 - 临时禁用; 3 - 因修改密码等禁用
  invitationCode: '',
  newVoucherNum: 0,
  lastLoginDate: ''
}


//获取登录信息
export const initUserInfo = createAsyncThunk(
  'user/initUserInfo', //异步action的名字 标识
  async (_, { rejectWithValue }) => { // 在这里请求数据 return出数据
    try { 
      const res = await getUserInfo({s0: ''})
      return res?.data?.body
    } catch (error) {
      console.error('Error:', error)
      return rejectWithValue(error)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initUserInfo.fulfilled, (state, action) => { // 请求结束时 赋值
      const userInfo: userState = action.payload
      Object.assign(state, userInfo)
    }),
    builder.addCase(initUserInfo.rejected, (state, action) => {
      console.error('Failed--', action.payload) // 请求失败时
    })

  }
})

export const { } = userSlice.actions
export default userSlice.reducer