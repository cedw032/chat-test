import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import paths from './config/paths'

import ChatPage from './pages/ChatPage'
import UsersPage from './pages/UsersPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route path={paths.users} exact={true}>
          <UsersPage />
        </Route>
        <Route path={paths.chat} exact={true}>
          <ChatPage />
        </Route>
        <Route path="/" exact={true}>
          <Redirect to={paths.users} />
        </Route>
        <Route path="/">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
