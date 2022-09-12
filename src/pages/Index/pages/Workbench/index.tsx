import classNames from 'classnames'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { Col, Row, Statistic, Divider, List, Typography, Button } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { visitNum } from '../../../../api/user'
import { Visit_obj } from '../../../../api/APItype'

// interface Visit_obj_ extends Visit_obj {
//   loading: boolean
// }

const Workbench = () => {
  const [count, setCount] = useState(0)
  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState<Visit_obj[]>()
  const [showDetails, setShowDetails] = useState<Visit_obj[]>()
  const [page, setPage] = useState<{ start: number; end: number }>({
    start: 0,
    end: 5,
  })
  useEffect(() => {
    visitNum().then(
      ({
        data: {
          data: { details, count },
          code,
        },
      }) => {
        if (code === 0) {
          details.sort(
            (a, b) => Date.parse(b.loginTime) - Date.parse(a.loginTime)
          )
          setInitLoading(false)
          setDetails(details)
          setShowDetails(
            details.slice(0, 5).map((v) => ({ ...v, loading: false }))
          )
          setCount(count)
        }
      }
    )
  }, [])
  const onLoadMore = () => {
    setLoading(true)
    setPage({ start: 0, end: page.end + 5 })
    setShowDetails(details!.slice(0, page.end + 5))
    setTimeout(() => {
      setLoading(false)
      window.dispatchEvent(new Event('resize'))
    }, 3000)
  }
  const loadMore = (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      {!initLoading && !loading ? (
        <Button disabled={!details} onClick={onLoadMore}>
          加载更多...
        </Button>
      ) : (
        <LoadingOutlined />
      )}
    </div>
  )

  return (
    <div className={classNames(styles.root)}>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="总访问" value={count} />
        </Col>
      </Row>
      <Divider orientation="left">详情</Divider>
      <List
        loadMore={loadMore}
        loading={initLoading}
        bordered
        dataSource={showDetails}
        renderItem={(detail) => (
          <List.Item>
            <Typography.Text mark>[ITEM]</Typography.Text>
            {detail.username}-登录时间-
            {detail.loginTime}-退出时间-
            {detail.logoutTime || '暂无'}
          </List.Item>
        )}
      />
    </div>
  )
}

export default Workbench
