import React, { useState, useEffect } from 'react'
import { Grid, TextField, FormControl } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { postNewAppt } from './calSlice'
import { fetchAppts }from './calSlice'

export const Popout = ({loc, datenmbr, month, ShowAddForm, setShowAddForm}) => 
   
<Grid container justify='center' 

   onClick={()=>setShowAddForm(!ShowAddForm)}
   
   style={{
      width: '150px',
      marginLeft: loc.x +'px',
      marginTop: loc.y + 'px',
   }}

   className='popout' 
>
   <Grid item xs={7}className='monthItem'>
      {month}
   </Grid> 
   <Grid item xs={7}className='dateNmbrItem'>
      {datenmbr}
   </Grid> 

   <Grid item xs={12} className='addBtnItem'><button >+</button></Grid>

</Grid>
   
    

