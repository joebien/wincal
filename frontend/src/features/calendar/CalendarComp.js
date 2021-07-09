import React, {useState, useRef, useEffect }from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AddAptForm } from './AddAptForm';
import { EditAptForm } from './EditAptForm';

import { DayEvents } from './DayEvents'; 
import { fetchAppts, deleteAppt, daysWithAppts }from './calSlice'
import { Grid } from '@material-ui/core'

import {} from './calSlice'
import {Popout} from './Popout.js'

import Calendar from 'rc-calendar';

import  '../../rc.css'
import '../../cal.css'

export const CalendarComp=(props) => {

  const calComp = useRef(null)
  const dispatch = useDispatch()
  const [clickedDay, setclickedDay] = useState();
  const [addform, setaddform] = useState()
  const [datenmbr, setdatenmbr] = useState()
  const [month, setmonth] = useState()
  const [loc,setloc] = useState({x:55,y:55})
  const [showpopout, setshowpopout] = useState(false)
  const [showdayevents, setshowdayevents] = useState(false)
  const [ShowAddForm, setShowAddForm] = useState(false)
  const [MonthAppts,setMonthAppts]=useState('DWA')
  const appts = useSelector(state=>state.appts.appts) || []
  const apptsforMonth = useSelector(state => state.appts.apptsforMonth)

  useEffect(() => {  
    dispatch(daysWithAppts())  
  }, [])

  useEffect(() => {   
    setMonthAppts(apptsforMonth) 
  }, [apptsforMonth])


  const onClickDay= (date)=>{
    //set state from date * fetch appointments load Popout * kill show addform  
        if(date){ console.log('date ', date)
          const timeStamp = date.clone().startOf('day').toDate().getTime()
          setclickedDay(timeStamp)
          setdatenmbr(date._d.getDate())
          setmonth(date.format('MMM'))
    
          const res = dispatch(fetchAppts(timeStamp))  
    
          setTimeout(()=>setshowpopout(true),1)
          setShowAddForm(false)
        }  
      }
    
      const deleteOneAppt = async (id)=> {
        await dispatch(deleteAppt(id)
        ).then(dispatch(fetchAppts(clickedDay)))
      }
      
 
  const loadEditForm = useSelector((state) => state.appts.loadEditForm)

  return (
    <Grid container  justify="center" className='gridContainer'>
      
      <Grid name='Popout' item xs={12} className='popoutitem'>
        {showpopout ?  
          <Popout 
            loc={loc} 
            month={month} 
            datenmbr={datenmbr} 
            ShowAddForm={ShowAddForm}
            setShowAddForm={setShowAddForm}/>:null}
      </Grid>

      <Grid name='Calendar' item xs={12} ref={calComp} className='calItem' 

        onClick={ // set loc based on mouse loc  turn off showpopout
          e=>{if (e.clientY > 170 && e.clientY < 315) {
          setloc(
            {x:e.clientX - 40, 
             y:e.clientY -(calComp.current.getBoundingClientRect().top)-40},
          )
          setshowpopout(false)
        }}
      }
      >
        <Calendar    
          onSelect={date=>onClickDay(date)}
          disabledDate = {date=>month ? date.format("MMM") !== month : false 
          }

          dateRender={(current, value)=>{
            
            const date = current.toDate().getDate()

            //console.log('setMonthAppts ',MonthAppts)



            const timestamp = current.toDate().getTime()
           
            const cellStyle = `cell ${date === 3 ? 'apptAlert' : ''}`

            let dayStamp 
            if(date){  
              dayStamp = current.clone().startOf('day').toDate().getTime().toString()
              //console.log('dayStamp ',dayStamp, typeof dayStamp);
              }     
           

            const cellstyle = MonthAppts && MonthAppts.includes(dayStamp) ? 'cellstyleflagged' : 'cellstyle' 
        
            return <div className = {cellstyle} >{date}</div>

            }
          }

        />
       

      </Grid>

      <Grid name='AddAptForm'item xs={11} >
        {ShowAddForm ?
        <AddAptForm clickedDay={clickedDay}/> : null}
      </Grid>
    
      <Grid name='DayEvents' item xs={11}>
        {appts.length > 0 ? 
        <DayEvents deleteOneAppt={deleteOneAppt}/> : null}
      </Grid>

      <Grid name='EditAptForm' item xs={11} >
       {loadEditForm ? <EditAptForm/>: null}
      </Grid>

    </Grid>
  )
}