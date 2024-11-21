interface Balance  {
  balance: number
  currencyBalance: number // 等同balance
  currency: string
  currencyCode: string // 等同currency
  exchangeBalance: number
  exchangeCurrency: string
  exchangeRate: number
  freezeBalance?: number
}
interface TotalBalance  {
  balanceByCNY: number,
  balanceByUSDT: number,
  availableAmount?: number
}

interface Address {
  address: string,
  crcCode: string,
  currencyCode: string,
  protocol: string,
  tranAmount: string
}

interface RedDots  {
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

interface KycInfo  {
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

interface userState {
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

interface DeviceState {
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