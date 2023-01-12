import React from 'react'
import { useSelector } from 'react-redux'
import { AppBar, Toolbar, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { useEventHandler } from '../utils/hooks'

const NavigationMenu = () => {
  const eventHandler = useEventHandler()
  const user = useSelector((state) => state.user)

  const userLogin = () => {
    if (user.name) {
      return (
        <Box>
          {`${user.name} Logged In`}
          <Button sx={{ m: 1 }} color="inherit" variant="outlined" onClick={eventHandler.logoutHandler()} >
            Logout
          </Button>
        </Box>
      )
    }
    return (
      <Button color="inherit" component={Link} to={'/login'} variant="outlined">
        Login
      </Button>
    )
  }

  return (
    <div>
      <AppBar position="static" color="secondary">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Button sx={{ m: 1 }} color="inherit" component={Link} to={'/'} variant="outlined">
              Blogs
            </Button>
            <Button sx={{ m: 1 }} color="inherit" component={Link} to={'/users'} variant="outlined">
              Users
            </Button>
          </Box>
          {userLogin()}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavigationMenu