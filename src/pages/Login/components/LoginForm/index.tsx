import { Button, Col, Form, Input, Row, Spin } from 'antd'
import classNames from 'classnames'
import styles from './index.module.scss'
import { LockOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons'
import { LOginData } from '../../../../api/APItype'
import { useAppDispatch } from '../../../../redux/hook'
import { getUserInfo } from '../../../../redux/slice'
import { useState } from 'react'
import { success } from '../../../../api'
import { useNavigate } from 'react-router-dom'

interface Prop_loginFomr {
  changeIsLogin: () => void
}

const LoginForm = (props: Prop_loginFomr) => {
  const dispatch = useAppDispatch()
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()
  const onFinish = async (values: LOginData) => {
    setIsLogin(true)
    await dispatch(getUserInfo(values))
    setIsLogin(false)
    success('登录成功')
    navigate('/index')
  }
  const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />
  return (
    <div className={classNames(styles.root)}>
      <h3>登录</h3>
      {isLogin ? (
        <Spin indicator={antIcon} className="Spin" />
      ) : (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            initialValue={'admin'}
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
            initialValue={'12356'}
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

          <Row gutter={24} justify={'center'}>
            <Col>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Col>

            <Col>
              <Button onClick={() => props.changeIsLogin()}>去注册</Button>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  )
}

export default LoginForm
