import { Route } from '../api/APItype'

export type TransformRoute = {
  routerName: string
  icon: string | null
  routerSrc: string | null
  auth: boolean
  children: ChildrenRoute[]
}

type ChildrenRoute = keyof TransformRoute

export const transformRouter = (
  routes: Route[],
  result: TransformRoute[] = []
) => {
  const route = routes[0]
}
