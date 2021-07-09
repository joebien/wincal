import React, {useEffect, useState }from 'react'
import { Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { deleteAppt, editAppt, loadEditForm } from './calSlice'


export const DayEvents=()=>{ 

    let appts = useSelector(state=>state.appts.appts) || []
    
    useEffect(() => {

    }, [appts])
    
    ///////////////////////////////////////////////////////
    const apptsL = appts.map(appt => {
        return ( 
            <AppointmentRow 
                key={appt._id}
                hours={appt.hours}
                _id={appt._id} 
                apptTxt={appt.apptTxt}
                time={appt.time}/>
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
 const dispatch = useDispatch()
const testHandle=()=>{
    return console.log('clicked')
}
const{apptTxt, _id, hours, time } = props
  
return (
    <div className='AppointmentRow' 
    // onClick={()=>console.log('clicked')}
    > 
            
            {to12Time(hours)} * {apptTxt} 
            
            {/* <button onClick={()=>dispatch(deleteAppt(_id))}>del</button> */}

            <button onClick={()=>dispatch(loadEditForm(props))}>
               Edit Appt
            </button>

    </div>
        )
    }


const to12Time = num => { 
   
  let hr = num.slice(0,2) > 12 ? num.slice(0,2) -12 : num.slice(0,2)
      hr = hr[0] === '0' ? hr.slice(1,2) : hr
  
  const min = num.slice(3)!='00' ? ('00'+num.slice(-2)).slice(-2) : '00'
  const meridian = num.slice(0,2) > 11 ? 'pm' : 'am'

  return hr+':'+min + meridian
} 







    
    

   







