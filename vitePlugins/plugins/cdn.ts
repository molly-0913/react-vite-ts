
import cdn from 'vite-plugin-cdn-import'

export default function cdnImport() {
  return cdn({
    modules: [ //使用预设包
      'react',
      'react-dom', 
      // 'react-router-dom', 
      'axios',
      'dayjs'
    ]
   
  })
}

