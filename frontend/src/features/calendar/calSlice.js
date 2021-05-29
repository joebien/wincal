import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'

import axios from 'axios'




const initialState = {

  status: 'idle',
  error: null,
}




export const postNewAppt = createAsyncThunk(
  'cal/postNewAppt', async (initialPost) => {
 
    
 
  const response = await axios.post('/api/appts/', initialPost )
})

export const fetchAppts = createAsyncThunk('cal/fetchAppts', async (date) => {
  
console.log('date ',date)
 
  

  const response = await axios.get('/api/appts/', { params: { date: date } })

    console.log('response ',response)

  return response.data

})



const calSlice = createSlice({
  name: 'appts',
  initialState,
  reducers: {  
    

  },

  extraReducers: {

    [fetchAppts.fulfilled]: (state, action) => { 
    // state.status = 'succeeded'
      // // Add any fetched posts to the array
      console.log('action.payload ',action.payload )
      state.appts = action.payload
    },

    [fetchAppts.pending]: (state, action) => {
      state.status = 'loading'
    },
    
    [fetchAppts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    }
  },
})



export const { postAdded, postUpdated, reactionAdded } = calSlice.actions

export default calSlice.reducer



