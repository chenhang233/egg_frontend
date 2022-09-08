import { Route } from '../api/APItype'
import { Checkerboard } from '../pages/Index/pages/Wisdom/Sudoku'
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
  console.log(board, 'board')

  for (let i = 0; i < col; i++) {
    if (board[row][i].number === n) return false
  }
  for (let j = 0; j < row; j++) {
    if (board[j][col].number === n) return false
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[row - (row % 3) + i][col - (col % 3) + j].number === n)
        return false
    }
  }
  return true
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
    return Math.max(Math.floor(Math.random() * end + 1), start)
  }
  let currentNumber = fn()
  let index = 0
  while (countArr.includes(currentNumber) && index < end - start + 2) {
    currentNumber = fn()
    index++
  }
  return currentNumber
}

export const InsertRandomNumberToPosition = (board: Checkerboard) => {
  const randomPositionArr: number[] = [9, 19, 29, 39, 49, 59, 69, 79]
  for (let index = 1; index <= 20; index++) {
    let random = numberNoRepeatRandom(1, 9, [])
    let randomPosition = numberNoRepeatRandom(0, 88, randomPositionArr)
    randomPositionArr.push(randomPosition)
    let str =
      String(randomPosition).length === 1
        ? '0' + String(randomPosition)
        : String(randomPosition)
    const [top, left] = str.split('')
    while (!isSafe(board, Number(top), Number(left), random)) {
      random = numberNoRepeatRandom(1, 9, [])
    }
    board[Number(top)][Number(left)].number = random
    board[Number(top)][Number(left)].type = 'system'
  }
}

export const generateBoard = () => {
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
  InsertRandomNumberToPosition(checkerboard)
  return checkerboard
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
