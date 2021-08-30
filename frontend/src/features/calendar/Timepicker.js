// import React, { useState, useEffect } from 'react'
// import { Grid, TextField} from '@material-ui/core'

// import { useSelector, useDispatch } from 'react-redux'

// export const Timepicker =()=>{
//     return(
//         <p>her bist der Zeit picker</p>
//     )
// }

import React, { useState, useEffect } from 'react'
import { Grid, TextField} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';

import { useSelector, useDispatch } from 'react-redux'
import {setEditApptData, loadEditForm} from './calSlice'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },

}));




export default function TimePicker() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const[Data, setData]=useState({time:'00:00'})
    const editFormData= useSelector(state=>state.appts.editFormData) || {}
    const [time, settime] = useState()
    const [txt, settxt] = useState()

    useEffect(()=>{
        settime(editFormData.time)  
    },
    [editFormData])

   

  return (


    <Grid container>

        <Grid item xs={12}>
           time
        </Grid>

        <Grid item xs={12}>
            <form className={classes.container} noValidate>
                <TextField
                    id="time"
                    label="Alarm clock"
                    type="time"

                  
                    value = {time || ''}

                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 300, // 5 min
                    }}
                    onChange={(e)=>settime(e.target.value)}
                />
            </form>

    </Grid>
    
      

    </Grid>

   
  );
}