import React, {useState, useRef, useEffect }from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from "react-router-dom";
import { AddAptForm } from './AddAptForm';
import { EditAptForm } from './EditAptForm';
import { EditApptForm } from './editApptForm';
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
    const [MonthAppts, setMonthAppts]=useState('DWA')
    const [uName, setUname]=useState() 
    


    const calComp = useRef(null)
    const dispatch = useDispatch()
    const appts = useSelector(state=>state.appts.appts) || []
    const apptsforMonth = useSelector(state => state.appts.apptsforMonth)
    const location = useLocation();
    const showPopOut = useSelector(state=>state.appts.showPopOut)
    const loadEditForm = useSelector((state) => state.appts.loadEditForm)
    const openAddAppt = useSelector(state => state.appts.openAddAppt)
    const opendayEvents = useSelector(state => state.appts.dayEvents)

    const currentDate = useSelector(state=>state.appts.CurrentDate)

    const { currentMonth, currentYear, userName } = useSelector(state => state.appts)

    /* #endregion */

  /* #region UseEffect*/  
  useEffect(() => {  
    dispatch(setUserName(location.state.userName))
  }, [])

  
// console.log('moment().format(MMM) ',moment().format('MMM'))


  useEffect(()=>{
    dispatch(setMonthandYear(
      {
        month: moment().format('MMM'),
        year: moment().format('YYYY')
      }
    ))
  },[])

  useEffect(()=>{

    dispatch(daysWithAppts({
      userName: userName,
      month: currentMonth,
      year: currentYear,

    }))
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

      <Grid container  justifyContent="center"  className='gridContainer'>
   

   
        <Grid name='calItem' item xs={12} 
          ref={calComp} 
          className='calItem' 
          onClick={ // set loc based on mouse loc  turn off showpopout
              e=>{if (e.clientY > 170 && e.clientY < 315) {
              setloc(
                {x:e.clientX - 40, 
                y:e.clientY -(calComp.current.getBoundingClientRect().top)-40},
              )
              setshowPopOut(false)
            }}
          }
        >



            <Calendar    className='wincalendar'
              showToday={false}
              onSelect={date=>onClickDay(date)}
              disabledDate = {date=>month ? date.format("MMM") !== month : false 
              }

              dateRender={(current, value)=>{

                // console.log('current' ,current.format())

                // console.log('apptsforMonth ',apptsforMonth);
                
              
                
                const date = current.toDate().getDate()

                const timestamp = current.toDate().getTime()
              
                const cellstyle = apptsforMonth && apptsforMonth.includes(current.format('D')) ? 'cellstyle cellstyleflagged' : 'cellstyle' 
            
                return <div className = {cellstyle} >{date}</div>

                }
              }

              onChange = {(date)=>{ 
              
                
                dispatch(setMonthandYear({
                  month: date.format('MMM'),
                  year: date.format('YYYY')
                }))
                
                setshowPopOut(false)

              }}
            />

        </Grid>

        <Grid name='AddAptForm'item xs={11} >
            {openAddAppt ?
            <AddAptForm clickedDay={clickedDay}/> : null}
        </Grid>
        
         
        <Grid className='dayevents' item xs={12}>
           
            <DayEvents/> 
           
        </Grid>

      
      
      </Grid>

    </div>

  )
}
