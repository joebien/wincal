import React, { useState, useEffect } from 'react'
import { Grid, TextField, FormControl } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { postNewAppt } from './calSlice'
import { fetchAppts, editAppt, loadEditForm }from './calSlice'


export const EditAptForm = (props) => {

    const dispatch = useDispatch()

    const [hours, sethours] = useState('00:00')
    
    const [apptTxt, setApptTxt] = useState('')

    const [helpertext, sethelpertext]=useState('')

    const appt = useSelector( state => state.appts.editForm ? state.appts.editForm : null )
    
    const saveEditedAppt=()=>{
        const editedAppt = {...appt,...{apptTxt:apptTxt, hours:hours}}
        dispatch(editAppt(editedAppt)) 
    }

   
    const handleTxtChange = e => {
        setApptTxt(e.target.value)
        sethelpertext('')  
    }

    useEffect(() => {
        if (appt){console.log('appt ',appt.apptTxt);
        sethours(appt.hours)
        setApptTxt(appt.apptTxt)
        }
    }, [])

    const handleChange=(hours)=>{
        sethelpertext('')
        sethours(hours)
    }
console.log('hours ',hours);
    return (
        
        <Grid container className=''>
            
            <Grid name='Time Picker' item xs={12}>  

 {/* ////////////////Time Picker ///////////////////////////////*/}
                <TextField 
                    FormHelperTextProps={{className:'helpertext'}}
                    helperText={helpertext}
                    id="time"
                    type="time"
                    value = {hours}
                    className={'textField'}
                    // onChange={(e)=>handleChange(e.target.value)}
                />
      
            </Grid>
            

            <Grid name='apptTxt' item xs={12}>
                <textarea onChange={(e)=>handleTxtChange(e)} value={apptTxt} />
            </Grid>
            

            <Grid name='save appt' item xs={12}>
                <button onClick={()=>saveEditedAppt()}>
                    save new
                </button>
            </Grid>

            <Grid name='close' item xs={12}>
                <button onClick={()=>dispatch(loadEditForm(false))}>
                    close
                </button>
            </Grid>

        </Grid>
    )
}

const to24Time = num => { 
   
    let hr = num.slice(0,2) > 12 ? num.slice(0,2) -12 : num.slice(0,1)
    const min = num.slice(3)!='00' ? ('00'+num.slice(-2)).slice(-2) : '00'
    const meridian = num.slice(0,2) > 11 ? 'pm' : 'am'
  
    return hr+':'+min + meridian
  } 





