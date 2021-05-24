import { React, useState }from 'react'
import { Link } from 'react-router-dom'


export const Details=({dateObj})=>{

    return(
       
        <section className='details'>
            <h3> Details </h3> 

            <p>
              {dateObj.date}
            </p> 
            <p>
              {dateObj.app}
            </p>
            
        </section>

    )
}