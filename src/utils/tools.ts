// 动态设置 Redux store 的方法
let store: any
export const injectStore = (_store: any) => {
  store = _store
}

// 获取store中的值
export const getStroe = () => store;



export function sleep(ms: number = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}