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
    const [loginusername, setloginusername]=useState()
    const [username, setusername]=useState(' ')
    const [signinmsg, setsigninmsg]=useState()



    const handleSignIn = async()=>{
 
        const res = await dispatch(signInUser({userName:username}))
        console.log('res ',res);

        if(res.payload) {history.push('/cal',{userName:username})}
        else{setsigninmsg('not found')}    
    }

    const handleNewUser =()=>{ console.log('newusername ',newusername);
    
    
    const saveNewUser = async()=> {
        const res = await dispatch(createNewUser({userName:newusername}))
        return res.payload
    }

        saveNewUser().then(res=>{
            // if(typeof(res) === 'string'){ 
            //     alert ('This name in already taken')
            // }else{ 
                dispatch(createUserAppts(newusername))
                history.push('/cal',{userName:newusername})
            // }
        })
    }

    const [helpertextsignup, sethelpertextsignup]=useState('Sign up with new User Name')
    const [helpertextlogin, sethelpertextlogin]=useState('Log in with your username')
    const [clmns, setclmns]=useState(28)
    const [loginclmns, setloginclmns]=useState(28)

    useEffect(() => {  
      
        if(newusername) setclmns(newusername.length)
        
      }, [newusername])

    return (
        <Grid container 
            // sx={{ justifyContent: 'center' }}
            style={{ 
            border: 'pink solid 1px', 
            padding: '20px 0px'
            }}
        >

            <Grid name='signup' item xs={7}
                style={{textAlign: 'center'}}
            >
                <textarea 
                    className='signup'
                    cols={clmns} rows='1'
                    onChange={(e)=>setnewusername(e.target.value)} 
                    value={loginusername}
                    placeholder={helpertextsignup}     
                />   
                  
            </Grid>

            <Grid item xs={12} onClick={handleNewUser}
                
            >  
                {newusername && newusername.length > 3 ?
                    <div className='module-border-wrap'>
                        <button className='module-button'> 
                            Save New UserName
                        </button>
                    </div> : null
                }
            </Grid>


            <Grid item xs={12} className='or'>
                OR
            </Grid>

            <Grid name='signin' item xs={12}
             style={{ textAlign: 'center'}}
            >
                
            <textarea 
                    className='signup'
                    cols={loginclmns} rows='1'
                    onChange={(e)=>setloginusername(e.target.value)} 
                    value={loginusername}
                    placeholder={helpertextlogin}     
                />   
                
            </Grid>

            <Grid item xs={12} onClick={handleNewUser}
                
                >  
                    {newusername && newusername.length > 3 ?
                        <div className='module-border-wrap'>
                            <button className='module-button'> 
                                Login
                            </button>
                        </div> : null
                    }
                </Grid>
    
    

            <Grid>
                {signinmsg}
            </Grid>


        </Grid>
    )
}



