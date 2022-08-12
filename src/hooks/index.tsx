import { useEffect, useRef } from 'react'

export const useCheckTheme = (theme: 'default' | 'dark' = 'default') => {
  console.log('zhix', theme)

  const ref = useRef<HTMLLinkElement>()
  useEffect(() => {
    ref.current && ref.current.remove()
    ref.current = document.createElement('link')
    ref.current.rel = 'stylesheet'
    ref.current.href = `src/theme/${theme}.css`
    document.head.appendChild(ref.current)
  }, [theme])
}
