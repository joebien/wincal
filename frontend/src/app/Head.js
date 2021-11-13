import React, {useState, useRef, useEffect }from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DropMenu from './DropMenu.js'

export const Head=()=>{
    const userName=useSelector(state=>state.appts.userName)
   return( 
    <header >
        <DropMenu/>
        
    </header>
  
   )
}