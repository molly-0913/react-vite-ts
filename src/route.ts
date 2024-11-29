import { lazy } from 'react'



export type RouteItem = {
  path: string,
  name: string,
  component: any //() => JSX.Element,
  auth: boolean
}

const Home = lazy(() => import(/* webpackChunkName: "Home"*/ "@/pages/Home/index"))
const Browser = lazy(() => import(/* webpackChunkName: "Browser"*/ "@/pages/Browser/index"))
const Profile = lazy(() => import(/* webpackChunkName: "Profile"*/ "@/pages/Profile/index"))
const Order = lazy(() => import(/* webpackChunkName: "Profile"*/ "@/pages/Order/index"))




const routes: RouteItem[] = [
  { path: '/', name: 'home', component: Home, auth: false },
  { path: '/browser', name: 'Browser', component: Browser, auth: false },
  { path: '/profile', name: 'Profile', component: Profile, auth: false },
  { path: '/order', name: 'Order', component: Order, auth: false },
]
export default routes





