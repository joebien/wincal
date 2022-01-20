import React, { useState, useEffect } from 'react'
import { Grid} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { createNewUser, signInUser} from './usersSlice'
import { createUserAppts } from '../calendar/calSlice' 
import { useHistory}  from 'react-router-dom';


export const UsersComp = (props) => {
    let history = useHistory();
    const dispatch = useDispatch()
    const [newusername, setnewusername]=useState('')
    const [loginusername, setloginusername]=useState()
    const [username, setusername]=useState('')
    const [signinmsg, setsigninmsg]=useState()



    const handleSignIn = async()=>{
 
        const res = await dispatch(signInUser({userName:username}))
        console.log('res ',res);

        if(res.payload) {history.push('/cal',{userName:username})}
        else{setsigninmsg('not found')}    
    }

    const handleNewUser =()=>{ console.log('newusername ',newusername);
    
    
        const saveNewUser = async()=> { console.log('saveNewUser')
        
            const res = await dispatch(createNewUser({userName:newusername}))
            return res.payload
        }

        saveNewUser().then(res=>{
            console.log('res ',res)
            if(typeof(res) === 'string'){ 
                alert ('This name in already taken')
            }else{ 
                dispatch(createUserAppts(newusername))
                history.push('/cal',{userName:newusername})
            }
        })
    }

    const [helpertextsignup, sethelpertextsignup]=useState(`Sign up with new
    User Name`)
    const [helpertextlogin, sethelpertextlogin]=useState('Log in with your username')
    const [clmns, setclmns]=useState(22)
    const [loginclmns, setloginclmns]=useState(22)

    const[rows, setrows]=useState(2)
    const[signin, hidesignin]=useState(false)
    const[signup, hidesignup]=useState(false)
   
    useEffect(() => {     
        if(newusername) {
            setrows(1)
            hidesignin(true)
        }else {
            hidesignin(false)
            setrows(2)
        }   
    }, [newusername])

    useEffect(() => {     
        if(username) {
            setrows(1)  
            hidesignup(true)
        }else {
            hidesignup(false)
            setrows(2)
        }   
    }, [username])

    const handleLogin=()=>{

    }


    return (
    <div style={{
        marginTop: '20%',
      
        }}>
        <Grid container 
            className='userCompContainer'
            direction='column'
            justifyContent='flex-start'   
            alignItems='center'
           
        >
            <Grid className='signupItem' item xs={1}>
                
                {!signup ?
                    <textarea 
                        className='signuptxtArea'
                        cols={20} rows={rows}
                        onChange={(e)=>setnewusername(e.target.value)} 
                        value={newusername}
                        placeholder={helpertextsignup}     
                    /> : null 
                }

                {newusername && newusername.length > 3 ?
                    <div className='module-border-wrap'
                        onTouchEnd={handleNewUser}
                    >
                        <button className='module-button'> 
                            Save New UserName
                        </button>
                    </div> : null
                }
               
                
            </Grid>

            <Grid item xs={1} className='or'>
                { !signup && !signin ?
                
                <p>OR</p> : null
                }      
            </Grid>

            <Grid className='signinItem' item xs={1}>
                { !signin ? 
                    <textarea 
                        className='signuptxtArea'
                        cols={20} rows={rows}
                        onChange={(e)=>setusername(e.target.value)} 
                        value={loginusername}
                        placeholder={helpertextlogin}     
                    />  : null 
                }
                
            </Grid>

            <Grid item xs={1} onClick={handleLogin}
                
                >  
                    {username && username.length > 3 ?
                        <div className='module-border-wrap'>
                            <button className='module-button'> 
                                Login
                            </button>
                        </div> : null
                    }
            </Grid>


        </Grid>
    </div>
    )
}



