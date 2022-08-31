import classNames from 'classnames'
import styles from './index.module.scss'

const MessageList = () => {
  return (
    <article className={classNames(styles.root)}>
      <div className="text">文本信息</div>
      <ul className="more">
        <li>11</li>
        <li>11</li>
        <li>11</li>
      </ul>
    </article>
  )
}

export default MessageList
