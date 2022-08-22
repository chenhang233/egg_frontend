import { useEffect, useRef } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../redux/hook'
import { localStorage_clear, localStorage_get } from '../utils'

export const useCheckTheme = (theme: 'default' | 'dark' = 'default') => {
  const ref = useRef<HTMLLinkElement>()
  useEffect(() => {
    ref.current && ref.current.remove()
    ref.current = document.createElement('link')
    ref.current.rel = 'stylesheet'
    ref.current.href = `src/theme/${theme}.css`
    document.head.appendChild(ref.current)
  }, [theme])
}

export const useAuth = () => {
  const { token } = useAppSelector((state) => state.user.info, shallowEqual)
  if (
    !token &&
    (!localStorage_get('token') || !localStorage_get('refreshToken'))
  ) {
    localStorage_clear()
    return false
  }
  return true
}
