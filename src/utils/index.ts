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

export const checkBoard = (board: Checkerboard) => {
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
  while (countArr.includes(currentNumber)) {
    currentNumber = fn()
  }
  return currentNumber
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
