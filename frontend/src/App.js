import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import {Head} from './app/Head.js'

import {CalendarComp} from './features/calendar/CalendarComp'
import {UsersComp} from './features/users/UsersComp'

import {LessTest} from './app/LessTest.js'

function App() {
  return (
  
    <Router>
    <Head/>

      <div className="app">
        <Switch>
          <Route
            exact path="/cal"
            render={() => (
              <React.Fragment>
                <CalendarComp/>     
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
