/* eslint-disable  */
// @ts-nocheck

// import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialStateProps = {
  chat: {
    id: string
    message: string
    createdAt: Date
    senderid: string | null
    recieverId: string | null
  }[]
}

const InitialState: InitialStateProps = {
  chat: [],
}

export const onChats = createSlice({
  name: 'chats',
  initialState: InitialState,
  reducers: {
    onChat: (state, action: PayloadAction<InitialStateProps>) => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const messages = state.chat.find((data: any) =>
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        action.payload.chat.find((payload: any) => data.id === payload.id),
      )

      if (!messages) state.chat = [...state.chat, ...action.payload.chat]
    },
  },
})

export const { onChat } = onChats.actions
export default onChats.reducer
