import React, {useEffect, useState }from 'react'
import { Grid} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { upDateAppt } from './calSlice'
import moment, { relativeTimeRounding } from 'moment';
import Datetime from 'react-datetime';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import '@testing-library/jest-dom'


export const DayEvents=()=>{ 
    let appts = useSelector(state=>state.appts.appts) || []

    const {CurrentDate, userName} = useSelector(state=>state.appts)
    
    const currentDate = useSelector(state=>state.appts.CurrentDate)

    ///////////////////////////////////////////////////////
   const apptsL = appts.map(appt => {

    return ( 
                
                <AppointmentRow                 
                    key={appt.datetime}
                    
                    apptTxt={appt.txt}
                    time={moment(appt.datetime).format('HH:mm')}
                    datetime={moment(appt.datetime).format('ddd')}
                    datetime={appt.datetime}
                    userName={userName}

                />
        )
    }) 

   return(        
            <div className='dayevents'>
                {/* <div className='dayeventsdate'>{moment(currentDate).format("MMM Do")}</div> */}
                
                <div className='appts'>{apptsL}</div>
            </div>   
   )
} 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const AppointmentRow = (props) =>{
    const dispatch = useDispatch()
    const{apptTxt, userName, time, datetime } = props
    const[OpenPopout, setOpenPopout] = useState(false)
    const[DPdate, setDPdate] = useState(new Date())
    const[OrignDate, setOrignDate] = useState()
    const[txt, settxt] = useState('') 
    const[txtrows, settxtrows] = useState(1) 
    const[selected,setselected]=useState()
    const[save, setsave]=useState()
    const[update, setupdate]=useState(false)
    const[spread, setspread]=useState()
    const[multi, setmulti]=useState()

    useEffect(()=>{
            settxt(apptTxt) 
            setDPdate(new Date(datetime)) 
            setOrignDate(datetime)          
    },[])

    useEffect(()=>{
        setfocusheight(txt.split('\n').length * 20 + 'px')
    },[txt])

    const handleSaveEdit = ()=>{console.log('yes')
    
        dispatch(upDateAppt({
            userName, 
            datetime: OrignDate, 
            newdatetime: DPdate,
            txt}))

        setsave(false)
    } 

    const txtChange = e => {
        settxt(e.target.value)
        setsave(true)
        setselected(false)  
    }
   
    const keypress=(e)=> {   console.log('keypress')
    
        if(e.charCode === 13|| e.keyCode === 13)
        settxtrows(txtrows+1)

    }
  
    const [focusheight,setfocusheight]=useState('30px')

    return (
        <ClickAwayListener onClickAway={ ()=>{
            
            settxtrows(1) 
            setupdate(false)
            setspread(false)       
            setselected(false)}
         
            // ()=>setsave(false)
            }>
             
             <div>
               
                <Grid container justifyContent='flex-end' 
                className = {!selected ? 'AppointmentRow' : 'AppointmentRow selected'} 
                onClick={()=>setselected(true)}
             >

                <Grid className='datepickerItem' item xs={3}>    
                    <div className='dateimeWrap'>      
                        <Datetime 
                            value={DPdate}
                            onChange={setDPdate}
                            inputProps = {{
                                placeholder: 'Set Time',
                                className: 'datepickerinput'                              
                            }}
                            dateFormat={false}
                        />   
                    </div>                      
                </Grid> 
 
                <Grid item xs={9} className='apptTxtItem' 
                    onTouchStart={()=>setspread(true)} 
                >
                    <div className='apptTxt'>

                        <textarea 
                                value={txt}
                                onChange={e=>txtChange(e)}
                                // onKeyPress={e=>keypress(e)}
                                // cols="33"
                                className='appttxtarea' 
                                style={{'--focusheight':focusheight}}                                  
                        />                     


                        <div className={spread ? 
                            'apptunder apptunderspread' 
                            : 'apptunder'}
                        /> 
                      
                    </div>                 
                </Grid> 


                <Grid   item xs={2} onClick={handleSaveEdit}>          
                    {save ? 
                    <div className='module-border-wrap'>
                        <button className='module-button'> 
                            save 
                        </button>
                    </div> : 
                        null 
                    }
                </Grid>


            
            </Grid>  
            </div>
       </ClickAwayListener>   
    )   
 }


