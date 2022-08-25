import { Button, Result } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const ref = useRef(-1)
  const [time, setTime] = useState(5)
  const navgate = useNavigate()
  useEffect(() => {
    ref.current = window.setInterval(() => {
      if (time === 0) {
        navgate('/')
      }
      setTime(time - 1)
    }, 1000)
    return () => {
      clearInterval(ref.current)
    }
  }, [time, navgate])

  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => navgate('/')}>
            {time}秒后回首页
          </Button>
        }
      />
    </div>
  )
}

export default NotFound
