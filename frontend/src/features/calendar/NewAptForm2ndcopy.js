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

import Timeleft from '../../img/clock.jpg';
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
    const [txthelper, settxthelper]=useState('   New Appt')
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
        setselectedtime(true)
        setdatetime( rawCurrentDate.slice(0,11)+ moment(e).format('HH:mm:ss'))

    }


    const txtChange = e => {
        settxt(e.target.value)
        settxthelper('')
    }

  const [mask, setmask]=useState(false)
  const [selectedtime, setselectedtime]=useState(false)

    return (

        <Grid container className='addaptform' >

            {/* <Grid name='stripes' item xs={12}>
                    <img className='stripes' src={stripes}/>
                    <img className='stripes' src={stripes}/>
            </Grid>
             */}
            <Grid className='datetimeItem' item xs={12} >
                <div style={{
                    border: 'dotted red',
                    position: 'relative'                  
                }}
                >
                    
                    {graphic ?
                        <div className='graphic'>

                            <button className='plainbtn'>
                                <img src={Timeleft}/>
                            </button>

                                { timehelper ? <p>{timehelper}</p> : null }

                        </div>
                        : null
                    }

                    <div className='dateTimeBox'>


                            < Datetime
                                inputProps={{
                                    width: '50px'
                                    
                                
                                }}
                                onChange={onTimeChange}
                                dateFormat={false}
                                onOpen={
                                    ()=>setmask(true)
                                    //()=>console.log('oPen')
                                }
                                onClose={
                                    ()=>setmask(false)
                                }
                            />


                        </div>
                </div>

                <div className='mdyItem'>
                    <div className='mdy'>{month}  {dateNmbr} `{year}</div>
                </div>
            </Grid>

           



















            <Grid  className='newAptTxtItem'
                    container item xs={9}
                    onTouchStart={()=>{
                        setspread(false)
                        setspread(true)

                    }}
                   
                >

                    <Grid name='textarea' item xs={12}>
                        <textarea
                            onChange={e=>txtChange(e)}
                            placeholder={txthelper}
                            value={txt}
                            rows={txt.split('\n').length}
                            cols={22}
                            autoFocus
                        />
                    </Grid>

                    <Grid name='undrline' item xs={12}>
                        <div  className={spread ? 'apptunder apptunderspread'
                                : 'apptunder'}/>
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



