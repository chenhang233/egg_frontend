import { Route } from '../api/APItype'

export type TransformRoute = {
  routerName: string
  icon: string | null
  routerSrc: string | null
  auth: boolean
  children: ChildrenRoute[]
}
type TOKEN = 'token' | 'refreshToken'

type ChildrenRoute = keyof TransformRoute

export const transformRouter = (
  routes: Route[],
  result: TransformRoute[] = []
) => {
  // const route = routes[0]
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
