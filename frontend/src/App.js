import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useInitialize } from './utils/hooks'
import { Container } from '@mui/material'

import LoginView from './components/Views/LoginView'
import SignUpView from './components/Views/SignUpView'
import AccountView from './components/Views/AccountView'
import Notification from './components/Notification'
import MainView from './components/Views/MainView/MainView'
import UsersView from './components/Views/UsersView'
import UserView from './components/Views/UserView'
import BlogView from './components/Views/BlogView/BlogView'
import NavigationMenu from './components/NavigationMenu/NavigationMenu'

const App = () => {
  useInitialize()

  return (
    <div>
      <Container>
        <NavigationMenu />
        <Notification />
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignUpView />} />
          <Route path="/account" element={<AccountView />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/users" element={<UsersView />} />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
