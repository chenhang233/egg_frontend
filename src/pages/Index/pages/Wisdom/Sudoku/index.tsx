import classNames from 'classnames'
import styles from './index.module.scss'
import { useClienOutletHeight } from '../../../Index'
import { Button, List } from 'antd'
import { generateBoard, isValidSudoku } from '../../../../../utils'
import { numberArray } from '../../../../../utils/enum'
import { useEffect, useState, useRef } from 'react'

export interface SingleBox {
  position: { top: number; left: number }
  number: number | null
  id: number
  border?: ('top' | 'left' | 'right' | 'bottom' | null)[]
  type?: 'system' | 'user'
}

export type Checkerboard = SingleBox[][]
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
]

const Sudoku = () => {
  const { clienOutletHeight } = useClienOutletHeight()
  const boardRef = useRef<HTMLDivElement>(null)
  // const ButtonRef = useRef<HTMLDivElement>(null)
  const [checkerboard, setCheckerboard] = useState<Checkerboard>([])
  const [currentButton, setCurrentButton] = useState<{
    number: number
    color: string
  }>({ number: 1, color: 'red' })
  useEffect(() => {
    setCheckerboard(generateBoard())
  }, [])
  // const [moveNumberDisabled, setMoveNumberDisabled] = useState(true)
  // const [moveNumberPosition, setMoveNumberPosition] = useState<{
  //   top: number
  //   left: number
  // }>({ top: 0, left: 0 })
  const cellWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    setTimeout(() => {
      const native = e.nativeEvent as any
      const wheelDelta = native.wheelDelta
      const n = currentButton.number
      setCurrentButton({
        ...currentButton,
        number:
          wheelDelta < 0 ? (n + 1 > 9 ? 1 : n + 1) : n - 1 < 1 ? 9 : n - 1,
      })
    }, 50)
  }
  const cellClick = (
    row: number,
    col: number,
    type: 'system' | 'user' | undefined
  ) => {
    if (type === 'system') return
    const newoard: Checkerboard = JSON.parse(JSON.stringify(checkerboard))
    newoard[row][col].number = currentButton.number
    newoard[row][col].type = 'user'
    setCheckerboard(newoard)
    console.log(isValidSudoku(newoard))
  }
  // const moveNumberMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   e.preventDefault()
  //   const { left, top } = boardRef.current!.getBoundingClientRect()
  //   let L = e.pageX - left - ButtonRef.current!.offsetHeight / 2
  //   let T = e.pageY - top - ButtonRef.current!.offsetWidth / 2
  //   setMoveNumberPosition({ left: L, top: T })
  // }
  return (
    <div className={classNames(styles.root)}>
      {/* <header> </header> */}
      {/* <Button
        type="primary"
        shape="circle"
        ref={ButtonRef}
        hidden={moveNumberDisabled}
        style={{
          top: moveNumberPosition.top + 'px',
          left: moveNumberPosition.left + 'px',
        }}
        className={classNames(currentButton.color, 'moveNumber')}
      >
        {currentButton.number}
      </Button> */}
      <div className="content" style={{ height: clienOutletHeight + 20 }}>
        <div
          className="board"
          ref={boardRef}
          // onMouseEnter={() => setMoveNumberDisabled(false)}
          // onMouseLeave={() => setMoveNumberDisabled(true)}
          // onMouseMove={(e) => moveNumberMove(e)}
        >
          <Button
            type="primary"
            className="reload"
            onClick={() => setCheckerboard(generateBoard())}
          >
            重新开始
          </Button>
          {checkerboard.map((row, i) => (
            <div className="row" key={i}>
              {row.map((cell, c) => (
                <div
                  key={cell.id}
                  className={classNames('cell', cell.border)}
                  // onMouseMove={(e) => cellMove(e)}
                  onWheel={(e) => cellWheel(e)}
                  onClick={() => cellClick(i, c, cell.type)}
                >
                  <span className={classNames(cell.type)}>{cell.number}</span>
                </div>
              ))}
            </div>
          ))}
          <div className="number">
            {numberArray.map((o) => (
              <Button
                type="primary"
                shape="circle"
                key={o.number}
                className={classNames(o.color)}
                id={
                  o.number === currentButton.number ? 'currentColor' : undefined
                }
                onClick={() => setCurrentButton(o)}
              >
                {o.number}
              </Button>
            ))}
          </div>
        </div>
        <div className="tip">
          <List
            header={<div>回溯</div>}
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
