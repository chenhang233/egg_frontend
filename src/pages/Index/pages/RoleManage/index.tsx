import { Button, Row, Space, Table } from 'antd'
import { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { Roles } from '../../../../api/APItype'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { getRolesRead } from '../../../../redux/slice'
import Model from './components/Modal'
import classNames from 'classnames'
import styles from './index.module.scss'

const { Column } = Table
const columnArr = [
  { title: '角色id', dataIndex: 'uuid', key: 0 },
  { title: '角色名称', dataIndex: 'roleName', key: 1 },
  { title: '角色描述', dataIndex: 'roleMark', key: 2 },
]
const RoleManage = () => {
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useAppDispatch()
  const Roles = useAppSelector((state) => state.user.Roles, shallowEqual)
  useEffect(() => {
    dispatch(getRolesRead())
  }, [dispatch])

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setVisible(false)
  }
  return (
    <main className={classNames(styles.root)}>
      <Model
        visible={visible}
        confirmLoading={confirmLoading}
        handleOk={handleOk}
        handleCancel={handleCancel}
      >
        <div>111111</div>
      </Model>
      <Row justify="end">
        <Button
          type="primary"
          className="roleAddButton"
          onClick={() => setVisible(true)}
        >
          添加角色
        </Button>
      </Row>
      <Table dataSource={Roles.map((obj) => ({ key: obj.uuid, ...obj }))}>
        {columnArr.map(({ key, title, dataIndex }) => (
          <Column key={key} title={title} dataIndex={dataIndex}></Column>
        ))}
        <Column
          title="操作"
          key="action"
          render={(_: any, record: Roles) => (
            <Space size="middle">
              <a href="#123" onClick={() => console.log(record)}>
                Delete
              </a>
            </Space>
          )}
        />
      </Table>
    </main>
  )
}

export default RoleManage
