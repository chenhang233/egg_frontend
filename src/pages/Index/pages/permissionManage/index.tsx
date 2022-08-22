import { useEffect, useState } from 'react'
import { Button, Select, Table, Tag } from 'antd'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { getRoleConditionRead } from '../../../../redux/slice'
import styles from './index.module.scss'
import classNames from 'classnames'
import { ColumnsType } from 'antd/lib/table'
import { Condition_1, Condition_2 } from '../../../../api/APItype'
import { transformIconStringToJSX } from '../../../../utils/enum'
import {
  addInterface,
  addRouter,
  removeInterFace,
  removeRouter,
} from '../../../../api/user'
import { error, success } from '../../../../api'

interface AddObj {
  type: 'add' | 'remove'
  Ptype: 'router' | 'interface'
  uuid: number
  interfaceId?: number
  routerId?: number
  msg: string
}
const { Option } = Select

const PermissionManage = () => {
  const dispatch = useAppDispatch()
  const Roles = useAppSelector((state) => state.user.Roles, shallowEqual)
  const routerAuth = useAppSelector(
    (state) => state.user.routerAuth,
    shallowEqual
  )

  const interfaceAuth = useAppSelector(
    (state) => state.user.interfaceAuth,
    shallowEqual
  )
  const [roleUUID, setroleUUID] = useState<number>(
    Roles.length && Roles[0].uuid
  )
  const [condition, setCondition] = useState<'I' | 'R'>('R')

  useEffect(() => {
    dispatch(getRoleConditionRead({ condition: 'R' }))
  }, [dispatch])
  const roleChange = async (value: number) => {
    setroleUUID(value)
    await dispatch(
      getRoleConditionRead({ condition: condition, uuid: value, roleP: Roles })
    )
  }
  const ConditionChange = async (value: 'I' | 'R') => {
    setCondition(value)
    await dispatch(
      getRoleConditionRead({ condition: value, uuid: roleUUID, roleP: Roles })
    )
  }
  const serachChange = async () => {
    await dispatch(
      getRoleConditionRead({
        condition: condition,
        uuid: roleUUID,
        roleP: Roles,
      })
    )
  }
  const authIndex = ({
    type,
    Ptype,
    uuid,
    routerId,
    interfaceId,
    msg,
  }: AddObj) => {
    const arr = []
    switch (Ptype) {
      case 'router':
        if (routerId || routerId === 0) {
          if (type === 'add') {
            arr.push(addRouter({ uuid, routerId }))
          }
          if (type === 'remove') {
            arr.push(removeRouter({ uuid, routerId }))
          }
        }
        break
      case 'interface':
        if (interfaceId || interfaceId === 0) {
          if (type === 'add') {
            arr.push(addInterface({ uuid, interfaceId }))
          }
          if (type === 'remove') {
            arr.push(removeInterFace({ uuid, interfaceId }))
          }
        }
        break
      default:
        break
    }
    if (arr.length === 0) return error('authIndex 有问题')
    arr[0].then((res) => {
      if (res) {
        success(msg)
        serachChange()
      }
    })
  }
  const columns1: ColumnsType<Condition_1> = [
    { title: 'uuid', dataIndex: 'uuid' },
    { title: '接口名字', dataIndex: 'name' },
    {
      title: '接口权限',
      dataIndex: 'auth',
      render: (value: boolean, record) =>
        value ? (
          <Tag
            color="success"
            icon={transformIconStringToJSX('CheckCircleOutlined')}
          >
            有
          </Tag>
        ) : (
          <Tag
            color="error"
            icon={transformIconStringToJSX('CloseCircleOutlined')}
          >
            无
          </Tag>
        ),
    },
    { title: '接口url', dataIndex: 'url' },
    {
      title: '操作',
      render: (_, record) => {
        if (record.auth) {
          return (
            <Button
              type="primary"
              danger
              hidden={!!record.children}
              onClick={() =>
                authIndex({
                  type: 'remove',
                  Ptype: 'interface',
                  interfaceId: record.uuid,
                  uuid: roleUUID,
                  msg: '删除接口权限成功',
                })
              }
            >
              删除权限
            </Button>
          )
        } else {
          return (
            <Button
              type="primary"
              hidden={!!record.children}
              onClick={() =>
                authIndex({
                  type: 'add',
                  Ptype: 'interface',
                  uuid: roleUUID,
                  interfaceId: record.uuid,
                  msg: '添加接口权限成功',
                })
              }
            >
              添加权限
            </Button>
          )
        }
      },
    },
  ]
  const columns2: ColumnsType<Condition_2> = [
    { title: 'uuid', dataIndex: 'uuid' },
    { title: '路由名称', dataIndex: 'routerName' },
    { title: '路由id', dataIndex: 'rootId' },
    {
      title: '路由标签',
      dataIndex: 'icon',
      render: (value: string) => transformIconStringToJSX(value),
    },
    {
      title: '路由权限',
      dataIndex: 'auth',
      render: (value: boolean, record) =>
        value ? (
          <Tag
            color="success"
            icon={transformIconStringToJSX('CheckCircleOutlined')}
            hidden={!!record.children}
          >
            有
          </Tag>
        ) : (
          <Tag
            color="error"
            icon={transformIconStringToJSX('CloseCircleOutlined')}
            hidden={!!record.children}
          >
            无
          </Tag>
        ),
    },
    {
      title: '操作',
      render: (_, record) => {
        if (record.auth) {
          return (
            <Button
              type="primary"
              danger
              hidden={!!record.children}
              onClick={() =>
                authIndex({
                  type: 'remove',
                  Ptype: 'router',
                  uuid: roleUUID,
                  routerId: record.uuid,
                  msg: '删除路由权限成功',
                })
              }
            >
              删除权限
            </Button>
          )
        } else {
          return (
            <Button
              type="primary"
              hidden={!!record.children}
              onClick={() =>
                authIndex({
                  type: 'add',
                  Ptype: 'router',
                  uuid: roleUUID,
                  routerId: record.uuid,
                  msg: '添加路由权限成功',
                })
              }
            >
              添加权限
            </Button>
          )
        }
      },
    },
  ]
  return (
    <main className={classNames(styles.root)}>
      {Roles.length > 0 && (
        <header>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="选择角色"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option!.children as unknown as string).includes(input)
            }
            onChange={roleChange}
            defaultValue={Roles[0].uuid}
          >
            {Roles.map((obj) => (
              <Option value={obj.uuid} key={obj.uuid}>
                {obj.roleName}
              </Option>
            ))}
          </Select>
          <Select
            defaultValue="R"
            style={{ width: 120 }}
            onChange={ConditionChange}
          >
            <Option value="R">路由权限</Option>
            <Option value="I">接口权限</Option>
          </Select>
          <Button type="primary" onClick={serachChange}>
            重新搜索
          </Button>
        </header>
      )}
      {condition === 'R' ? (
        <Table
          columns={columns2}
          dataSource={routerAuth}
          rowKey={(record) => record.uuid}
        />
      ) : (
        <Table
          columns={columns1}
          dataSource={interfaceAuth}
          rowKey={(record) => record.uuid}
        />
      )}
    </main>
  )
}

export default PermissionManage
