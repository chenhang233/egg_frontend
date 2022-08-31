import { io } from 'socket.io-client'
// browser

export function SocketFn(url: string, room: 'login' | 'tempP2P', uuid: string) {
  // init
  const socket = io(url, {
    // 实际使用中可以在这里传递参数
    query: {
      room,
      uuid: uuid,
      // userId: `client_${Math.random()}`,
    },

    transports: ['websocket'],
  })

  // socket.on('online', (msg) => {
  //   log('#online,', msg)
  // })
  // socket.on('message', (msg) => {
  //   log('message', msg)
  // })
  // // 系统事件
  // socket.on('disconnect', (msg) => {
  //   log('#disconnect', msg)
  // })

  // socket.on('disconnecting', () => {
  //   log('#disconnecting')
  // })

  // socket.on('error', () => {
  //   log('#error')
  // })
  // socket.on('test', (msg) => {
  //   log('#te', msg)
  // })
  return socket
}
