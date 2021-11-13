import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './menu.css'
import App from './App'
import {EssayForm} from './features/calendar/TextareaComp.js'
import store from './app/store'
import { Provider } from 'react-redux'

import { fetchUsers } from './features/users/usersSlice'



ReactDOM.render(
 
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
 
  ,
  document.getElementById('root')
)
