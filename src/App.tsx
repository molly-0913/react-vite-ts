import './App.css'
import { Routes, Route } from 'react-router-dom'
import routes from './route'
import { Suspense } from 'react'
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { initDeviceInfo } from "@/store/reducer/deviceReducer"
import { initAesKey } from "@/store/reducer/encryptReducer"
import { initUserInfo } from "@/store/reducer/userReducer"
import PageLayout from './pages/PageLayout'


function App() {
  const dispatch = useAppDispatch()
  const fingerprint = useAppSelector((state) => state.device.fingerprint)
  const aesKey = useAppSelector((state) => state.encrypt.aesKey)
  useEffect(() => {
    dispatch(initDeviceInfo())
  }, [])

  useEffect(() => {
    if (fingerprint && !aesKey) {
      dispatch(initAesKey())
    }
    
  }, [fingerprint,aesKey])

  useEffect(() => {
    if (fingerprint && aesKey) {
      dispatch(initUserInfo())
    }
  }, [fingerprint, aesKey])
  

  return (
    // <>
    //   <div>
    //     <Suspense fallback={<div>Loading...</div>}> 
    //       <Routes>
    //         {routes.map(route => (
    //           <Route
    //             key={route.name}
    //             path={route.path}
    //             element={<route.component />}
    //           />
    //         ))}
    //       </Routes>
    //     </Suspense>
    //   </div>
    // </>

    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* 嵌套路由，PageLayout 作为公共布局 */}
          <Route path="/" element={<PageLayout />}>
            {routes.map(route => (
              <Route
                key={route.name}
                path={route.path}
                element={<route.component />} // 渲染对应的页面组件
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
