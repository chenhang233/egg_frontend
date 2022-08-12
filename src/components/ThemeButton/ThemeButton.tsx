import { Switch } from 'antd'
import classNames from 'classnames'
import { useState } from 'react'
import { useAppDispatch } from '../../redux/hook'
import { changeTheme } from '../../redux/slice'
import styles from './ThemeButton.module.scss'

const ThemeButton = () => {
  const [dark, setDark] = useState(false)
  const dispatch = useAppDispatch()
  const change = (checked: boolean) => {
    setDark(checked)
    dispatch(changeTheme(checked ? 'dark' : 'default'))
  }
  return (
    <div className={classNames(styles.root)}>
      <Switch
        checkedChildren="白天"
        unCheckedChildren="黑夜"
        onChange={change}
        className={classNames(dark ? 'black' : 'white')}
      />
    </div>
  )
}

export default ThemeButton
