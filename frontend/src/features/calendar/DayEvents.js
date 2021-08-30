import React, {useEffect, useState }from 'react'
import { Grid, TextField } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { deleteAppt, upDateAppt } from './calSlice'
import moment, { relativeTimeRounding } from 'moment';
import DatePicker from 'react-datepicker';
import Datetime from 'react-datetime';
export const DayEvents=()=>{ 
    let appts = useSelector(state=>state.appts.appts) || []

    const {CurrentDate, userName} = useSelector(state=>state.appts)

  
   console.log('appts',appts);
   
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
        <div classname='dayevents'>
            dayevents ø {moment(CurrentDate).format('MMM D')}      
            {apptsL}
        </div> 
   )} 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const AppointmentRow = (props) =>{
    const dispatch = useDispatch()
    const{apptTxt, userName, time, datetime } = props
    const[OpenPopout, setOpenPopout] = useState(false)
    const [DPdate, setDPdate] = useState(new Date())
    const EditApptData = useSelector(state=>state.appts.EditApptData)
    const [txt, settxt] = useState('') 
    const [loadSaveBtn, setloadSaveBtn] = useState()

    useEffect(()=>{
    
      

            settxt(apptTxt) 
        
            setDPdate(new Date(datetime))

          
    },[])

    const handleOnChange = (date)=>{
        console.log('handledate ',date)
        setDPdate(date)
        setloadSaveBtn(true)
    }

    const handleSaveEdit = ()=>{

        dispatch(upDateAppt({userName, }))

    }

    return (
             <Grid container className = 'AppointmentRow'>
                    
                <Grid className='datepickerItem' item xs={3}>          
                        <Datetime 
                            value={DPdate}
                            onChange={setDPdate}
                            inputProps = {{
                                placeholder: 'Enter Time',
                                className: 'datepickerinput'
                               
                               
                            
                            }}
                            dateFormat={false}
                        />             
                        
                </Grid> 

                <Grid className = 'apptTxtItem' item xs={9} >
                    
                        <TextField variant="filled"
                        className='txtField'
                            inputProps={{style: 
                                {
                                    
                                fontSize: '1em',
                                border: 'none !important',
                                padding: '0px 0',
                                
                               
                                
                              
                            }
                            }}
                        value = {apptTxt}
                        fullWidth
                       
                        />

                </Grid>
                      
            </Grid>     
    )   
 }

const ApptPopout = (props)=>{
    return(
       <div className='apptpopout'>{props.children}</div>
    )
}
