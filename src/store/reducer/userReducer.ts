import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUserInfo } from "@/api/userInfo"

export type Balance = {
  balance: number
  currencyBalance: number // 等同balance
  currency: string
  currencyCode: string // 等同currency
  exchangeBalance: number
  exchangeCurrency: string
  exchangeRate: number
  freezeBalance?: number
}
export type TotalBalance = {
  balanceByCNY: number,
  balanceByUSDT: number,
  availableAmount?: number
}

export type Address = {
  address: string,
  crcCode: string,
  currencyCode: string,
  protocol: string,
  tranAmount: string
}

export type RedDots = {
  buyCount: number,
  count: number,
  sellCount: number,
  userBuyCount: number,
  userCount: number,
  userSellCount: number,
  // 收入
  cashIn: number
  // 支出
  cashOut: number
}

export type KycInfo = {
  kycLevel: number
  // kyc审核状态，0-未认证，1-审核中，2-已认证
  kycStatus: number
  // 每日（提币+转币）交易限额（usdt）
  // =0-不可交易；>0-可交易，有额度上限；null-可交易，无额度上限
  dailyTxAmount: number | null
  // 每日网站上分限额
  dailyPayMerchantAmount: number
  // 每日交易限额 - 值
  dailyTxMappingAmount: number
  // 每日交易限额 - 单位
  dailyTxMappingAmountUnit: number
  dailyTxBuyAmount?: number
  // aliyun人脸验证是否开启
  aliyunSwitch?: boolean
}


export interface userState {
  token: string,
  id: number,
  userId: number,
  loginName: string,
  countryCode: string,
  phone: string,
  email: string,
  nickName: string,
  userName: string,
  headUrl: string,
  accountInvalidEnd: string,
  accountInvalidStart: string,
  buyInvalidEnd: string,
  buyInvalidStart: string,
  hasTranPass: false,
  rechargeInvalidEnd: string,
  rechargeInvalidStart: string,
  replySms: boolean,
  sellInvalidEnd: string,
  sellInvalidStart: string,
  successOrderNum: number,
  totalOrderNum: number,
  userType: number, // 0 - 普通会员， 7 - 承兑商
  withdrawalInvalidEnd: string,
  withdrawalInvalidStart: string,
  balanceList: Balance[],
  tototalBalance: TotalBalance,
  addressList: Address[],
  accountLock: boolean,
  buyLock: boolean,
  sellLock: boolean,
  rechargeLock: boolean,
  withdrawlLock: boolean,
  offlineStore: string,
  redDots: RedDots,
  getOrderAllList: Order[],
  authMethods: [],
  pwdExpired: boolean,
  boundOtp: boolean,
  antiPhishingCode: string, // 防钓鱼码
  screenshotProtection: boolean, // 是否开启截屏保护
  securityLevel: number, // 安全等级
  verifyEmail: boolean, // 是否开启邮箱验证
  verifyOtp: boolean,
  verifyPhone: boolean,
  addressWhitelist: boolean,
  dcboxFirstLogin: boolean,
  rechargeFlag: 0 | 1 | 2,
  transferFlag: 0 | 1 | 2 | 3,
  userFlag: 0 | 1 | 2,
  withdrawFlag: 0 | 1 | 2 | 3,
  tokenExpiredDate: string,
  transPwdExpired: boolean,
  kycInfo: KycInfo[],
  kycLevel: number,
  kycRealName: string,
  // 无审核提案 - null；审核中的等级 - 1/2/3/4/5...
  kycApplyStatus: null | number,
  // 是否开放KYC入口
  kycAllLimitSwitchOn: boolean,
  // 交易密码是否审核中
  isTranPassAudit: boolean
  tranPassFailTimes: number,
  hasCreditCard: boolean,
  creditSwitchOn: boolean
  sellFlag?: 0 | 1 | 2 | 3
  isSpecialSupplier?: boolean
  whetherBindSuperior?: boolean
  whetherFirstLogin?: boolean
  invitationCode: string
  kycBuyStatus?: number | null
  passChangeUnlimitTime?: number | null
  frozenAmountTxt?: string
  newVoucherNum?: number
  lastLoginDate?: string
  canSplitOrder?: boolean
  canCancelOrder?: boolean
}


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
  getOrderAllList: [],
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