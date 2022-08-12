import classNames from 'classnames'
import styles from './index.module.scss'
import ThemeButton from '../../components/ThemeButton/ThemeButton'
import { useAppSelector } from '../../redux/hook'
import { shallowEqual } from 'react-redux'
import { useState } from 'react'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

const Login = () => {
  const theme = useAppSelector((state) => state.user.theme, shallowEqual)
  const [isLogin, setIsLogin] = useState(true)
  const changeIsLogin = () => {
    setIsLogin(!isLogin)
  }
  return (
    <div className={classNames(styles.root, styles[theme])}>
      {theme}
      <div className="tip">
        <ThemeButton></ThemeButton>
      </div>
      <section>
        {isLogin ? (
          <LoginForm changeIsLogin={changeIsLogin}></LoginForm>
        ) : (
          <RegisterForm changeIsLogin={changeIsLogin}></RegisterForm>
        )}
      </section>
    </div>
  )
}

export default Login
