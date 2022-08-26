import type { BadgeProps } from 'antd'
import { Badge, Calendar } from 'antd'
import type { Moment } from 'moment'

const getListData = (value: Moment) => {
  let listData
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: '警告' },
        { type: 'success', content: '成功' },
      ]
      break
    case 10:
      listData = [
        { type: 'warning', content: '警告.' },
        { type: 'success', content: '成功.' },
        { type: 'error', content: '失败' },
      ]
      break
    case 15:
      listData = [
        { type: 'warning', content: '警告' },
        { type: 'success', content: '成功....' },
        { type: 'error', content: '失败 1.' },
        { type: 'error', content: '失败 2.' },
        { type: 'error', content: '失败 3.' },
        { type: 'error', content: '失败 4.' },
      ]
      break
    default:
  }
  return listData || []
}

const getMonthData = (value: Moment) => {
  if (value.month() === 8) {
    return 1394
  }
}

const Calendar_ = () => {
  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value)
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>积压的工作</span>
      </div>
    ) : null
  }
  const dateCellRender = (value: Moment) => {
    const listData = getListData(value)
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps['status']}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    )
  }
  return (
    <div>
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />
      ;
    </div>
  )
}

export default Calendar_
