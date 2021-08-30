import React, { useState, useEffect } from 'react'
import { Grid, TextField, FormControl } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { postNewAppt, daysWithAppts} from './calSlice'
import { fetchAppts }from './calSlice'
import { setUserName } from './calSlice'
import moment from 'moment'

import Datetime from 'react-datetime';

import "../../mydatetime.css";

export const AddAptForm = () => {

    /* #region STATE useEffect etc */
   
    const dispatch = useDispatch()

    

    const userName = useSelector(state => state.appts.userName)


    const CurrentDate = useSelector( state => state.appts.CurrentDate)
    const [datetime, setdatetime] = useState(moment())
    const [year, setyear] = useState()  
    const [month, setmonth] = useState() 
    const [dateNmbr, setdateNmbr] = useState() 
    const [txt, settxt] = useState('Appt Text')
    const [time, settime]=useState('')
    const [helpertext, sethelpertext]=useState('')
    const rawCurrentDate = useSelector( state => state.appts.CurrentDate)

    useEffect(() => {
      
        setyear(moment(rawCurrentDate).format('Y'))
        setmonth(moment(rawCurrentDate).format('MMM'))
        settime(moment(datetime).format('LT'))
        
        setdatetime(moment(rawCurrentDate))

        setdateNmbr(moment(rawCurrentDate).format('D'))
  
    }, [rawCurrentDate])
    
 /* #endregion */

    const handleTxtChange = e => {
        settxt(e.target.value)
        sethelpertext('')
    }

    const saveEntry = () => { 

        const postAppt = async ()=>{

            await dispatch(postNewAppt(
                {   userName,
                    datetime, 
                    year,
                    month,
                    txt                     
                }
            ))
        return('query0')
        } 
  
        postAppt().then(()=>dispatch(daysWithAppts(
            {
                userName,
                year,
                month,
            }
        )))
    }

    const handle_datetimeChange =()=>{
        console.log('handle_datetimeChange')
        
    }

    const onTimeChange =(e)=>{

        const reset = moment(datetime).hour(0).minute(0).format()
        const hour = moment(e).format('HH')
        const minute = moment(e).format('mm')
        
        setdatetime(moment(reset).hour(hour).minute(minute).format())
       
    } 
       
    return (
        //    appts && appts.length > 0 ? 
        <Grid container style={{ border: 'pink solid 3px' }}>
            
            <Grid name='name' item xs={12}>
                {month} {dateNmbr} {year} 
                
                
            </Grid>
           
            <Grid name='timepicker' item xs={6}>  
                <Datetime 
                    
                    onChange={onTimeChange}
                    inputProps = {{
                    placeholder: 'Enter Time'}}
                dateFormat={false} />
            </Grid>

            <Grid name='details' item xs={12}>
                <textarea onChange={(e)=>handleTxtChange(e)} value={txt} />
            </Grid>

            <Grid name='save appt' item xs={12} onClick={saveEntry}>Save Entry</Grid>
        
        </Grid>
    )
}



