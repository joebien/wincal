import React, {useState }from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Calendar from 'react-calendar';
import { AddAptForm } from './AddAptForm';
import 'react-calendar/dist/Calendar.css';


export const CalendarComp=() => {

  const [clickedDay, setclickedDay] = useState();

  const onClickDay= date=>{ 
    console.log('date ',typeof date.getMonth , date)
    setclickedDay(date)
   
  }
  

 
  return ( 
     <div>
      <Calendar
        tileClassName = {
          ({ date, view }) => { 
            return view === 'month' && date.getDay() === 4 ? 'saturday' : null}
        }
        onClickDay={date=>onClickDay(date)}
      />
    
      <AddAptForm clickedDay={clickedDay}/>

    </div>)
  
  
}