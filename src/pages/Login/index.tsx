import classNames from 'classnames'
import styles from './index.module.scss'
import ThemeButton from '../../components/ThemeButton/ThemeButton'
import { useAppSelector } from '../../redux/hook'
import { shallowEqual } from 'react-redux'
import { useState } from 'react'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import { LOginData } from '../../api/APItype'

const Login = () => {
  const theme = useAppSelector((state) => state.user.theme, shallowEqual)
  const [isLogin, setIsLogin] = useState(true)
  const [initialValues, setInitialValues] = useState<LOginData | undefined>(
    undefined
  )
  const changeIsLogin = (data?: LOginData) => {
    data && setInitialValues(data)
    setIsLogin(!isLogin)
  }
  return (
    <div className={classNames(styles.root, styles[theme])}>
      {theme}
      <div className="tip">
        <ThemeButton></ThemeButton>
      </div>
      <section className="section">
        {isLogin ? (
          <LoginForm
            changeIsLogin={changeIsLogin}
            initialValues={initialValues}
          ></LoginForm>
        ) : (
          <RegisterForm changeIsLogin={changeIsLogin}></RegisterForm>
        )}
      </section>
    </div>
  )
}

export default Login
