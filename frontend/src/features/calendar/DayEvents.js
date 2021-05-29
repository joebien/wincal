import React, {useEffect, useState }from 'react'
import { Grid } from '@material-ui/core'


import { useSelector, useDispatch } from 'react-redux'

import { AddAptForm } from './AddAptForm.js'




export const DayEvents=(props)=>{ 
    
 

const[apptsS,setapptsS]=useState()

let appts = useSelector(state=>state.appts.appts) || []



///////////////////////////////////////////////////////
    const apptsL = appts.map(appt => {

    const dateNmbr = new Date(Number(appt.date)).getDate()
    const timeNmbr = new Date(Number(appt.time)).getHours()
    const minuteNmbr = new Date(Number(appt.time)).getMinutes()

    const date = {

        dateNmbr : new Date(Number(appt.date)).getDate(),
        timeNmbr : new Date(Number(appt.time)).getHours(),
        minuteNmbr : new Date(Number(appt.time)).getMinutes()

    }

    

   
    return ( 
        // <AppointmentRow dateNmbr={dateNmbr} timeNmbr ={timeNmbr} minuteNmbr = {minuteNmbr} apptTxt={appt.apptTxt}/>
        <AppointmentRow {...date} apptTxt={appt.apptTxt}/>

        )
    
    })
     


useEffect(() => {

    setapptsS(apptsL)
  

}, [])
 

   return(
    <section className='hourstable'>
        Days events

        {apptsL}

    </section> 
   )  
} 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const AppointmentRow = ({dateNmbr, timeNmbr, minuteNmbr, apptTxt}) =>{

    const dispatch = useDispatch()
   
const deleteAppt = ()=>{
    dispatch(deleteAppt())
}
    return (
        <section> 
                <p> {dateNmbr} * {timeNmbr}:{minuteNmbr} * {apptTxt} * <button onClick={deleteAppt}>del</button></p>
        </section>
      
    ) 
}

const to12Time = num => {
    let time = `00${num > 12 ? num - 12: num}`.slice(-2)
    time = time < 10 ? time.slice(1) : time
    time = time == 0 ? 12 : time
    return  `${time}${num < 12 ? 'am':'pm'}`
} 

    
    

   







