import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { DayEvents } from './DayEvents'
import moment from 'moment'

const initialState = {
  status: 'idle',
  error: null,
}

export const createUserAppts = createAsyncThunk(
  'cal/createUserAppts',
  async (initialPost) => { console.log('response.data ')
   
    
    const response = await axios.post('/api/appts/', {userName:initialPost})

    console.log('response.data ', response.data.userName)

    return response.data
  }
)

export const postNewAppt = createAsyncThunk(

  'cal/postNewAppt', 
  async (apptObj) => {   
  const response = await axios.post('/api/appts/newAppt', 
  apptObj)


  
    
  return apptObj
  }
)

export const deleteAppt = createAsyncThunk(
  'cal/deleteAppt', 
  
  async (q)=>{ 

    const response = await axios.delete('api/delappt', 
      { params: { date: q.date, userName: q.userName } })
  
    return response.data
  }
)

/////////////////////////////////////////////////////////////////
export const editAppt = createAsyncThunk(
  'cal/editAppt', 

  async (appt)=>{
    const response = await axios.put('/api/appts/', appt)
    return response.data
})

////////////////////////////////////////////////////////////////////////
export const fetchAppts = createAsyncThunk('cal/fetchAppts', 
  async (q) => { 

    console.log('fetchappThunk  ',q)

    const response = await axios.get('/api/appts/', 
      { params: {
        userName: q.userName,
        datetime: q.datetime
      }}
    )

  return response.data
  })


export const daysWithAppts = createAsyncThunk( 
  'cal/daysWithAppts', 
  async (monthApptsQuery) => {
    
    const response = await axios.get('/api/appts/dayswappts', { params: 
      { 
        userName: monthApptsQuery.userName, 
        month: monthApptsQuery.month, 
        year: monthApptsQuery.year
      }
    })
   

    return response.data
})



export const upDateAppt = createAsyncThunk( 
  'cal/upDateAppt',
  async (ApptQuery) => {  
    console.log('ApptQuery ', ApptQuery)

    const response = await axios.put('/api/appts/updateAppt',
      ApptQuery
    )

   return 'response.data'

  }

)

////////////////////////////////////////////////////////////////////////////////

const calSlice = createSlice({
  name: 'appts',
  initialState,
 
  reducers: { 
   
    setCurrentDate(state,action){
      state.CurrentDate = action.payload
    },
    setMonthandYear(state,action){  
      state.currentMonth =  action.payload.month
      state.currentYear = action.payload.year
    }, 
    
    loadEditForm(state, action) {
      state.EditApptData = action.payload
    },

    setUserName(state, action){
      state.userName =  action.payload
    },
    setshowPopOut(state, action){
      state.showPopOut =  action.payload
    },
    setopenAddAppt(state, action){
      state.openAddAppt = action.payload
    }
   
  },

  extraReducers: {

    [postNewAppt.fulfilled]:(state, action) => {
    
      state.openAddAppt = false
    },


    [daysWithAppts.fulfilled]:(state, action)=>{ 
    // console.log('daysWithAppts.action.payload ',action.payload)
      state.apptsforMonth=action.payload.map(
        appt=>appt.datetime.slice(0,10))
    },


    [editAppt.fulfilled]:(state, action)=>{ 
      let appts = state.appts
      let targetIndex = appts.findIndex(appt=>appt._id === action.payload._id)
      appts[targetIndex] = action.payload
      state.appts = appts
    },

    [deleteAppt.fulfilled]:(state, action) => {
      state.appts = state.appts.filter(appt=>appt._id !== action.meta.arg)
    },
   

    [fetchAppts.fulfilled]: (state, action) => { 
      
    //Add any fetched posts to the array
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


export default calSlice.reducer

export const {setEditApptData, setCurrentDate, setopenAddAppt, loadEditForm, setUserName, setMonthandYear, setshowPopOut} = calSlice.actions





