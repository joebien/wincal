import React, { useState, useEffect } from 'react'
import { Grid, TextField, FormControl } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { postNewAppt } from './calSlice'
import { fetchAppts }from './calSlice'




export const AddAptForm = (props) => {

   

    const dispatch = useDispatch()

    const [pickedDate, setpickedDate] = useState(0)
    const [pickedTime, setpickedTime] = useState(0)
    const [hours, sethours] = useState()
    const [apptTxt, setApptTxt] = useState('')
    const [month, setMonth] = useState()
    const [year, setyear] = useState()
   
    const [helpertext, sethelpertext]=useState('')


    const handleChange=(hours)=>{
        sethelpertext('')
        sethours(hours)
        const hour = hours.slice(0,2)
        const minute = hours.slice(3,5)
        const newpickedTime = new Date(pickedDate).setHours(hour, minute)

       
        setpickedTime(newpickedTime)
    }

    const handleTxtChange = e => {
        setApptTxt(e.target.value)
        sethelpertext('')
    }


    useEffect(() => {
        const month = new Date(props.clickedDay).getMonth()
        const year = new Date(props.clickedDay).getYear()
        console.log('month ',month)
        setMonth(month)
        setyear(year)
        setpickedDate( props.clickedDay)
    }, [props.clickedDay])





const saveEntry = () => { 
        if(!props.clickedDay) return (sethelpertext('select a date'))
        if (!pickedTime) return (sethelpertext('pick a time'))
        if (!apptTxt) return (sethelpertext('enter appt info'))
        
        dispatch(postNewAppt(
            {
                time: pickedTime,
                apptTxt: apptTxt,
                date: pickedDate,
                hours: hours,
                year:year,
                month:month
            }
        )) 
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



