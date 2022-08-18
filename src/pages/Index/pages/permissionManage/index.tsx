import { useEffect } from 'react'
import { readAuth } from '../../../../api/user'

const PermissionManage = () => {
  useEffect(() => {
    readAuth({ uuid: 1, condition: 'R' })
  }, [])
  return <div>PermissionManage</div>
}

export default PermissionManage
