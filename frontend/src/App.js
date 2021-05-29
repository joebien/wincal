import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'

import { MsgsList } from './features/msgs/MsgsList'
import { AddMsgForm } from './features/msgs/AddMsgForm'
import {CalendarComp} from './features/calendar/CalendarComp'

import { UsersList } from './features/users/UsersList'
import { UserPage } from './features/users/UserPage'
import { NotificationsList } from './features/notifications/NotificationsList'

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                {/* <AddMsgForm />
                <MsgsList/> */}
                <CalendarComp/>
              </React.Fragment>
            )}
          />
       <Route exact path="/users" component={UsersList} />
          <Route exact path="/users/:userId" component={UserPage} />
          <Route exact path="/notifications" component={NotificationsList} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
