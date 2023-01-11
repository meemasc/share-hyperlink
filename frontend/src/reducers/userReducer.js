import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(userReducer.actions.setUser(user))
    }
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try{
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(userReducer.actions.setUser(user))
    } catch {
      dispatch(setNotification('wrong username or password', 'red', 5))
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(userReducer.actions.resetUser())
  }
}

const userReducer = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    resetUser() {
      return {}
    }
  }
})

export default userReducer.reducer
