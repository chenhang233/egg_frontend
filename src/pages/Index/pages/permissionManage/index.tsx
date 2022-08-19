import { useEffect, useState } from 'react'
import { Select, Table, Tag } from 'antd'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { getRoleConditionRead } from '../../../../redux/slice'
import styles from './index.module.scss'
import classNames from 'classnames'
import { ColumnsType } from 'antd/lib/table'
import { Condition_1, Condition_2 } from '../../../../api/APItype'
const columns1: ColumnsType<Condition_1> = [
  { title: 'uuid', dataIndex: 'uuid' },
  { title: 'name', dataIndex: 'name' },
  { title: 'auth', dataIndex: 'auth' },
  { title: 'url', dataIndex: 'url' },
]
const columns2: ColumnsType<Condition_2> = [
  { title: 'routerName', dataIndex: 'routerName' },
  { title: 'rootId', dataIndex: 'rootId' },
  { title: 'icon', dataIndex: 'icon' },
  { title: 'routerSrc', dataIndex: 'routerSrc' },
  { title: 'auth', dataIndex: 'auth' },
  { title: '子路由', dataIndex: 'children' },
]

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
  const [roleUUID, setroleUUID] = useState<number>(Roles[0]?.uuid)
  const [condition, setCondition] = useState<'I' | 'R'>('R')

  useEffect(() => {
    dispatch(getRoleConditionRead({ condition: 'R' }))
  }, [dispatch])
  const roleChange = async (value: number) => {
    setroleUUID(value)
    await dispatch(
      getRoleConditionRead({ condition: condition, uuid: value, roleP: Roles })
    )
    changeDataSource()
  }
  const ConditionChange = async (value: 'I' | 'R') => {
    setCondition(value)
    await dispatch(
      getRoleConditionRead({ condition: value, uuid: roleUUID, roleP: Roles })
    )
    changeDataSource()
  }
  const changeDataSource = () => {
    // if (condition === 'R') {
    //   setDataSource(routerAuth)
    //   setColumns(columns2)
    // }
    // if (condition === 'I') {
    //   setDataSource(interfaceAuth)
    //   setColumns(columns1)
    // }
  }
  const transformRouterDataSource = (arr: Condition_2[]) => {
    console.log(arr)

    return arr
  }
  return (
    <main className={classNames(styles.root)}>
      {Roles.length > 0 && (
        <>
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
        </>
      )}
      <Table
        columns={columns1}
        dataSource={interfaceAuth}
        rowKey={(record) => record.uuid}
      />
      <Table
        columns={columns2}
        dataSource={transformRouterDataSource(routerAuth)}
        rowKey={(record) => record.uuid}
      />
    </main>
  )
}

export default PermissionManage
