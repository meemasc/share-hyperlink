import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEventHandler } from '../utils/hooks'

const NavigationMenu = () => {
  const eventHandler = useEventHandler()
  const user = useSelector((state) => state.user)

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link to={'/'} style={padding}>Blogs</Link>
      <Link to={'/users'} style={padding}>Users</Link>
      {`${user.name} logged in `}
      <button onClick={eventHandler.logoutHandler()}>logout</button>
    </div>
  )
}

export default NavigationMenu