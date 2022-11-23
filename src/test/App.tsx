import { FunctionComponent, MouseEventHandler, useReducer } from 'react'

interface APP {}

interface TeV {
  name: string
  id: string
}
interface Action {
  type: string
  payload: TeV
}
const AppTest: FunctionComponent<APP> = () => {
  const change = (steps: TeV[], a: Action) => {
    console.log(steps, a)
    switch (a.type) {
      case 'add':
        return steps.concat(a.payload)
      default:
        break
    }
    return steps
  }
  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(e)

    dispatch({ type: 'add', payload: { name: 'a', id: 'b' } })
  }
  const initial: TeV[] = []
  const [state, dispatch] = useReducer(change, initial)

  return (
    <div>
      <button onClick={(e) => handleAddClick(e)}>点击</button>
      <div>{JSON.stringify(state)} </div>
    </div>
  )
}

export default AppTest
