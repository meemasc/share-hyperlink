import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

export const initializeAllUsers = () => {
  return async (dispatch) => {
    const allUsers = await userService.getAllUsers()
    dispatch(allUsersReducer.actions.setUsers(allUsers))
  }
}

export const addUser = (user) => {
  return allUsersReducer.actions.addUser(user)
}

const allUsersReducer = createSlice({
  name: 'allUsers',
  initialState: [],
  reducers:{
    setUsers(state, action) {
      return action.payload
    },
    addUser(state, action) {
      return state.concat(action.payload)
    }
  }
})

export default allUsersReducer.reducer