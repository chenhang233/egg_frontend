import React, { useState } from 'react'
import { Form, Input, Button, Radio, Checkbox } from 'antd'
import Upload from '../../../../components/Upload'
import { useAppSelector } from '../../../../redux/hook'
import { shallowEqual } from 'react-redux'
const { TextArea } = Input

const Userinfo = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true)
  const { username, password, sex, phone, introduction } = useAppSelector(
    (state) => state.user.info.userinfo,
    shallowEqual
  )

  return (
    <div>
      <Checkbox
        checked={!componentDisabled}
        onChange={(e) => setComponentDisabled(!e.target.checked)}
      >
        表单编辑
      </Checkbox>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={componentDisabled}
        initialValues={{
          username: username,
          password: password,
          sex: sex,
          phone: phone,
          introduction: introduction,
        }}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: '请输入用户名!' },
            { min: 2, max: 20, message: '输入2-20个字符' },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            { required: true, message: '请输入密码!' },
            { min: 2, max: 20, message: '输入2-20个字符' },
          ]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item label="性别" name="sex">
          <Radio.Group>
            <Radio value="男">男</Radio>
            <Radio value="女">女</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="手机号"
          name="phone"
          rules={[{ max: 11, min: 9, message: '手机号错误' }]}
        >
          <Input type="number" placeholder="phone" />
        </Form.Item>
        <Form.Item label="个人介绍" name="introduction">
          <TextArea rows={4} maxLength={300} />
        </Form.Item>
        <Form.Item label="上传">
          <Upload></Upload>
        </Form.Item>
        <Form.Item label="修改">
          <Button type="primary">提交</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Userinfo
