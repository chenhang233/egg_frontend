import { Button, Col, Form, Input, Row } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { useState } from 'react'
import Loading from '../../../../components/Loading'
import { useAppDispatch } from '../../../../redux/hook'
import styles from './index.module.scss'
import { getRegisterUser } from '../../../../redux/slice'
import { LOginData } from '../../../../api/APItype'
import { success } from '../../../../api'

interface Prop_registerForm {
  changeIsLogin: (data?: LOginData) => void
}

const RegisterForm = (props: Prop_registerForm) => {
  const dispatch = useAppDispatch()
  const [isRegister, setIsRegister] = useState(false)
  const onFinish = async (values: LOginData) => {
    try {
      setIsRegister(true)
      await dispatch(getRegisterUser(values))
      setIsRegister(false)
      success('注册成功')
      props.changeIsLogin(values)
    } catch (error) {
      setIsRegister(false)
    }
  }

  return (
    <div className={classNames(styles.root)}>
      {!isRegister && <h3 className="wheelHueColor">注册</h3>}
      {isRegister ? (
        <Loading
          spanArr={Array.from({ length: 20 }, (_, i) => i + 1)}
          styleObj={{ position: 'absolute', top: '0px', left: '225px' }}
        ></Loading>
      ) : (
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
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
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Row gutter={24} justify={'center'}>
            <Col>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
            </Col>

            <Col>
              <Button onClick={() => props.changeIsLogin()}>去登录</Button>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  )
}

export default RegisterForm
