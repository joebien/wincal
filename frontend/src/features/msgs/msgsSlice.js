import axios from 'axios'

import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit'


const postsAdapter = createEntityAdapter({  
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})




export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await axios.post('/api/msgs', {text:initialPost} )
  
    return response.msg
  }
)

export const fetchMsgs = createAsyncThunk('msgs/fetchPosts', async () => {
  const response = await axios.get('/api/msgs')
  console.log('response ',response.data)
  return response.data
})


const msgsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.entities[id]
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
  extraReducers: {
    [fetchMsgs.pending]: (state, action) => {console.log('pending ',action)
      state.status = 'loading'
    },
    
    [fetchMsgs.fulfilled]: (state, action) => {
      
      console.log('fulfilled ',action.payload)
      state.status = 'succeeded'
      state.msgs = action.payload
    },

    [fetchMsgs.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
   
  },
})

export const {reactionAdded } = msgsSlice.actions

export default msgsSlice.reducer

