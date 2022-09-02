import TextArea from 'antd/lib/input/TextArea'
import { Comment, Tooltip, Button, List } from 'antd'
import classNames from 'classnames'
import styles from './index.module.scss'
import moment from 'moment'
import io from 'socket.io-client'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { Forum_socket_listData, Forum_socket_online } from '../socketType'
import { addForumListData } from '../../../../redux/socket'
import { shallowEqual } from 'react-redux'

const Forum = () => {
  const clientRef = useRef<any>(null)
  const dispatch = useAppDispatch()
  const [clientHeight, setClientHeight] = useState(400)
  const [text, setText] = useState('')
  const { uuid } = useAppSelector(
    (state) => state.user.info.userinfo,
    shallowEqual
  )
  const tempForumList = useAppSelector(
    (state) => state.socket.tempForumList,
    shallowEqual
  )
  useEffect(() => {
    const mydom = document.querySelector('.ant-list-items li:nth-last-child(1)')
    mydom?.scrollIntoView()
  }, [tempForumList])
  useEffect(() => {
    setClientHeight(document.body.clientHeight - 350)
    if (uuid) {
      const client = io('http://localhost:7001/forum', {
        transports: ['websocket'],
        query: {
          room: 'tempPnP',
          uuid,
        },
      })
      clientRef.current = client
      client.on('connect', () => {})
      client.on('online', (data: Forum_socket_online) => {
        console.log(data, 'payload')
      })
      client.on('disconnect', (msg: any) => {
        console.log(msg, '退出原因')
      })
      client.on('message', (msg: Forum_socket_listData) => {
        dispatch(addForumListData(msg.data.payload))
      })
      return () => {
        client.close()
      }
    }
  }, [uuid, dispatch])
  const emitMessage = () => {
    clientRef.current.emit('exchange', {
      payload: {
        content: text,
        uuid,
        datetime: Date.now(),
      },
    })
    setText('')
  }
  const textChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }
  return (
    <div className={classNames(styles.root)}>
      <div className="online"></div>
      <div className="panel">
        <h3>消息记录</h3>
        <hr />
        <div className="content" style={{ height: clientHeight }}>
          <List
            className="comment-list"
            itemLayout="horizontal"
            dataSource={
              tempForumList &&
              tempForumList.map((obj) => ({
                author: obj.nickname || '匿名用户',
                avatar: obj.avatar,
                content: <div className="comment">{obj.content}</div>,
                datetime: (
                  <Tooltip
                    title={moment(obj.datetime).format('YYYY-MM-DD HH:mm:ss')}
                  >
                    <span>{moment(obj.datetime).fromNow()}</span>
                  </Tooltip>
                ),
                type: obj.type,
              }))
            }
            renderItem={(item) => (
              <li className={classNames(item.type)}>
                <Comment
                  author={item.author}
                  avatar={item.avatar}
                  content={item.content}
                  datetime={item.datetime}
                />
              </li>
            )}
          />
        </div>
        <div className="emit">
          <TextArea
            rows={4}
            maxLength={1000}
            value={text}
            onChange={(e) => textChange(e)}
          />
          <Button type="primary" className="buttonEmit" onClick={emitMessage}>
            发送
          </Button>
        </div>
      </div>
      <div className="right"></div>
    </div>
  )
}

export default Forum
