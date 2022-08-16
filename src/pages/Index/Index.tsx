import { useEffect, useRef } from 'react'
import { shallowEqual } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { getUserMenus } from '../../redux/slice'
import {
  PieChartOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
  SlackOutlined,
  UnlockOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu } from 'antd'
import React, { useState } from 'react'
import styles from './Index.module.scss'
import classNames from 'classnames'
import { TransformRoute, transformRouter } from '../../utils/index'
import { ItemType } from 'antd/lib/menu/hooks/useItems'

type MenuItem = Required<MenuProps>['items'][number]
type Menus = {
  label: React.ReactNode
  key: React.Key
  icon?: React.ReactNode
  children?: Menus[]
}

const Index = () => {
  const routerArrRef = useRef<TransformRoute[] | undefined>(undefined)
  const dispatch = useAppDispatch()
  const { Header, Content, Footer, Sider } = Layout
  const routers = useAppSelector(
    (state) => state.user.info.menu.router,
    shallowEqual
  )

  routerArrRef.current = transformRouter(routers, null)
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    const req = async () => {
      try {
        await dispatch(getUserMenus())
      } catch (e) {
        setTimeout(() => {
          setCollapsed(true)
        })
      }
    }
    req()
  }, [dispatch])

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

  const getMenuItem = (
    routerArr: TransformRoute[] | undefined
  ): MenuItem[] | undefined => {
    if (routerArr) {
      return routerArr.map((obj) => {
        let childrenArr: ItemType[] | undefined
        if (obj.children) {
          childrenArr = getMenuItem(obj.children) || undefined
        }
        let icon = <QuestionCircleOutlined />
        switch (obj.icon) {
          case 'PieChartOutlined':
            icon = <PieChartOutlined />
            break

          case 'TeamOutlined':
            icon = <TeamOutlined />
            break
          case 'SlackOutlined':
            icon = <SlackOutlined />
            break
          case 'UnlockOutlined':
            icon = <UnlockOutlined />
            break
          case 'UserOutlined':
            icon = <UserOutlined />
            break

          default:
            break
        }
        if (childrenArr && childrenArr?.length < 1) childrenArr = undefined
        return getItem(obj.routerName, obj.uuid, icon, childrenArr)
      })
    }
    return undefined
  }
  const items: MenuItem[] | undefined = getMenuItem(routerArrRef.current)
  const MenuChange = (key: string, keyPath: string[]) => {
    if (items) {
      let myItem: Menus[] | undefined = [...items] as Menus[]
      let currentItem: Menus | undefined

      while (keyPath.length > 0) {
        const n = keyPath[keyPath.length - 1]
        // eslint-disable-next-line no-loop-func
        currentItem = myItem.find((obj: Menus) => {
          if (obj?.key === n) {
            myItem = obj.children
            return true
          }
          return false
        })
        keyPath.pop()
        console.log(keyPath, 'keyPath')

        // const item = items[]
      }
      console.log('dianj', key, keyPath, items, currentItem)
    }
  }
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
            defaultSelectedKeys={['5']}
            defaultOpenKeys={['0']}
            onClick={({ item, key, keyPath, domEvent }) =>
              MenuChange(key, keyPath)
            }
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
              <Outlet></Outlet>
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
