import classNames from 'classnames'
import styles from './index.module.scss'
import { useClienOutletHeight } from '../../../Index'
import { Button, List, Row, Select } from 'antd'
import {
  generateBoard,
  isValidSudoku,
  otherErrorChessPieces,
} from '../../../../../utils'
import { numberArray } from '../../../../../utils/enum'
import { useEffect, useState, useRef } from 'react'

export interface SingleBox {
  position: { top: number; left: number }
  number: number | null
  id: number
  border?: ('top' | 'left' | 'right' | 'bottom' | null)[]
  type?: 'system' | 'user'
  condition?: 'error'
}

export type Checkerboard = SingleBox[][]
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
]

const Sudoku = () => {
  const { clienOutletHeight } = useClienOutletHeight()
  const boardRef = useRef<HTMLDivElement>(null)
  const [game, setGame] = useState(true)
  const [initNumber, setInitNumber] = useState(20)
  const [checkerboard, setCheckerboard] = useState<Checkerboard>([])
  const [currentButton, setCurrentButton] = useState<{
    number: number
    color: string
  }>({ number: 1, color: 'red' })
  useEffect(() => {
    setCheckerboard(generateBoard(initNumber))
  }, [initNumber])
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
    console.log(row, col, type, game)

    if (type === 'system' || !game) return
    const newoard: Checkerboard = JSON.parse(JSON.stringify(checkerboard))
    newoard[row][col].number = currentButton.number
    newoard[row][col].type = 'user'
    const flag = isValidSudoku(newoard)
    if (!flag) {
      newoard[row][col].condition = 'error'
      const otherArr = otherErrorChessPieces(
        newoard,
        row,
        col,
        currentButton.number
      )
      if (!otherArr.length) return
      otherArr.forEach((obj) => {
        newoard[obj.row][obj.col].condition = 'error'
      })
      setGame(false)
    }
    setCheckerboard(newoard)
  }
  return (
    <div className={classNames(styles.root)}>
      {/* <header> </header> */}
      <div className="content" style={{ height: clienOutletHeight + 20 }}>
        <div className="board" ref={boardRef}>
          <Row justify="space-around">
            <Button
              type="primary"
              className="reload"
              onClick={() => setCheckerboard(generateBoard(initNumber))}
            >
              重新开始
            </Button>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="选择初始化数字数量"
              optionFilterProp="children"
              filterOption={(input, option) =>
                String(option?.value).includes(input)
              }
              onSelect={(num: number) => setInitNumber(num)}
              options={Array.from({ length: 80 }, (_, i) => ({
                label: i + 1,
                value: i + 1,
              }))}
            ></Select>
            <Button type="primary">提示</Button>
          </Row>
          {checkerboard.map((row, i) => (
            <div className="row" key={i}>
              {row.map((cell, c) => (
                <div
                  key={cell.id}
                  className={classNames('cell', cell.border, cell.type)}
                  // onMouseMove={(e) => cellMove(e)}
                  onWheel={(e) => cellWheel(e)}
                  onClick={() => cellClick(i, c, cell.type)}
                >
                  <span className={classNames(cell.type, cell.condition)}>
                    {cell.number}
                  </span>
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
