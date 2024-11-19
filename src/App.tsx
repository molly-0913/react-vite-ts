import './App.css'
import { Routes, Route } from 'react-router-dom';
import routes from './route'
import { Suspense, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { initDeviceInfo } from "@/store/reducer/deviceReducer"
import { initAesKey } from "@/store/reducer/encryptReducer"


function App() {
  const dispatch = useAppDispatch()
  const fingerprint = useAppSelector((state) => state.device.fingerprint)
  const aesKey = useAppSelector((state) => state.encrypt.aesKey)
  useEffect(() => {
    dispatch(initDeviceInfo())
  }, [])

  useEffect(() => {
    console.log(fingerprint,'fingerprint----',aesKey);
        
    if (fingerprint && !aesKey) {
      dispatch(initAesKey())
    }
  }, [fingerprint,aesKey])

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
