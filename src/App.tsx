import React, { Suspense, useLayoutEffect } from 'react'
import classNames from 'classnames'
import styles from './App.module.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'
import { useAppDispatch, useAppSelector } from './redux/hook'
import { shallowEqual } from 'react-redux'
import { getUserMenus } from './redux/slice'
import Workbench from './pages/Index/pages/Workbench'
import PrivateRoute from './components/private'
import { useAuth } from './hooks'
import Index from './pages/Index/Index'

const Login = React.lazy(() => import('./pages/Login'))
const RoleManage = React.lazy(() => import('./pages/Index/pages/RoleManage'))
const PermissionManage = React.lazy(
  () => import('./pages/Index/pages/permissionManage')
)

function App() {
  const dispatch = useAppDispatch()
  const auth = useAuth()
  useLayoutEffect(() => {
    if (auth) {
      dispatch(getUserMenus())
    }
  }, [dispatch, auth])
  const routers = useAppSelector(
    (state) => state.user.info.menu.router,
    shallowEqual
  )
  const getRouteTransform = (src: string) => {
    switch (src) {
      case 'Auth/roleManage':
        return <RoleManage></RoleManage>

      case 'Auth/permissionManage':
        return <PermissionManage></PermissionManage>
      case 'dashboard/workbench':
        return <Workbench></Workbench>

      default:
        return <NotFound />
    }
  }
  return (
    <div className={classNames(styles.root)}>
      <Suspense fallback={<div>...</div>}>
        {routers && (
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </Suspense>
    </div>
  )
}

export default App
