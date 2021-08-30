import React, { useState, useEffect } from 'react'
import { Grid, TextField} from '@material-ui/core'
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from 'react-redux'

import {upDateAppt, deleteAppt}from './calSlice'

import DatePicker from 'react-datepicker';
import moment from 'moment'
    
export const EditAptForm = (props) => {

/* #region  */

    const dispatch = useDispatch()

  
  

/* #endregion  */
const [DPdate, setDPdate] = useState(new Date())
const [DisplayDate, setDisplayDate]=useState()
const [time, settime] = useState('') 
const [txt, settxt] = useState('') 
// const [date, setdate] = useState('') 

const EditApptData = useSelector(state=>state.appts.EditApptData)
const userName = useSelector(state=>state.appts.userName)


useEffect(()=>{

    console.log('DPdate ',DPdate);
    
    console.log('momentDPdate ',moment(DPdate).format('MMM D'))
    setDisplayDate(moment(DPdate).format('MMM D , h:mm a'))
},[DPdate]
)


useEffect(()=>{
  

    if (EditApptData){ 
        settxt(EditApptData.apptTxt) 
        console.log('EditApptData.date ',new Date(EditApptData.date))
        
       
        setDPdate(new Date(EditApptData.date))
        
    }
 },[EditApptData])

















const saveEdit = ()=> {
    dispatch(upDateAppt({
        txt, time, userName, date:EditApptData.date})
        )
}

    return (
          
            <Grid container >
                <Grid container item xs={12} className = 'eventsHead'>
                    {/* <Grid className = 'editDateDisplay' item xs={6}>
                        {DisplayDate}
                    </Grid> */}
                    <Grid item xs={4}>
                        <DatePicker
                            className='datePicker'
                            selected={DPdate}
                            onChange={setDPdate}
                            showTimeSelect
                            name="startDate"
                            dateFormat="MMM dd   yy"
                        />              
                    </Grid>

                    {/* <Grid className = 'editTimeDisplay' item xs={6}>
                        DisplayTime
                    </Grid> */}
                    
                  
                </Grid>
                
                
                
                {/* <Grid className = 'apptTxtItem' name='txt'  item xs={12}>
                    <form >
                        <TextField
                            
                            id="text"
                            label="?"
                            type="text"
                            value = {txt}            
                            InputLabelProps={{
                            shrink: true,
                            }}
                            inputProps={{
                            step: 300, // 5 min
                            }}
                            onChange={(e)=>settxt(e.target.value)}
                        />
                    </form>
                </Grid> */}

                {/* <Grid item xs={12}>
                    <button onClick={saveEdit}>save edit</button>
                </Grid>
                
                <Grid item xs={12}>
                    <button onClick={()=>dispatch(deleteAppt({date:date ,userName:userName}))}>
                        del
                    </button>
                </Grid> */}
                           
            </Grid>
       
    )
}
