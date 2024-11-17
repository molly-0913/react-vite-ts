import './App.css'
import { Routes, Route } from 'react-router-dom';
import routes from './route'
import { Suspense } from 'react';

function App() {

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
