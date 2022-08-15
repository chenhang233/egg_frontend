import { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { getUserMenus } from '../../redux/slice'
import { PieChartOutlined, TeamOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu } from 'antd'
import React, { useState } from 'react'
import styles from './Index.module.scss'
import classNames from 'classnames'

const Index = () => {
  const dispatch = useAppDispatch()
  const { Header, Content, Footer, Sider } = Layout
  const routers = useAppSelector((state) => state.user.info.menu, shallowEqual)
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    dispatch(getUserMenus())
  }, [dispatch])

  console.log(routers, 'routers')

  type MenuItem = Required<MenuProps>['items'][number]

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem
  }

  const items: MenuItem[] = [
    getItem('首页', '1', <PieChartOutlined />),
    getItem('个人', '2', <TeamOutlined />, [
      getItem('角色管理', '3'),
      getItem('权限管理', '4'),
    ]),
  ]
  return (
    <div className={classNames(styles.root)}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            热情和欲望可以突破一切难关。
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}

export default Index
