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
    default:
      break
  }
  return icon
}
