import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

export const initializeAllUsers = () => {
  return async (dispatch) => {
    const allUsers = await userService.getAllUsers()
    dispatch(allUsersReducer.actions.setUsers(allUsers))
  }
}

const allUsersReducer = createSlice({
  name: 'allUsers',
  initialState: null,
  reducers:{
    setUsers(state, action) {
      return action.payload
    }
  }
})

export default allUsersReducer.reducer