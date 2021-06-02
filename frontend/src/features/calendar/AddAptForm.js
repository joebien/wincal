import React, { useState, useEffect } from 'react'
import { Grid, TextField, FormControl } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { postNewAppt } from './calSlice'
import { fetchAppts }from './calSlice'




export const AddAptForm = (props) => {

    const dispatch = useDispatch()

   
    // pickedDate.setHours(0,0,0)
    // console.log('pickedDate2 ',pickedDate)

    const [pickedDate, setpickedDate] = useState(0)
    const [pickedTime, setpickedTime] = useState()
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [apptTxt, setApptTxt] = useState('')
    const [time, settime] = useState()
    const [helpertext, sethelpertext]=useState('')

    const appts = useSelector(state => state.appts.appts)

    console.log('pickedDate ',pickedDate) 


    const handleChange=(hours)=>{
        sethelpertext('')

        const hour = hours.slice(0,2)
        const minute = hours.slice(3,5)

        setpickedTime(new Date(pickedDate).setHours(hour, minute)
            )

    }

    const handleTxtChange = e => {
        setApptTxt(e.target.value)
        sethelpertext('')
    }

    useEffect(() => {

        setpickedDate( new Date(props.clickedDay).getTime() )

    }, [props.clickedDay])

/////////////////////////////////////////////////////////////////////////////////
    

const saveEntry = async () => { 
      
    //    if (!pickedTime) sethelpertext('pick a time')
    //    if (!apptTxt) sethelpertext('enter appt info')
    
        await dispatch(postNewAppt(
            {
                time: pickedTime,
                apptTxt: apptTxt,
                date: pickedDate
            }
        )).then(dispatch(fetchAppts(pickedDate)))
        
    }
 

    return (
        //    appts && appts.length > 0 ? 
        <Grid container style={{ border: 'pink solid 1px' }}>

        <Grid name='details' item xs={12}>  
       
            <TextField 
                FormHelperTextProps={{className:'helpertext'}}
                helperText={helpertext}
                id="time"
                type="time"
                // defaultValue="07:30"
                className={'textField'}
                onChange={(e)=>handleChange(e.target.value)}
            />
       
            
        
            </Grid>

        <Grid name='details' item xs={12}>
            <textarea onChange={(e)=>handleTxtChange(e)} value={apptTxt} />
        </Grid>
        <Grid name='save appt' item xs={12} onClick={saveEntry}>Save Entry</Grid>
        </Grid>
    )
}



