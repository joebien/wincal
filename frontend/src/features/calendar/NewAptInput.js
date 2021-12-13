import React, { useState, useEffect } from 'react'
import { Grid, TextField, FormControl } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux'
import { postNewAppt, daysWithAppts} from './calSlice'
const [txt, settxt] = useState('')
const [txthelper, settxthelper]=useState('New Appointment')
const txtChange = e => {
    settxt(e.target.value)   
    settxthelper('')   
}


export const NewAptInput = () => {
    return( 
    <Grid className='NuAptInput' container> 
        <Grid name='textarea' item xs={12}>
            <textarea             
                onChange={e=>txtChange(e)}
                placeholder={txthelper}
                value={txt}
                rows={txt.split('\n').length}
                cols={18} 
                autoFocus            
            /> 
        </Grid>
    </Grid>
    )
   
}