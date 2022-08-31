import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface SocketUsertobj {
  value: string
}
interface InitialState {
  userSokectList: SocketUsertobj[]
}

export const initialState: InitialState = {
  userSokectList: [],
}
export const socketClice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    addUserSocket: (socket, action: PayloadAction<SocketUsertobj>) => {
      socket.userSokectList.push(action.payload)
    },
  },
  extraReducers: (builder) => {},
})

export const { addUserSocket } = socketClice.actions
export default socketClice.reducer
