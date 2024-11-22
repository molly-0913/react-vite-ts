import './App.css'
import { Routes, Route } from 'react-router-dom'
import routes from './route'
import { Suspense } from 'react'
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { initDeviceInfo } from "@/store/reducer/deviceReducer"
import { initAesKey } from "@/store/reducer/encryptReducer"
import { initUserInfo } from "@/store/reducer/userReducer"


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
    <>
      <div>
        <Suspense fallback={<div>Loading...</div>}> 
          <Routes>
            {routes.map(route => (
              <Route
                key={route.name}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Suspense>
      </div>
    </>
  )
}

export default App
