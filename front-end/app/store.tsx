import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {}
})
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch