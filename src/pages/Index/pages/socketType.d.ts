export interface BASE_SOCKET_RETURN<T, N> {
  meta: {
    clients: string[]
    timestamp: number
  }
  data: {
    action: T
    payload: {
      EIO: string
      room: 'login' | 'tempPnP'
      transport: 'websocket'
      uuid: string
    } & N
  }
}
export type Login_socket_return = BASE_SOCKET_RETURN<
  'message',
  {
    msg: string
  }
>
