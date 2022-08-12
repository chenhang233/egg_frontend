import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../../redux/hook'

const Index = () => {
  const routers = useAppSelector(
    (state) => state.user.info?.menu.router,
    shallowEqual
  )
  console.log(routers, 'routers')

  return <div>index</div>
}

export default Index
