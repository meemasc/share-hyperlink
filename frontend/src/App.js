import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useInitialize } from './utils/hooks'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import LoggedUser from './components/LoggedUser'
import UsersView from './components/UsersView'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import NavigationMenu from './components/NavigationMenu'

const App = () => {
  useInitialize()
  const user = useSelector((state) => state.user)

  return (
    <div>
      <NavigationMenu />
      <Notification />
      <Routes>
        <Route path="/" element={user ? <LoggedUser /> : <LoginForm />} />
        <Route path="/users/:id" element={<UserView />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </div>
  )
}

export default App
