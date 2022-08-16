import { shallowEqual } from 'react-redux'
import { loginUser } from '../api/user'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { add, minus, _loginUser } from '../redux/slice'

export const APage = () => {
  console.log('A渲染了')

  const { count } = useAppSelector((state) => ({ ...state.user }), shallowEqual)
  const dispatch = useAppDispatch()
  return (
    <div>
      <h1>我是Apage</h1>
      <h2>我是count:{count}</h2>
      <button
        onClick={() => {
          dispatch(add())
        }}
      >
        加1
      </button>
      <button
        onClick={() => {
          dispatch(minus())
        }}
      >
        减1
      </button>

      <button
        onClick={() => {
          dispatch(_loginUser({ username: 'admin', password: '123456' }))
        }}
      >
        登录
      </button>
      <button
        onClick={() => {
          loginUser({ username: 'admin', password: '123456' })
        }}
      >
        api
      </button>
    </div>
  )
}
