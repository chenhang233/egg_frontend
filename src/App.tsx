import React, { Suspense, useEffect } from 'react'
import classNames from 'classnames'
import styles from './App.module.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'
import { useAppDispatch, useAppSelector } from './redux/hook'
import { shallowEqual } from 'react-redux'
import { getUserMenus } from './redux/slice'
import Workbench from './pages/Index/pages/Workbench'
import PrivateRoute from './components/private'
import Index from './pages/Index/Index'
import { useAuth, useIsLogin } from './hooks'
import Fallback from './pages/Fallback'

const Login = React.lazy(() => import('./pages/Login'))
const RoleManage = React.lazy(() => import('./pages/Index/pages/RoleManage'))
const OutletNotFound = React.lazy(
  () => import('./pages/Index/pages/OutletNotFound')
)
const PermissionManage = React.lazy(
  () => import('./pages/Index/pages/permissionManage')
)
const Test = React.lazy(() => import('./pages/Test'))
const Calendar = React.lazy(() => import('./pages/Index/pages/Calendar'))
const Analyse = React.lazy(() => import('./pages/Index/pages/Analyse'))
const Forum = React.lazy(() => import('./pages/Index/pages/Forum'))
const Userinfo = React.lazy(() => import('./pages/Index/pages/Userinfo'))

function App() {
  const dispatch = useAppDispatch()
  const auth = useAuth()
  const isLogin = useIsLogin()
  const routers = useAppSelector(
    (state) => state.user.info.menu.router,
    shallowEqual
  )
  // const navigate = useNavigate()
  useEffect(() => {
    if (auth && isLogin) {
      dispatch(getUserMenus())
    }
  }, [dispatch, auth, isLogin])

  // console.log(routers, auth, isLogin, 'isLogin')

  const getRouteTransform = (src: string) => {
    switch (src) {
      case 'Auth/roleManage':
        return <RoleManage></RoleManage>
      case 'Auth/permissionManage':
        return <PermissionManage></PermissionManage>
      case 'dashboard/workbench':
        return <Workbench></Workbench>
      case 'dashboard/calendar':
        return <Calendar></Calendar>
      case 'dashboard/analyse':
        return <Analyse></Analyse>
      case 'recreation/forum':
        return <Forum></Forum>
      case 'person/userinfo':
        return <Userinfo></Userinfo>

      default:
        return <OutletNotFound />
    }
  }
  const NoAuthRouter = () => {
    return (
      <Suspense fallback={<Fallback></Fallback>}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Index />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/test" element={<Test />} />
          <Route path="/*" element={<Fallback></Fallback>} />
        </Routes>
      </Suspense>
    )
  }
  return (
    <div className={classNames(styles.root)}>
      {routers ? (
        <Suspense fallback={<Fallback></Fallback>}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Index />
                </PrivateRoute>
              }
            >
              <Route
                path="/"
                element={<Navigate to={'/dashboard/workbench'} />}
              ></Route>
              {routers
                .filter((obj) => obj.auth && obj.routerSrc)
                .map((obj) => (
                  <Route
                    key={obj.uuid}
                    path={obj.routerSrc as string}
                    element={getRouteTransform(obj.routerSrc as string)}
                  ></Route>
                ))}
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      ) : (
        NoAuthRouter()
      )}
    </div>
  )
}

export default App
