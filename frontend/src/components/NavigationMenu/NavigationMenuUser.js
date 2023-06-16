import React from 'react'
import { Button, Menu, Box, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import { useEventHandler } from '../../utils/hooks'
import { useSelector } from 'react-redux'

const NavigationMenuUser = () => {
  const eventHandler = useEventHandler()
  const user = useSelector((state) => state.user)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    eventHandler.logoutHandler()
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = (event) => {
    setAnchorEl(null)
    eventHandler.logoutHandler()(event)
  }

  if (!user.username) {
    return (
      <div>
        <Button sx={{ m: 1 }} color="inherit" component={Link} to={'/signup'} variant="outlined">
          Sign Up
        </Button>
        <Button sx={{ m: 1 }} color="inherit" component={Link} to={'/login'} variant="outlined">
          Login
        </Button>
      </div>
    )
  } else {
    return (
      <Box>
        <Button
          color="inherit"
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {user.username}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose} component={Link} to={'/account'}>Hesabim</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    )
  }
}

export default NavigationMenuUser

  /*
  const userLogin = () => {
    if (user.name) {
      return (
        <Box>
          {`${user.name} Logged In`}
          <Button sx={{ m: 1 }} color="inherit" variant="outlined" onClick={} >
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
  */