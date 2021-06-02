import React, {useEffect, useState }from 'react'
import { Grid } from '@material-ui/core'


import { useSelector, useDispatch } from 'react-redux'

import { AddAptForm } from './AddAptForm.js'


export const DayEvents=({deleteOneAppt, editOneAppt})=>{ 

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
        <AppointmentRow deleteOneAppt={deleteOneAppt, editOneAppt} 
        date={date} 
        id={appt._id} 
        apptTxt={appt.apptTxt}/>
        )
    })

   return(
    <section className='hourstable'>
        Days events
        {apptsL}
    </section> 
   )  
} 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const AppointmentRow = (props) =>{

    const {dateNmbr, timeNmbr, minuteNmbr}=props.date
    const{apptTxt, id, deleteOneAppt, editOneAppt} = props
console.log('');

    return (
       
        <p className='AppointmentRow' > 
            {dateNmbr} * {timeNmbr}:{minuteNmbr} * {apptTxt} 
            <button onClick={()=>deleteOneAppt(id)}>del</button>
            <button onClick={()=>editOneAppt(id)}>edit</button>
        </p>
       
    ) 
}
l

const to12Time = num => {
    let time = `00${num > 12 ? num - 12: num}`.slice(-2)
    time = time < 10 ? time.slice(1) : time
    time = time == 0 ? 12 : time
    return  `${time}${num < 12 ? 'am':'pm'}`
} 





    
    

   







