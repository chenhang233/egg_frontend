import {
  PieChartOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
  SlackOutlined,
  UnlockOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CalendarOutlined,
  AuditOutlined,
  AreaChartOutlined,
  ReadOutlined,
  BankOutlined,
  MehOutlined,
  BarChartOutlined,
  LikeOutlined,
  TableOutlined,
} from '@ant-design/icons'

export const transformIconStringToJSX = (name: string | null) => {
  let icon = <QuestionCircleOutlined />
  switch (name) {
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
    case 'CalendarOutlined':
      icon = <CalendarOutlined />
      break
    case 'AuditOutlined':
      icon = <AuditOutlined />
      break
    case 'AreaChartOutlined':
      icon = <AreaChartOutlined />
      break
    case 'ReadOutlined':
      icon = <ReadOutlined />
      break
    case 'CheckCircleOutlined':
      icon = <CheckCircleOutlined />
      break
    case 'CloseCircleOutlined':
      icon = <CloseCircleOutlined />
      break
    case 'BankOutlined':
      icon = <BankOutlined />
      break
    case 'MehOutlined':
      icon = <MehOutlined />
      break
    case 'BarChartOutlined':
      icon = <BarChartOutlined />
      break
    case 'LikeOutlined':
      icon = <LikeOutlined />
      break
    case 'TableOutlined':
      icon = <TableOutlined />
      break
    default:
      break
  }
  return icon
}
export const numberArray = [
  { number: 1, color: 'red' },
  { number: 2, color: 'orange' },
  { number: 3, color: 'yellow' },
  { number: 4, color: 'green' },
  { number: 5, color: 'blueness' },
  { number: 6, color: 'blue' },
  { number: 7, color: 'purple' },
  { number: 8, color: 'black' },
  { number: 9, color: 'gray' },
]
