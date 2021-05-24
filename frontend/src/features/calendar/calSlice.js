import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'


const initialState = {
  appts: [{date:1616558400000, appts:[
    
    {
      time : 1,
      appt : 'dentist'
    }

  ]}],
  status: 'idle',
  error: null,
}


export const fetchAppts = createAsyncThunk('cal/fetchAppts', async () => {


})

export const postNewAppt = createAsyncThunk('cal/postNewAppt', async (initialPost) => {
  console.log('initialPost ',initialPost)
  const response = await axios.post('/api/postNewAppt', initialPost )

  // return response.msg
})

const calSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
    
  },

  extraReducers: {

    [fetchAppts.fulfilled]: (state, action) => { 
      console.log('state.appts ',state.appts)
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.appts = action.payload
    },

    [fetchAppts.pending]: (state, action) => {
      state.status = 'loading'
    },

    [fetchAppts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.posts = state.posts.concat(action.payload)
    },
    
    [fetchAppts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    }
  },
})



export const { postAdded, postUpdated, reactionAdded } = calSlice.actions

export default calSlice.reducer

export const selectAllPosts = (state) => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId)


