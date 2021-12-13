import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import {Head} from './app/Head.js'
import Test from './features/calendar/test.js'
import {CalendarComp} from './features/calendar/CalendarComp'
import {UsersComp} from './features/users/UsersComp'
import {EssayForm} from './features/calendar/TextareaComp.js'
import {LessTest} from './app/LessTest.js'
import Appbground from './img/gunz.jpg'

function App() {
  return (

    
    <Router>
      <Head/> 

      <div className="app">
        <img src={Appbground}/>
       
      
        <Switch>
          <Route
            exact path="/test"
            render={() => (
              <React.Fragment>
                <Test/>
              </React.Fragment>
            )}/>

          <Route
            exact path="/cal"
            render={() => (
              <React.Fragment>
                <CalendarComp/>  
              </React.Fragment>
            )}/>

          <Route
            exact path="/textA"
            render={() => (
              <React.Fragment>
                <EssayForm/>  
              </React.Fragment>
            )}/>
       
          <Route exact path="/" 
            component={UsersComp} />
       
          <Redirect to="/" />
        </Switch>
        
      </div>

    </Router>
    
   
   
  )
}

export default App
