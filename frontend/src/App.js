import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import Nav from './app/Nav.js'
import DropMenu from './app/DropMenu.js'

import { MsgsList } from './features/msgs/MsgsList'
import { AddMsgForm } from './features/msgs/AddMsgForm'
import {CalendarComp} from './features/calendar/CalendarComp'

import { UsersList } from './features/users/UsersList'
import { UserPage } from './features/users/UserPage'
import { NotificationsList } from './features/notifications/NotificationsList'

import {LessTest} from './app/LessTest.js'

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      {/* <Nav/> */}
      <DropMenu/>
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
          <Route exact path="/lessTest" component={LessTest} />
          <Route exact path="/users/:userId" component={UserPage} />
          <Route exact path="/notifications" component={NotificationsList} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
