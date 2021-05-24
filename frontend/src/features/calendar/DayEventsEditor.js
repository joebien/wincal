import React, {useEffect, useState }from 'react'
import { Grid } from '@material-ui/core'
import { fetchAppts } from './calSlice'

import { useSelector, useDispatch } from 'react-redux'

import { AddAptForm } from './AddAptForm.js'

export const DayEventsEditor=({clickedDay})=>{ 

const dispatch = useDispatch(fetchAppts())


    
    
    useEffect(() => {
       
    
    }, [])

    clickedDay = new Date(clickedDay).valueOf()


 


    console.log('dateObj ',dateObj)

 
   
   return(
   <section className='hourstable'>
    <AddAptForm />
    <button onClick={Click}>click</button>
   </section> 
   )  

} 




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const toTime = num => {
    const time = `00${num > 12 ? num - 12: num}`.slice(-2)
    return  `${time}${num > 12 ? 'am':'pm'}`
} 
    
    

   







