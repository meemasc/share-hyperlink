import { createSlice } from '@reduxjs/toolkit'

export const setNotification = (message, messageColor, time) => {
  return (dispatch) => {
    const timerID = setTimeout(
      () => dispatch(notificationSlicer.actions.resetNotification()),
      time * 1000
    )
    const payload = {
      message,
      messageColor,
      timerID,
    }
    dispatch(notificationSlicer.actions.createNotification(payload))
  }
}

const notificationSlicer = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    messageColor: null,
    timerID: null,
  },
  reducers: {
    createNotification(state, action) {
      clearTimeout(state.timerID)
      return action.payload
    },
    resetNotification() {
      return {
        message: null,
        messageColor: null,
        timerID: null,
      }
    },
  },
})

export default notificationSlicer.reducer
