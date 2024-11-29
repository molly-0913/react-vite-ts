

import { Outlet, useLocation } from 'react-router-dom'
import TabNavigation from '@/components/TabNavigation'

const PageLayout = () => {
  const location = useLocation()
  const showTab = ['/','/browser', '/profile'].includes(location.pathname)

  return (
    <div className='h-full'>
      <div className="content">
        {/* 渲染子路由对应的内容 */}
        <Outlet />
      </div>
      
      {/* Tab组件 只有首页 浏览器 个人中心页面 展示 */}
      { showTab &&  <TabNavigation />}
      
    </div>
  )
}

export default PageLayout
