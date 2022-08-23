import { useCallback, useRef } from 'react'
import { shallowEqual } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { Button, MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu } from 'antd'
import React, { useState } from 'react'
import styles from './Index.module.scss'
import classNames from 'classnames'
import { TransformRoute, transformRouter } from '../../utils/index'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { getUserMenus, logout } from '../../redux/slice'
import Modal from '../../components/Modal'
import { transformIconStringToJSX } from '../../utils/enum'

type MenuItem = Required<MenuProps>['items'][number]
type Menus_AS = {
  label: React.ReactNode
  key: React.Key
  icon?: React.ReactNode
  children?: Menus_AS[]
  path?: string
}

const Index = () => {
  const routerArrRef = useRef<TransformRoute[] | undefined>(undefined)
  const { Header, Content, Footer, Sider } = Layout
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [collapsed, setCollapsed] = useState(false)
  const [visible, setVisible] = useState(false)
  const routers = useAppSelector(
    (state) => state.user.info.menu.router,
    shallowEqual
  )
  // console.log(routers, 'routers')
  if (!routers?.length) {
    dispatch(getUserMenus())
  }
  routerArrRef.current = transformRouter(routers, null)

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    path?: string
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      path,
    } as MenuItem
  }
  const getMenuItem = useCallback(
    (routerArr: TransformRoute[] | undefined): MenuItem[] | undefined => {
      if (routerArr) {
        const arr = routerArr.map((obj) => {
          let childrenArr: ItemType[] | undefined
          if (obj.children) {
            childrenArr = getMenuItem(obj.children)
          }
          let icon = transformIconStringToJSX(obj.icon)
          if (childrenArr && childrenArr?.length < 1) childrenArr = undefined
          if (obj.auth) {
            return getItem(
              obj.routerName,
              obj.uuid,
              icon,
              childrenArr,
              obj.routerSrc
            )
          } else {
            return null
          }
        })
        return arr.filter((v) => v)
      }
      return undefined
    },
    []
  )

  const items: MenuItem[] | undefined = getMenuItem(routerArrRef.current)
  const MenuChange = (key: string, keyPath: string[]) => {
    if (routers) {
      const routeObj = routers.find((obj) => obj.uuid === +key)
      if (routeObj && routeObj.routerSrc) {
        navigate(routeObj.routerSrc)
        keyPath.reverse()
        setDefaultBreadcrumb(computedDefaultBreadcrumb(keyPath))
      }
    }
  }
  const loginOutOk = () => {
    setVisible(false)
    dispatch(logout(null))
    navigate('/login', { state: { from: location } })
  }
  const computedDefaultSelectKeys = () => {
    if (location.pathname && items) {
      const key = routers.find(
        (obj) => obj.routerSrc === location.pathname.substring(1)
      )!.uuid
      return [key.toString()]
    }
    return ['5']
  }
  const computedDefaulOpenKeys = () => {
    if (location.pathname && items) {
      let children = routers.find(
        (obj) => obj.routerSrc === location.pathname.substring(1)
      )
      const fn = (items: MenuItem[]): string[] => {
        for (let i = 0; i < items.length; i++) {
          let temp = []
          let item = items[i] as Menus_AS
          temp.push(String(item.key))
          if (item.children) {
            const t = fn(item.children)
            if (t.length > 0) {
              temp = temp.concat(...t)
              return temp
            }
          } else {
            if (item.key === children!.uuid) {
              return temp
            } else {
              continue
            }
          }
        }
        return []
      }
      return fn(items)
    } else {
      return ['0']
    }
  }
  const [defaultOpenKeys] = useState(computedDefaulOpenKeys())
  const computedDefaultBreadcrumb = (OpenKeys: string[]) => {
    const strArr = [...OpenKeys]
    strArr.forEach(
      (strNum, index) =>
        (strArr[index] = routers.find(
          (obj) => obj.uuid === +strNum
        )!.routerName)
    )
    return strArr
  }
  const [defaultBreadcrumb, setDefaultBreadcrumb] = useState(
    computedDefaultBreadcrumb(defaultOpenKeys)
  )

  return (
    <div className={classNames(styles.root)}>
      <Modal
        visible={visible}
        handleOk={loginOutOk}
        handleCancel={() => setVisible(false)}
        title={'退出'}
      >
        <p>确认退出吗</p>
      </Modal>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />
          <Menu
            style={{ minWidth: 0, flex: 'auto' }}
            theme="dark"
            defaultSelectedKeys={computedDefaultSelectKeys()}
            defaultOpenKeys={defaultOpenKeys}
            onSelect={({ item, key, keyPath, domEvent }) =>
              MenuChange(key, keyPath)
            }
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-header" style={{ padding: 0 }}>
            <section></section>
            <Button type="primary" onClick={() => setVisible(true)}>
              退出
            </Button>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {defaultBreadcrumb.map((str) => (
                <Breadcrumb.Item key={str}>{str}</Breadcrumb.Item>
              ))}
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
