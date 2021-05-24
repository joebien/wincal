import React, {useState, useEffect}from 'react'
import { Grid } from '@material-ui/core'
import { useSelector, useDispatch  } from 'react-redux'
import {postNewAppt} from './calSlice'




export const AddAptForm=(props)=>{ 



    useEffect(() => {
        // pickedDay.setHours( 0,0,0 )
    
    }, [])

    // pickedDay.setHours(0,0,0)

    // console.log('pickedDay2 ',pickedDay)

   
 
    const[hour, setHour] = useState(0)
    const[minute, setMinute] = useState(0)
    const[apptTxt, setApptTxt] = useState('the appointment text')
    const dispatch = useDispatch()
    const days = useSelector(state=>state)


    const pickedDay = new Date (props.clickedDay)
    pickedDay.setHours(hour ,minute)
   
console.log('pickedDay ',pickedDay)


    const saveEntry = async()=>{ console.log('save entry fired ')
    
    //Make picked day timestamp
        dispatch(postNewAppt(
            
           {
                time: pickedDay.getTime(),
                apptTxt: apptTxt

            }
            
            ))
      
    }

    const testTime = new Date()
    // console.log('testTime ',testTime)
    testTime.setHours( hour,minute,0,0 )
    // console.log('testTime2 ',testTime)

    return(
    <Grid container style={{border: 'pink solid 1px'}}>
        <Grid name='time' item xs={3}> <SelectHour hour={hour} setHour={setHour}/> </Grid> 
        <Grid name='time' item xs={3}> <SelectMinute minute={minute} setMinute={setMinute}/> </Grid> 
        <Grid name='details' item xs={6}>
            <textarea onChange={e=>setApptTxt(e.target.value)} value={apptTxt}/>
        </Grid>
        <Grid name='save appt' item xs={12} onClick={saveEntry}>Save Entry</Grid>
    </Grid>
    )
}



const SelectHour=({hour,setHour})=>{
    const onHourChange=e=>setHour((e.target.value))
  
    
    const hours=[]
    for(let h=1;h<25;h++){
        hours.push( <option key={h} value={h}>{h}</option>)
    }

    return(
        <form style={{border:'solid'}}>
            <select id="postAuthor" value={hour} onChange={onHourChange}>
                <option value=""></option>
                {hours}
            </select>   
        </form>
    )
}

const SelectMinute=({minute, setMinute})=>{

    const onMinuteChange=e=>setMinute((e.target.value))

    const minutes=[]
    for(let h=0;h<46;h+=15){
        minutes.push( <option key={h} value={h}>{h}</option>)
    }

    return(
        <form style={{border:'solid'}}>
            <select id="postAuthor" value={minute} onChange={onMinuteChange}>
                <option value=""></option>
                {minutes}
            </select>   
        </form>
    )
}
