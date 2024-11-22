import cdnImport from "./plugins/cdn"
import createCompression from "./plugins/compression"
// import createViteImagemin from "./plugins/imagemin"
import createPages from "./plugins/pages"
// import createVitePWA from "./plugins/pwa"
import createVisualizer from "./plugins/visualizer"
import createAutoImport from './plugins/auto-import'

import react from '@vitejs/plugin-react'
import esbuild from 'rollup-plugin-esbuild'
import type { PluginOption } from 'vite'
import createexternal from 'vite-plugin-external'


export default function createVitePlugins(
  viteEnv: Record<string, string>,
  isBuild = false,
  command: any,
) {
  console.log(command,'command--', viteEnv.VITE_NODE_ENV);
  
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    react(),
    !isBuild &&
      esbuild({
        include: /\.[jt]sx?$/, // default
        exclude: /node_modules/, // default
        minify: false,
        define: { __VERSION__: '"xyz"' }
      }),
      isBuild && createexternal({ //仅在打包的时候使用cdn
        interop: 'auto',
        externals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      })

  ]
  
  // 打包输出压缩文件
  isBuild && vitePlugins.push(createCompression(viteEnv))
  // 自动压缩图片
  // vitePlugins.push(createViteImagemin())
  // 可视化插件 (仅开发 测试环境使用打包报告)
  viteEnv.VITE_NODE_ENV === 'fat' && vitePlugins.push(createVisualizer())
  // 自动配置路由
  vitePlugins.push(createPages())
  // 自动导入
  vitePlugins.push(createAutoImport())
  // cdn引入
  isBuild && vitePlugins.push(cdnImport())
  // PWA 插件(可以开启桌面应用)
  // vitePlugins.push(createVitePWA())

  return vitePlugins
}