import React, { useEffect, useRef, useState } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  Checkbox,
  Upload,
  message,
  Tabs,
  FormInstance,
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { shallowEqual } from 'react-redux'
import {
  getUserinfo,
  setAvatar,
  setUploadAvatar,
  setUserinfo,
} from '../../../../redux/slice'
import { FormUserInfo } from '../../../../api/APItype'
import { success } from '../../../../api'
const { TextArea } = Input
const { TabPane } = Tabs

const Userinfo = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true)
  const [imageUrl, setImageUrl] = useState<string>()
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<FormInstance>(null)
  const dispatch = useAppDispatch()
  const {
    username,
    password,
    sex,
    phone,
    introduction,
    avatar,
    nickname,
    uuid,
  } = useAppSelector((state) => state.user.info.userinfo, shallowEqual)
  useEffect(() => {
    setImageUrl(avatar)
    formRef.current?.setFieldsValue({
      username: username,
      password: password,
      sex: sex,
      phone: phone,
      introduction: introduction,
      nickname: nickname,
    })
  }, [avatar, username, password, sex, phone, introduction, nickname])
  const getBase64 = (img: File, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }
  const beforeUpload = (file: File) => {
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('最大2M的上传图片')
    }
    return isLt2M
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files?.length && beforeUpload(files[0])) {
      setLoading(true)
      const formData = new FormData()
      formData.append('file', files[0])
      await dispatch(setUploadAvatar(formData))
      getBase64(files[0], (url) => {
        setImageUrl(url)
        dispatch(setAvatar(url))
      })
      setLoading(false)
    }
  }
  const onFinish = async (value: FormUserInfo) => {
    await dispatch(setUserinfo({ ...value, uuid: uuid }))
    await dispatch(getUserinfo())
    success('修改成功')
    setComponentDisabled(true)
  }
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="改信息" key="1">
          <Checkbox
            checked={!componentDisabled}
            onChange={(e) => setComponentDisabled(!e.target.checked)}
          >
            表单编辑
          </Checkbox>
          <Form
            ref={formRef}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            disabled={componentDisabled}
            autoComplete="off"
            initialValues={{
              username: username,
              password: password,
              sex: sex,
              phone: phone,
              introduction: introduction,
              nickname: nickname,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: '请输入用户名!' },
                { min: 2, max: 20, message: '输入2-20个字符' },
              ]}
            >
              <Input placeholder="Username" disabled />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                { required: true, message: '请输入密码!' },
                { min: 2, max: 20, message: '输入2-20个字符' },
              ]}
            >
              <Input type="password" placeholder="Password" disabled />
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
              <Input type="text" placeholder="phone" />
            </Form.Item>
            <Form.Item
              label="昵称"
              name="nickname"
              rules={[{ max: 10, message: '昵称最大10个字符' }]}
            >
              <Input type="text" placeholder="昵称" />
            </Form.Item>
            <Form.Item label="个人介绍" name="introduction">
              <TextArea rows={4} maxLength={300} />
            </Form.Item>
            <Form.Item label="修改">
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="换头像" key="2">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            disabled
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
          <Button
            type="primary"
            onClick={() => fileRef.current && fileRef.current.click()}
            style={{ marginTop: 16 }}
          >
            上传新头像
          </Button>
          <input
            ref={fileRef}
            type="file"
            name="avatar"
            id=""
            hidden
            onChange={(e) => handleUpload(e)}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Userinfo
