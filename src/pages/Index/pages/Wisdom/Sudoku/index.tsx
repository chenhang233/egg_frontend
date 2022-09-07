import classNames from 'classnames'
import styles from './index.module.scss'
import { useClienOutletHeight } from '../../../Index'
import { Button, List } from 'antd'
import { checkBoard } from '../../../../../utils'

export interface SingleBox {
  position: { top: number; left: number }
  number: number | null
  id: number
  border?: ('top' | 'left' | 'right' | 'bottom' | null)[]
}

export type Checkerboard = SingleBox[][]
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
]
const checkerboard: Checkerboard = Array.from({ length: 9 }, (_, i) =>
  Array.from({ length: 9 }, (_, j) => ({
    position: { top: i, left: j },
    number: null,
    id: Number(i + '' + j),
    border: [
      i % 3 === 0 ? 'top' : null,
      j % 3 === 0 ? 'left' : null,
      j === 8 ? 'right' : null,
      i === 8 ? 'bottom' : null,
    ],
  }))
)
const numberArray = [
  { number: 1, color: 'red' },
  { number: 2, color: 'orange' },
  3,
  4,
  5,
  6,
  7,
  8,
  9,
]
const Sudoku = () => {
  const { clienOutletHeight } = useClienOutletHeight()
  return (
    <div className={classNames(styles.root)}>
      {/* <h2 className="title">数独</h2> */}
      <div className="content" style={{ height: clienOutletHeight }}>
        <div className="board">
          {checkerboard.map((row, i) => (
            <div className="row" key={i}>
              {row.map((cell) => (
                <div key={cell.id} className={classNames('cell', cell.border)}>
                  <span>{cell.number}</span>
                </div>
              ))}
            </div>
          ))}
          <div className="number">
            {numberArray.map((n) => (
              <Button type="primary" color=""></Button>
            ))}
          </div>
          <Button type="primary" className="reload">
            重新开始
          </Button>
        </div>
        <div className="tip">
          <List
            header={<div>悔棋</div>}
            bordered
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </div>
      </div>
    </div>
  )
}

export default Sudoku
