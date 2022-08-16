import { Route } from '../api/APItype'

type TOKEN = 'token' | 'refreshToken'

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
