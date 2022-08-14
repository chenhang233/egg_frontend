import classNames from 'classnames'
import { CSSProperties, useEffect, useRef } from 'react'
import styles from './index.module.scss'

interface Props {
  spanArr: number[]
  styleObj?: CSSProperties
}
const Loading = (props: Props) => {
  const Divref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const dom = Divref.current
    if (dom) {
      for (let i = 0; i < dom.children.length; ++i) {
        dom.children[i].setAttribute('style', `--i:${i + 1}`)
      }
    }
  }, [])
  return (
    <section className={classNames(styles.root)} style={props.styleObj}>
      <div className="loader" ref={Divref}>
        {props.spanArr.map((v) => (
          <span key={v}></span>
        ))}
        {/* <span style="--i: 2"></span> */}
      </div>
    </section>
  )
}

export default Loading
