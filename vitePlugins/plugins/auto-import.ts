import AutoImport from "unplugin-auto-import/vite"

export default function createAutoImport () {
  return AutoImport({
    imports: ['react'], // 自动导入 React API（如 useState, useEffect 等）
    dts: 'src/types/auto-imports.d.ts', //指定自动生成的auto-imports.d.ts文件存放的位置
    include: [
      /\.tsx$/,  // 只匹配 .tsx 文件
      /src\/hooks\/.*\.ts$/,   // 只匹配hooks下的 .ts 文件
    ]
  })
}