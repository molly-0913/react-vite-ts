import { useNavigate, useLocation } from 'react-router-dom'

const TabNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const tabs = [
    { name: '首页', path: '/' },
    { name: '浏览器', path: '/browser' },
    { name: '个人中心', path: '/profile' },
  ]

  const getTabClass = (path: string) => {
    return location.pathname === path ? 'select' : ''
  }

  return (
    <div className="tab-bar">
    {tabs.map(tab => (
      <button
        key={tab.path}
        className={getTabClass(tab.path)} // 动态添加 active 类
        onClick={() => navigate(tab.path)} // 路由跳转
      >
        {tab.name}
      </button>
    ))}
  </div>
  )
}
export default TabNavigation