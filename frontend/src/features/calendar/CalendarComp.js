import React, {useState }from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Calendar from 'react-calendar';
import { AddAptForm } from './AddAptForm';
import 'react-calendar/dist/Calendar.css';
import { DayEvents } from './DayEvents'; 
import { fetchAppts }from './calSlice'
// import { Button } from '@material-ui/core'





export const CalendarComp=() => {
  const dispatch = useDispatch()
  const [clickedDay, setclickedDay] = useState();
  const [addform, setaddform] = useState()


  const onClickDay= date=>{   
    setclickedDay(date)
    const res = dispatch(fetchAppts(date))  
  }
   

  return (
    <div>
      
      <Calendar
        tileClassName = {
          ({ date, view }) => { 
            return view === 'month' && date.getDay() === 4 ? 'saturday' : null}
        }
        onClickDay={date=>onClickDay(date.getTime())}
      />

      <div onClick={()=>setaddform(!addform)}>
         { !addform ? <p>ADD +</p>  : <p>CLOSE -</p> }
      </div>
    
    {/* { addform ?  */}
      <AddAptForm clickedDay={clickedDay}/>
    {/* } */}

      <DayEvents/>

    </div>)
  
  
}