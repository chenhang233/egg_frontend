import { useEffect, useRef } from 'react'

export const useCheckTheme = (theme: 'default' | 'dark' = 'default') => {
  const ref = useRef<HTMLLinkElement>()
  useEffect(() => {
    ref.current && ref.current.remove()
    ref.current = document.createElement('link')
    ref.current.rel = 'stylesheet'
    ref.current.href = `/assets/${theme}.css`
    document.head.appendChild(ref.current)
  }, [theme])
}
