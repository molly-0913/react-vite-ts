// StoreContext.ts
import { createContext, useContext } from 'react';

// 创建 StoreContext，初始值可以设置为 null 或者 store 的类型
export const StoreContext = createContext<any | null>(null);

// 创建一个自定义 hook，方便在其他地方访问 store
export const useStore = () => {
  return useContext(StoreContext);
};
