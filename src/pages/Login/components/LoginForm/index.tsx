import { Button, Col, Form, Input, Row } from 'antd'
import classNames from 'classnames'
import styles from './index.module.scss'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { LOginData } from '../../../../api/APItype'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { _loginUser } from '../../../../redux/slice'
import { useEffect, useState } from 'react'
import { success } from '../../../../api'
import { Location, useLocation, useNavigate } from 'react-router-dom'
import Loading from '../../../../components/Loading'
import { shallowEqual } from 'react-redux'

interface Prop_loginFomr {
  changeIsLogin: () => void
  initialValues?: LOginData
}
interface Type {
  from?: Location
}

const LoginForm = (props: Prop_loginFomr) => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.user.theme, shallowEqual)
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const onFinish = async (values: LOginData) => {
    try {
      setIsLogin(true)
      await dispatch(_loginUser(values))
      setIsLogin(false)
      success('登录成功')
      const state = location.state as Type

      state?.from ? navigate(state.from.pathname) : navigate('/')
    } catch (error) {
      setIsLogin(false)
    }
  }
  useEffect(() => {
    const nodes = document.querySelectorAll('.ant-form-item')
    nodes.forEach((node, i) => node.setAttribute('style', `--i:${i + 1}`))
  }, [])
  return (
    <div className={classNames(styles.root)}>
      {!isLogin && <h3 className="wheelHueColor">登录</h3>}
      {isLogin ? (
        <Loading
          spanArr={Array.from({ length: 20 }, (_, i) => i + 1)}
          styleObj={{ position: 'absolute', top: '0px', left: '225px' }}
        ></Loading>
      ) : (
        <Form
          className={classNames(theme)}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={
            props.initialValues || { username: 'admin', password: '12356' }
          }
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名!' },
              { min: 2, max: 20, message: '输入2-20个字符' },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码!' },
              { min: 2, max: 20, message: '输入2-20个字符' },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5 }}>
            <Row gutter={24} justify={'center'}>
              <Col>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </Col>

              <Col>
                <Button
                  onClick={() => props.changeIsLogin()}
                  className={classNames(theme)}
                >
                  去注册
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      )}
    </div>
  )
}

export default LoginForm
