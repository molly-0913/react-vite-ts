import { visualizer } from 'rollup-plugin-visualizer';

export default function createVisualizer () {
  return visualizer({
    open: false, // 打包完成后自动打开报告
    gzipSize: true, // 显示文件的gzip压缩后的大小
    brotliSize: true, // 显示brotli压缩后的大小
  })
}