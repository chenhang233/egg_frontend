import { Route } from '../api/APItype'
import { Checkerboard } from '../pages/Index/pages/Wisdom/Sudoku'
import { numberArray } from './enum'
type TOKEN = 'token' | 'refreshToken' | 'isLogin'

export interface TransformRoute extends Route {
  children?: TransformRoute[] | []
}
export const transformRouter = (routes: Route[], id: string | null) => {
  if (!routes) {
    return undefined
  }
  const fn = (routes: Route[], id: string | null): TransformRoute[] => {
    let res: TransformRoute[] = []
    routes.forEach((obj) => {
      const newobj = { ...obj } as TransformRoute
      if (newobj.parentId === id) {
        newobj.children = fn(routes, newobj.rootId)
        res.push(newobj)
      }
    })
    return res
  }
  return fn(routes, id)
}

export const isSafe = (
  board: Checkerboard,
  row: number,
  col: number,
  n: number
) => {
  try {
    for (let i = 0; i < board.length; i++) {
      if (board[row][i].number === n) return false
    }
    for (let j = 0; j < board.length; j++) {
      if (board[j][col].number === n) return false
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[row - (row % 3) + i][col - (col % 3) + j].number === n)
          return false
      }
    }
    return true
  } catch {
    return false
  }
}

export const answerBoard = (board: Checkerboard) => {
  if (!board) return false
  const winBoard: Checkerboard = JSON.parse(JSON.stringify(board))
  const fn = (winBoard: Checkerboard) => {
    let isCheck = false
    let unAssgined = null
    let row = 0
    let col = 0
    for (row = 0; row < winBoard.length; row++) {
      for (col = 0; col < winBoard[row].length; col++) {
        if (winBoard[row][col].number === unAssgined) {
          isCheck = true
          break
        }
      }
      if (isCheck) break
    }
    if (!isCheck) return true
    for (let i = 1; i <= 9; i++) {
      if (isSafe(winBoard, row, col, i)) {
        winBoard[row][col].number = i
        if (fn(winBoard)) return true
        winBoard[row][col].number = null
      }
    }
    return false
  }
  fn(winBoard)
  return winBoard
}

export const numberNoRepeatRandom = (
  start: number,
  end: number,
  countArr: number[]
) => {
  const fn = () => {
    return Math.max(Math.floor(Math.random() * end), start)
  }
  let currentNumber = fn()
  while (countArr.includes(currentNumber)) {
    currentNumber = currentNumber + 1 > end ? 0 : currentNumber + 1
  }
  return currentNumber
}
export const solveSudoku = (board: Checkerboard) => {
  let row = 0
  let col = 0
  let checkEverySpaces = false
  for (row = 0; row < board.length; row++) {
    for (col = 0; col < board[row].length; col++) {
      if (board[row][col].number === null) {
        checkEverySpaces = true
        break
      }
    }
    if (checkEverySpaces) break
  }
  if (!checkEverySpaces) return true
  for (let n = 1; n <= 9; n++) {
    if (isSafe(board, row, col, n)) {
      board[row][col].number = n
      board[row][col].type = 'system'
      if (solveSudoku(board)) {
        return true
      }
      board[row][col].number = null
      board[row][col].type = undefined
    }
  }
  return false
}

export const generatePosition = (
  randomPositionArr: number[],
  randomEnd: number
) => {
  let randomPosition = numberNoRepeatRandom(0, randomEnd, randomPositionArr)
  randomPositionArr.push(randomPosition)
  let str =
    String(randomPosition).length === 1
      ? '0' + String(randomPosition)
      : String(randomPosition)
  let [top, left] = str.split('')
  let Top = Number(top)
  let Left = Number(left)
  return [Top, Left]
}

export const InsertRandomNumberToPosition = (
  board: Checkerboard,
  initChessPieces: number
) => {
  const randomPositionArr: number[] = [9, 19, 29, 39, 49, 59, 69, 79]
  for (let index = 1; index <= 9; index++) {
    const [Top, Left] = generatePosition(randomPositionArr, 88)
    const n = numberArray[index - 1].number
    if (isSafe(board, Top, Left, n)) {
      board[Top][Left].number = n
      board[Top][Left].type = 'system'
    }
  }
  const b = JSON.parse(JSON.stringify(board)) as Checkerboard
  const f = solveSudoku(b)
  if (f) {
    for (let index = 10; index <= initChessPieces; index++) {
      const [Top, Left] = generatePosition(randomPositionArr, 88)
      board[Top][Left].number = b[Top][Left].number
      board[Top][Left].type = 'system'
    }
  }
  return b
}

export const generateBoard = (initChessPieces: number = 5) => {
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
  const answer = InsertRandomNumberToPosition(checkerboard, initChessPieces)
  return { checkerboard, answer }
}

export const isValidSudoku = function (board: Checkerboard) {
  let flag = true
  A: for (let i = 0; i < board.length; i++) {
    let prevArr = [board[i][0].number]
    for (let j = 0; j < board[i].length; j++) {
      if (i === 0) {
        let prevArr2 = [board[i][j].number]
        for (let k = 1; k < board.length; k++) {
          for (let n = 0; n < prevArr2.length; n++) {
            if (board[k][j].number && prevArr2[n] === board[k][j].number) {
              flag = false
              break A
            }
          }
          if (board[k][j].number) {
            prevArr2.push(board[k][j].number)
          }
        }
      }
      if (j > 0) {
        if (board[i][j].number) {
          for (let n = 0; n < prevArr.length; n++) {
            if (board[i][j].number === prevArr[n]) {
              flag = false
              break A
            }
          }
          prevArr.push(board[i][j].number)
        }
      }
      if ((i === 0 || i % 3 === 0) && (j === 0 || j % 3 === 0)) {
        const prev3Arr = []
        for (let n = i; n < i + 3; n++) {
          for (let m = j; m < j + 3; m++) {
            if (board[n][m].number) {
              if (prev3Arr.length > 0) {
                for (let l = 0; l < prev3Arr.length; l++) {
                  if (prev3Arr[l] === board[n][m].number) {
                    flag = false
                    break A
                  }
                }
              }
              prev3Arr.push(board[n][m].number)
            }
          }
        }
      }
    }
  }
  return flag
}

export const otherErrorChessPieces = (
  board: Checkerboard,
  row: number,
  col: number,
  n: number
) => {
  const result: { row: number; col: number }[] = []
  for (let i = 0; i < board.length; i++) {
    if (board[row][i].number === n) result.push({ row, col: i })
  }
  for (let j = 0; j < board.length; j++) {
    if (board[j][col].number === n) result.push({ row: j, col })
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[row - (row % 3) + i][col - (col % 3) + j].number === n)
        result.push({ row: row - (row % 3) + i, col: col - (col % 3) + j })
    }
  }
  return result
}

export const localStorage_clear = () => {
  localStorage.clear()
  return true
}

export const localStorage_add = (key: TOKEN, value: string) => {
  localStorage.setItem(key, value)
}

export const localStorage_get = (key: TOKEN) => {
  return localStorage.getItem(key)
}

export const localStorage_remove = (key: TOKEN) => {
  localStorage.removeItem(key)
}
