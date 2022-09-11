import classNames from 'classnames'
import { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { getSvgCaptcha } from '../../../../redux/slice'
import styles from './index.module.scss'

const Svg = () => {
  const dispatch = useAppDispatch()
  const svgCaptcha = useAppSelector(
    (state) => state.user.svgCaptcha,
    shallowEqual
  )
  useEffect(() => {
    dispatch(getSvgCaptcha())
  }, [dispatch])
  return svgCaptcha ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="37"
      viewBox="0,0,100,40"
      className={classNames(styles.root)}
      onClick={() => dispatch(getSvgCaptcha())}
    >
      <rect width="100%" height="100%" fill={svgCaptcha.rect.fill} />
      {svgCaptcha.path.map((code, i) => (
        <path key={i} d={code.d} stroke={code.stroke} fill={code.fill} />
      ))}
    </svg>
  ) : null
}

export default Svg
