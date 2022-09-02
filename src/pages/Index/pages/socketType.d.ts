export interface BASE_SOCKET_RETURN<T, N> {
  meta: {
    clients: string[]
    timestamp: number
  }
  data: {
    action: T
    payload: {
      EIO: string
      transport: 'websocket'
      uuid: string
    } & N
  }
}
export type Login_socket_return = BASE_SOCKET_RETURN<
  'message',
  {
    room: 'login'
    msg: string
  }
>

export type Forum_socket_online = BASE_SOCKET_RETURN<
  'online',
  {
    room: 'tempPnP'
    msg: string
  }
>

export type Forum_socket_listData = BASE_SOCKET_RETURN<
  'message',
  {
    nickname: string
    avatar: string
    content: string
    datetime: number
    type: 'me' | 'other'
  }
>
