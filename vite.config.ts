import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { resolve } from 'path';

const pathResolve = (dir: string) => resolve(__dirname, dir);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    server: { //服务器配置
      open: true, // 启动时自动打开浏览器
      port: 8080,
      proxy: {
        '/api': {
          target: env.VITE_APP_SERVER_URI,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      }
    },
    build: { //打包配置
      outDir: `dist/${mode}`, //打包文件的输出目录
      sourcemap: true, // 在生产环境生成源码映射文件，用于调试
      minify: 'terser', //指定代码 打包方式 还有 esbuild 
      terserOptions: { //terser 模式下的可配置项
        compress: {
          drop_console: env.NODE_ENV ===  'prod' ? true : false, //传递true以丢弃对 console.*函数的调用
          drop_debugger: true,
          passes: 2, //多次压缩的次数，默认是1，执行次数越多，时间越长
        },
        mangle: {}
      },
      chunkSizeWarningLimit: 500, // 设置 chunk 大小警告限制，单位 KB
      rollupOptions: { // 性能优化
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) { //按文件名拆包
              return 'vendor';
            }
          }
        }
      }
    },
    plugins: [react()], //插件配置
    resolve: { // 用于简化模块导入路径设置
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    define: { //配置全局常量，通常用于环境变量，确保敏感数据在代码中不直接暴露
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    },
    css: {
      // modules: {
      //   localsConvention: 'camelCase',
      // },
      preprocessorOptions: {
        scss: {
          additionalData:   `@use "@/styles/common" as *;`, // scss 中即将废弃 import  可以使用 @use 或 @forward 
        },
      },
    },
    
    
    
  }
  
})
