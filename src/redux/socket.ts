import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface SocketUsertobj {
  value: string
}
export interface ListDataRequest {
  nickname: string
  avatar: string
  content: string
  datetime: number
  type: 'me' | 'other'
}
interface InitialState {
  userSokectList: SocketUsertobj[]
  tempForumList: ListDataRequest[]
}

export const initialState: InitialState = {
  userSokectList: [],
  tempForumList: [],
}
export const socketClice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    addUserSocket: (socket, action: PayloadAction<SocketUsertobj>) => {
      socket.userSokectList.push(action.payload)
    },
    addForumListData: (socket, action: PayloadAction<ListDataRequest>) => {
      socket.tempForumList.push(action.payload)
    },
  },
  extraReducers: (builder) => {},
})

export const { addUserSocket, addForumListData } = socketClice.actions
export default socketClice.reducer
