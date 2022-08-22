import { Button, Form, FormInstance, Input, Row, Space, Table } from 'antd'
import { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { AddRole, Roles } from '../../../../api/APItype'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { getRolesRead } from '../../../../redux/slice'
import Model from '../../../../components/Modal'
import classNames from 'classnames'
import styles from './index.module.scss'
import React from 'react'
import { deleteRole, setAddrole } from '../../../../api/user'
import { error, success } from '../../../../api'

const { Column } = Table
const columnArr = [
  { title: '角色id', dataIndex: 'uuid' },
  { title: '角色名称', dataIndex: 'roleName' },
  { title: '角色描述', dataIndex: 'roleMark' },
]
const RoleManage = () => {
  const [type, setType] = useState<'add' | 'delete'>('add')
  const [visible, setVisible] = useState(false)
  const [UUID, setUUID] = useState<number>()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const formRef = React.createRef<FormInstance<AddRole>>()
  const dispatch = useAppDispatch()
  const Roles = useAppSelector((state) => state.user.Roles, shallowEqual)
  useEffect(() => {
    dispatch(getRolesRead())
  }, [dispatch])
  const handleCancel = () => {
    setVisible(false)
    formRef.current?.resetFields()
  }
  const handleOk = async () => {
    if (type === 'add') {
      try {
        const Ref = formRef.current as FormInstance<AddRole>
        await Ref.validateFields()
        const value = Ref.getFieldsValue()
        setConfirmLoading(true)
        const {
          data: { code, message },
        } = await setAddrole(value)
        if (code === 1) return error(message)
        if (code === 0) {
          handleOkAfter('添加成功')
          Ref.resetFields()
        }
      } catch (e) {
        setConfirmLoading(false)
      }
    }
    if (type === 'delete' && UUID) {
      try {
        setConfirmLoading(true)
        const {
          data: { code, message },
        } = await deleteRole(UUID)
        if (code === 1) return error(message)
        if (code === 0) {
          handleOkAfter('删除成功')
        }
      } catch (e) {
        setConfirmLoading(false)
        error(`ERROR ${JSON.stringify(e)}`)
      }
    }
  }
  const handleOkAfter = (msg: string) => {
    setVisible(false)
    setConfirmLoading(false)
    success(msg)
    dispatch(getRolesRead())
  }
  const deleteRow = async ({ uuid }: Roles) => {
    setType('delete')
    setVisible(true)
    setUUID(uuid)
  }
  const addRole = () => {
    setType('add')
    setVisible(true)
  }
  return (
    <main className={classNames(styles.root)}>
      <Model
        visible={visible}
        confirmLoading={confirmLoading}
        handleOk={handleOk}
        handleCancel={handleCancel}
        title={type === 'add' ? '添加角色' : '删除角色'}
      >
        {type === 'add' ? (
          <Form
            autoComplete="off"
            ref={formRef}
            labelCol={{ flex: '110px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
          >
            <Form.Item
              label="角色名称"
              name="roleName"
              rules={[{ required: true, min: 1, max: 10, message: '1-10个字' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="角色描述"
              name="roleMark"
              rules={[{ required: false, max: 50, message: '最多50个字' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        ) : (
          <p>确定删除当前角色吗</p>
        )}
      </Model>
      <Row justify="end">
        <Button
          type="primary"
          className="roleAddButton"
          onClick={() => addRole()}
        >
          添加角色
        </Button>
      </Row>
      <Table
        dataSource={Roles.map((obj) => ({ key: obj.uuid, ...obj }))}
        rowKey={(record) => record.uuid}
      >
        {columnArr.map(({ title, dataIndex }) => (
          <Column title={title} dataIndex={dataIndex} key={dataIndex}></Column>
        ))}
        <Column
          title="操作"
          key="action"
          render={(_: any, record: Roles) => (
            <Space size="middle">
              <Button type="dashed" onClick={() => deleteRow(record)}>
                删除
              </Button>
            </Space>
          )}
        />
      </Table>
    </main>
  )
}

export default RoleManage
