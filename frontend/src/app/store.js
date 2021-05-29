import {  configureStore, createSerializableStateInvariantMiddleware, isPlain} from '@reduxjs/toolkit'

// import postsReducer from '../features/posts/postsSlice'
import msgsReducer from '../features/msgs/msgsSlice'
import usersReducer from '../features/users/usersSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'

import calReducer from '../features/calendar/calSlice'


export default configureStore({
  reducer: {
    appts:calReducer,
    msgs: msgsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  }
 
})

