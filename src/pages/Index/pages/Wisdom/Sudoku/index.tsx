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
import { info, success, warning } from '../../../../../api'

export interface SingleBox {
  position: { top: number; left: number }
  number: number | null
  id: number
  border?: ('top' | 'left' | 'right' | 'bottom' | null)[]
  type?: 'system' | 'user'
  condition?: 'error'
}

export type Checkerboard = SingleBox[][]
export interface CheckerboardObj {
  Checkerboard: Checkerboard
  currentCell: number | null
}
export type CheckerboardList = CheckerboardObj[]

export interface CurrentButton {
  number: number
  color: string
}
const initCellNumber = 20
const Sudoku = () => {
  const { clienOutletHeight } = useClienOutletHeight()
  const boardRef = useRef<HTMLDivElement>(null)
  const [game, setGame] = useState(true)
  const [initNumber, setInitNumber] = useState(initCellNumber)
  const [count, setCount] = useState(initCellNumber)
  const [checkerboard, setCheckerboard] = useState<Checkerboard>([])
  const [initBoardSnapshot, setInitBoardSnapshot] = useState<Checkerboard>([])
  const [boardList, setBoardList] = useState<CheckerboardList>([])
  const [answer, setAnswer] = useState<Checkerboard>([])
  const [currentButton, setCurrentButton] = useState<CurrentButton>({
    number: 1,
    color: 'red',
  })
  // const [currentPosition, setCurrentPosition] = useState<{top:number,left:number}>()
  useEffect(() => {
    const { checkerboard, answer } = generateBoard(initNumber)
    setInitBoardSnapshot(checkerboard)
    setAnswer(answer)
    setCheckerboard(checkerboard)
  }, [initNumber])
  useEffect(() => {
    if (count >= 81 && game) {
      setGame(false)
      success('你赢了')
    }
  }, [count, game])

  const cellWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation()
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
    setBoardList([
      ...boardList,
      { currentCell: currentButton.number, Checkerboard: newoard },
    ])
    setCount(count + 1)
  }
  const reloadGame = () => {
    const { checkerboard, answer } = generateBoard(initNumber)
    setCheckerboard(checkerboard)
    setAnswer(answer)
    setGame(true)
    setBoardList([])
  }
  const backtrack = (i: number) => {
    if (i === 0) {
      setCheckerboard(initBoardSnapshot)
      setBoardList([])
    } else {
      setCheckerboard(boardList[i - 1].Checkerboard)
      setBoardList(boardList.slice(0, i))
    }
    setGame(true)
    setCount(count - (boardList.length - i))
  }
  const selectCellNumber = (num: number) => {
    setInitNumber(num)
    setCount(num)
    setBoardList([])
  }
  const tipGame = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!checkerboard[i][j].number) {
          const { position, number } = answer[i][j]
          info(
            `第${position.top + 1}行,第${
              position.left + 1
            }列, 填入数字${number}`
          )
          return
        }
      }
    }
    warning('暂无提示')
  }
  const currentButtonClick = (o: CurrentButton) => {
    setCurrentButton(o)
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
              onClick={() => reloadGame()}
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
              defaultValue={initCellNumber}
              onSelect={(num: number) => selectCellNumber(num)}
              options={Array.from({ length: 80 }, (_, i) => ({
                label: i + 1,
                value: i + 1,
              }))}
            ></Select>
            <Button type="primary" onClick={tipGame}>
              提示
            </Button>
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
                onClick={() => currentButtonClick(o)}
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
            dataSource={boardList}
            renderItem={(item, i) => (
              <List.Item>
                撤销操作数字:{' '}
                <Button type="primary" onClick={() => backtrack(i)}>
                  {item.currentCell}
                </Button>
              </List.Item>
            )}
          />
          <div>{count}</div>
        </div>
      </div>
    </div>
  )
}

export default Sudoku
