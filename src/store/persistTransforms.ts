import { createTransform } from 'redux-persist';

// 仅持久化 commonReducer 中的 count
export const counterTransform = createTransform(
  // 保存时过滤，只存储 count
  (inboundState: any) => {
    return { count: inboundState.count };
  },
  // 恢复时不做任何过滤
  (outboundState: any) => outboundState,
  { whitelist: ['counter'] }
);


