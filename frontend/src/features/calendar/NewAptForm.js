import React, { useState, useEffect } from 'react'
import { Grid, TextField, FormControl } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux'
import { postNewAppt, daysWithAppts} from './calSlice'
import { fetchAppts }from './calSlice'
import { setUserName } from './calSlice'
import moment from 'moment'

import Datetime from 'react-datetime';

import "../../mydatetime.css";

import timeleft from './passage-time.jpg';
import stripes from '../../img/gunz.jpg'

import {EssayForm} from './TextareaComp.js'

export const NewAptForm = () => {

    /* #region STATE useEffect etc */
   
    const dispatch = useDispatch()   
    const userName = useSelector(state => state.appts.userName)
    const rawCurrentDate = useSelector( state => state.appts.CurrentDate)
    
    const [year, setyear] = useState() 
    const [month, setmonth] = useState()  
    const [datetime, setdatetime] = useState()    
    const [dateNmbr, setdateNmbr] = useState() 
    const [txt, settxt] = useState('')
    
    const [spread, setspread]=useState()
    const [txthelper, settxthelper]=useState('New Appointment')
    const [timehelper, settimehelper]=useState('')
    const [scale, setscale]=useState(false)
    const [graphic, setgraphic]=useState(true)

    useEffect(()=>{

        
            setyear(moment(rawCurrentDate).format('YY'))
            setmonth(moment(rawCurrentDate).format('MMM'))
            setdateNmbr(moment(rawCurrentDate).format('DD'))
        

    },[])
    
    useEffect(() => {

       
      
        setTimeout(()=>setspread(true),500)
  
    }, [rawCurrentDate])
    
 /* #endregion */
  

    const saveEntry = () => { 
        
       if(txt.length < 3 ) {
            settxthelper('enter some text')
            console.log('txthelper ',txthelper);
            return 'no txt'
        }

        if(!datetime){
            settimehelper('set a time')
            setscale(true)

            return}
        
           dispatch(postNewAppt(
                {   userName,  
                    datetime:moment(datetime).format(), 
                    year,
                    month,
                    txt                     
                }
            ))
            setTimeout(()=>dispatch(daysWithAppts({   
                userName,
                year,
                month
            })),500)  
            
    }

    const onTimeChange =(e)=>{
    
        setgraphic(false)
        setdatetime( rawCurrentDate.slice(0,11)+ moment(e).format('HH:mm:ss'))
          
    } 


    const txtChange = e => {
        settxt(e.target.value)   
        settxthelper('')   
    }

    
    
  

    return (
      
        <Grid container className='addaptform' >

            {/* <Grid name='stripes' item xs={12}>
                    <img className='stripes' src={stripes}/>
                    <img className='stripes' src={stripes}/>
            </Grid>   
             */}
            <Grid className='date' item xs={12}>
                {month}  {dateNmbr} `{year} 
            </Grid>

            <Grid className='time-text' container item xs={12}>
                <Grid item xs={2} className='newApttimeItem'> 
                    
                    { 
                    graphic ? 
                        <div className='graphic'>
                         
                                <button className={!scale ? 'plainbtn': 'plainbtn scale'}>                               
                                    <img className ='timeimg' src={timeleft} />
                                </button>

                                { timehelper ? <p>{timehelper}</p> : null }

                        </div>
                    :null
                    }            

                 <div className='dateTimeBox'> 
                     <Datetime 
                        onChange={onTimeChange}
                        dateFormat={false}/>
                </div>
                   
                  

                </Grid>
                <Grid item>this</Grid>

                <Grid item xs={1} className='clocklineItem'><div className='clockline'/></Grid>

                <Grid  className='AafapptTxtItem'
                    container item xs={9} 
                    onTouchStart={()=>{
                        setspread(false)
                        setspread(true)
                        
                    }
                    }
                    >
                
                    <Grid item xs={12}>
                        <textarea             
                            onChange={e=>txtChange(e)}
                            placeholder={txthelper}
                            value={txt}
                            rows={txt.split('\n').length}
                            cols={29} 
                            autoFocus            
                        /> 
                    </Grid>

                    <Grid name='undrline' item xs={12}>                     
                        <div  className={spread ? 'apptunder apptunderspread' 
                                : 'apptunder'}/>     
                    </Grid>
                                      
                </Grid>    

            </Grid>   
            
            <Grid className='saveappt' 
                item xs={12} 
                
                >
                    {txt.length > 1 ?
                        <div className='module-border-wrap'
                            onClick={saveEntry}
                        >
                        <button className='module-button'> 
                            Save New Appointment
                        </button>
                    </div> : null
                    }
               
            </Grid>
        
        </Grid>

       
       
    )
}



