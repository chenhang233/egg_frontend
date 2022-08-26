import classNames from 'classnames'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { Col, Row, Statistic, Divider, List, Typography } from 'antd'
import { visitNum } from '../../../../api/user'
import { Visit_obj } from '../../../../api/APItype'
const Workbench = () => {
  const [count, setCount] = useState(0)
  const [details, setDetails] = useState<Visit_obj[]>()
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
          setDetails(details)
          setCount(count)
        }
      }
    )
  }, [])
  return (
    <div className={classNames(styles.root)}>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="总访问" value={count} />
        </Col>
      </Row>
      <Divider orientation="left">详情</Divider>
      <List
        bordered
        dataSource={details}
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
