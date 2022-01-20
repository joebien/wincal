import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

import axios from 'axios'
import ls from 'local-storage'

const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState()

export const signInUser = createAsyncThunk( 
  'users/signInUser', 
  async (initialPost) => { 
    
  const response = await axios.get('/api/users/signin',
    {params:initialPost}
  )
  return response.data
  
})


export const createNewUser = createAsyncThunk( 
  'users/createNewUser', 
  async (initialPost) => { 
    
    console.log('createNewUser ')

  const response = await axios.post('/api/users/ ',initialPost)
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: {
    [createNewUser.fulfilled]:(state, action)=>{ 
      localStorage.setItem('user', JSON.stringify({userName:'michy'}) )
    },
    [signInUser.fulfilled]:(state, action)=>{ console.log('fulfilled',);
    
      state.isaUser = action.payload
    }

}

})

export default usersSlice.reducer

export const { } = usersSlice.actions