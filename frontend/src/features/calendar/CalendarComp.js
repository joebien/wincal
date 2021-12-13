import React, {useState, useRef, useEffect }from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from "react-router-dom";
import { NewAptForm } from './NewAptForm';
import { DayEvents } from './DayEvents'; 
import { Grid } from '@material-ui/core'
import {Popout} from './Popout.js'
import Calendar from 'rc-calendar';
import  '../../rc.css'
import '../../cal.css'

import moment from 'moment'

import { setUserName, setshowPopOut, setCurrentDate, setMonthandYear,
  fetchAppts, daysWithAppts, setopenAddAppt  } from './calSlice'

export const CalendarComp=(props, { history }) => {
    
/* #region Imports + State */
    const [clickedDay, setclickedDay] = useState();
    const [datenmbr, setdatenmbr] = useState()
    const [month, setmonth] = useState()
    const [loc,setloc] = useState({x:55,y:55})
    const [ShowAddForm, setShowAddForm] = useState(false)
  
    const[showdayevents, setshowdayevents]=useState(true)

    const[username, setusername]=useState('')
    


    const calComp = useRef(null)
    const dispatch = useDispatch()
    
    const apptsforMonth = useSelector(state => state.appts.apptsforMonth)
    const location = useLocation();
    const showPopOut = useSelector(state=>state.appts.showPopOut)
    
    const openAddAppt = useSelector(state => state.appts.openAddAppt)
    
   
    const { currentMonth, currentYear, userName } = useSelector(state => state.appts)

    /* #endregion */

  /* #region UseEffect*/
  
  
  useEffect(() => {  
   
    dispatch(setUserName(location.state.userName))
  }, [])

  useEffect(()=>{
    dispatch(setMonthandYear(
      {
        month: moment().format('MMM'),
        year: moment().format('YYYY')
      }
    ))
  },[])




  useEffect(()=>{
setTimeout(()=>dispatch(daysWithAppts({
      userName: username,
      month: currentMonth,
      year: currentYear,

    })) , 500)

  },[currentYear])

/* #endregion*/ 


  const onClickDay= (date)=>{ 
    dispatch(setshowPopOut(false))
    dispatch(setopenAddAppt(false))
    dispatch(setCurrentDate(date.format()))
    dispatch(fetchAppts({
      userName: userName,
      datetime: date.format()
    })) 
  
    setTimeout(()=>dispatch(setshowPopOut(true)),100) 
    setshowdayevents(true)
     
  }   
return (

    <div className='calDiv'>
            
            {showPopOut ?  
               <Popout 
                 loc={loc} 
                 month={month} 
                 datenmbr={datenmbr} 
                 ShowAddForm={ShowAddForm}
                 setShowAddForm={setShowAddForm}/>:null} 

      <Grid container   className='gridContainer'
        sx={{ justifyContent: 'center' }}
      >
        <Grid>{userName}'s calendar</Grid>
   
        <Grid name='calItem' item xs={11} 
          ref={calComp} 
          className='calItem' 
          onClick={ // set loc based on mouse loc  turn off showpopout
              e=>{if (e.clientY > 170 && e.clientY < 515) {
              setloc(
                {x:e.clientX - 30, 
                 y:e.clientY -(calComp.current.getBoundingClientRect().top)-25},
              )
              setshowPopOut(false)
            }}
          }
        >

          <Calendar className='wincalendar'
              showToday={false}
              
              onSelect={date=>{onClickDay(date)}
              }

              disabledDate = {date=>month ? date.format("MMM") !== month : false 
              }

              dateRender={(current, value)=>{

                const date = current.toDate().getDate()

                // const timestamp = current.toDate().getTime()

             
            
              
                const cellstyle = apptsforMonth && apptsforMonth.includes(
                  current.format().slice(0,10)) ? 'cellstyle cellstyleflagged' : 'cellstyle' 
            
                return <div className = {cellstyle} >{date}</div>

                }
              }

              onChange = {(date)=>{  
                dispatch(setMonthandYear({
                  month: date.format('MMM'),
                  year: date.format('YYYY')
                }))
                
                setshowPopOut(false)

          }}/>

        </Grid>
        {/* <Grid item xs={3}>{moment(currentDate).format("MMM Do")}</Grid> */}
        <Grid className='NewAptForm' item xs={12} >
            {openAddAppt ?
            <NewAptForm clickedDay={clickedDay}/> : null}
        </Grid>
              
        <Grid className='dayeventsItem' item xs={12}>
            {showdayevents ? <DayEvents/> : null}
        </Grid>
  
      </Grid>
      
    </div>

  )
}
