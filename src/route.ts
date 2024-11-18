import { lazy } from 'react'

export type RouteItem = {
  path: string,
  name: string,
  component: any //() => JSX.Element,
  auth: boolean
}

const Home = lazy(() => import(/* webpackChunkName: "Home"*/ "@/pages/Home/index"))
const Browser = lazy(() => import(/* webpackChunkName: "Browser"*/ "@/pages/Browser/index"))

// const Home = lazy(() => import(/* webpackChunkName: "Home"*/ './pages/Home/index'));
// const Browser = lazy(() => import(/* webpackChunkName: "Home"*/ './pages/Browser/index'));




const routes: RouteItem[] = [
    { path: '/', name: 'home', component: Home, auth: false },
    { path: '/browser', name: 'Browser', component: Browser, auth: false },
]
export default routes