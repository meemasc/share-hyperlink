import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useInitialize } from './utils/hooks'
import { Container } from '@mui/material'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import LoggedUser from './components/LoggedUser'
import UsersView from './components/UsersView'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import NavigationMenu from './components/NavigationMenu'

const App = () => {
  useInitialize()

  return (
    <div>
      <Container>
        <NavigationMenu />
        <Notification />
        <Routes>
          <Route path="/" element={<LoggedUser />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/users" element={<UsersView />} />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
