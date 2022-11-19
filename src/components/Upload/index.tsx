import { ChangeEvent, ChangeEventHandler, useRef } from 'react'

const Upload = () => {
  const ref = useRef<HTMLInputElement>(null)
  const change = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e)
  }
  return (
    <div>
      <button onClick={() => ref.current?.click()}>上传</button>
      <input hidden type="file" name="" id="" ref={ref} onChange={change} />
    </div>
  )
}

export default Upload
