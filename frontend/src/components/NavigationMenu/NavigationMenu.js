import React from 'react'
import { AppBar, Toolbar, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import NavigationMenuUser from './NavigationMenuUser'

const NavigationMenu = () => {
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ p:1 ,justifyContent: 'space-between' }}>
          <Box>
            <Button sx={{ m: 1 }} color="inherit" component={Link} to={'/'} variant="outlined">
              Homepage
            </Button>
            <Button sx={{ m: 1 }} color="inherit" component={Link} to={'/users'} variant="outlined">
              Users
            </Button>
          </Box>
          <NavigationMenuUser />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavigationMenu