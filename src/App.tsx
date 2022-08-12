import React, { Suspense } from 'react'
import classNames from 'classnames'
import styles from './App.module.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'

const Login = React.lazy(() => import('./pages/Login'))
const Index = React.lazy(() => import('./pages/Index/Index'))

function App() {
  return (
    <div className={classNames(styles.root)}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to={'/login'} />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/index" element={<Index />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
