import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const initialState = {
  status: 'idle',
  error: null,
}

export const daysWithAppts = createAsyncThunk('cal/daysWithAppts', 
  async () => { 

    const month = new Date().getMonth()
    const year = new Date().getYear()

    const response = await axios.get('/api/appts/', 


      { params: { month : month, year: year} }
    )


  return response.data
})

export const fetchAppts = createAsyncThunk('cal/fetchAppts', 
  async (date) => { 
    const response = await axios.get('/api/appts/', 
      { params: { date: date } }
    )
 
  return response.data
})

export const deleteAppt = createAsyncThunk('cal/deleteAppt', 
async (itemId) => {
 

    const response = await axios.delete('api/delappt', { params: { _id: itemId } })
  

  
    return response.data
  
  })

/////////////////////////////////////////////////////////////////
export const editAppt = createAsyncThunk(
  'cal/editAppt', 

  async (appt)=>{
    const response = await axios.put('/api/appts/', appt)
    console.log('response',response.data);
    return response.data
  })

////////////////////////////////////////////////////////////////////////

  export const postNewAppt = createAsyncThunk( 
    'cal/postNewAppt', 
    async (initialPost) => { console.log('initialPost ',initialPost);
    const response = await axios.post('/api/appts/', initialPost )
   
    return response.data
  })

////////////////////////////////////////////////////////////////////////////////

const calSlice = createSlice({
  name: 'appts',
  initialState,

  reducers: {  
    loadEditForm(state, action) {
      state.loadEditForm =  action.payload ? true : false
      state.editForm = action.payload 
    }
  },

  extraReducers: {

    [daysWithAppts.fulfilled]:(state, action)=>{
      state.apptsforMonth = action.payload.map(appt=>appt.date)
    },

    [editAppt.fulfilled]:(state, action)=>{ 
      let appts = state.appts
      let targetIndex = appts.findIndex(appt=>appt._id === action.payload._id)
      appts[targetIndex] = action.payload
      state.appts = appts
    },

    [postNewAppt.fulfilled]:(state, action) => {
      
      state.appts = state.appts.concat(action.payload)
      console.log('action.payload ',action.payload.date);
      state.apptsforMonth.push(action.payload.date)
    },

    [deleteAppt.fulfilled]:(state, action) => {
      state.appts = state.appts.filter(appt=>appt._id !== action.meta.arg)
    },
   

    [fetchAppts.fulfilled]: (state, action) => { 
    // state.status = 'succeeded'
      // // Add any fetched posts to the array
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



export const { postAdded, postUpdated, reactionAdded, loadEditForm } = calSlice.actions

export default calSlice.reducer



