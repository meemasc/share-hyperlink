import React from 'react'
import {
  Routes, Route
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useInitialize } from './utils/hooks'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import LoggedUser from './components/LoggedUser'
import UsersView from './components/UsersView'
import UserView from './components/UserView'

const App = () => {
  const user = useSelector(state => state.user)
  useInitialize()

  return (
    <div>
      <Notification />
      <Routes>
        <Route path='/' element={user ? <LoggedUser /> : <LoginForm />} />
        <Route path='/users/:id' element={<UserView />} />
        <Route path='/users' element={<UsersView />} />
      </Routes>
    </div>
  )
}

export default App
