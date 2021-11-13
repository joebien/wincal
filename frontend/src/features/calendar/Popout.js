import React, { useState, useEffect } from 'react'
import { Grid, TextField, FormControl } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { postNewAppt } from './calSlice'
import { fetchAppts, setshowPopOut, setopenAddAppt }from './calSlice'
import moment from 'moment'

export const Popout = ({loc, datenmbr, month, ShowAddForm, setShowAddForm}) => {  

   const dispatch = useDispatch()

   const currentDate = useSelector(state=>state.appts.CurrentDate)

const dateNmbr = moment(currentDate).format('D')

   return(
   
   <Grid className='popout' container justify='center' 
      style={{
      width: '140px',
      marginLeft: loc.x -14 + 'px',
      marginTop: loc.y + 42 + 'px',
      }}
      onClick={()=> dispatch(setopenAddAppt(true))}
      >


         <Grid  item xs={12} className='addBtnItem'>
            <button className='btn1'>+</button>
         </Grid>


         <Grid item xs={10}className='dateNmbrItem' 
            onClick={()=>dispatch(setshowPopOut(false))}>
            {dateNmbr}
         </Grid> 

   </Grid>
      )
   }

 

