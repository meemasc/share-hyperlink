import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import LoggedUser from './components/LoggedUser'
import { initializeBlogs } from './reducers/blogsReducer'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => <LoginForm setUser={setUser} />

  const loggedUser = () => <LoggedUser user={user} setUser={setUser} />

  return (
    <div>
      <Notification />
      {user === null && loginForm()}
      {user !== null && loggedUser()}
    </div>
  )
}

export default App
