import {  configureStore, createSerializableStateInvariantMiddleware, isPlain} from '@reduxjs/toolkit'

// import postsReducer from '../features/posts/postsSlice'
import msgsReducer from '../features/msgs/msgsSlice'
import usersReducer from '../features/users/usersSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'


export default configureStore({
  reducer: {
    // posts: postsReducer,
    msgs: msgsReducer,

    users: usersReducer,
    notifications: notificationsReducer,
  }
 
})
