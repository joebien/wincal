import React, { useState, useEffect } from 'react'
import { Grid} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { createNewUser, signInUser} from './usersSlice'
import { createUserAppts } from '../calendar/calSlice' 
import { useHistory}  from 'react-router-dom';


export const UsersComp = (props) => {
    let history = useHistory();
    const dispatch = useDispatch()
    const [newusername, setnewusername]=useState()
    const [username, setusername]=useState()
    const [signinmsg, setsigninmsg]=useState()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user")
        // if (loggedInUser) { 

        //     const user = JSON.parse(loggedInUser)

            
        //     history.push('/cal',{userName:user.userName})
        // }
      }, [])

    const handleSignIn = async()=>{
 
        const res = await dispatch(signInUser({userName:username}))
        console.log('res ',res);

        if(res.payload) {history.push('/cal',{userName:username})}
        else{setsigninmsg('not found')}    
    }

    const handleNewUser =()=>{

        const saveNewUser = async()=> {
        const res = await dispatch(createNewUser({userName:newusername}))
            return res.payload
        }

        saveNewUser().then(res=>{
            if(typeof(res) === 'string'){ 
                alert ('This name in already taken')
            }else{ 
                dispatch(createUserAppts(newusername))
                history.push('/cal',{userName:newusername})
            }
        })
    }


    return (
        <Grid container style={{ border: 'pink solid 1px' }}>

            <Grid name='head' item xs={12}>  
            
                <p>Enter Your Vibe</p>
                
            </Grid>

            <Grid name='details' item xs={12}>
                <textarea onChange={(e)=>setnewusername(e.target.value)} 
                value={newusername} />   
            </Grid>

            <Grid name='save appt' item xs={12} onClick={handleNewUser}>  
                Save Entry
            </Grid>

            <Grid name='save appt' item xs={12}>
               
               <p>Sign in</p>
              
            </Grid>

            <Grid name='details' item xs={12}>
                
                <textarea onChange={(e)=>{
                    setusername(e.target.value)
                    setsigninmsg('')
                }}
                
                value={username} 
                
                />
                
            </Grid>

            <Grid name='save appt' item xs={6} onClick={handleSignIn}>
                    
                Enter
                    
            </Grid>

            <Grid>
                {signinmsg}
            </Grid>


        </Grid>
    )
}



