import React from 'react'
import { Paper, Typography, Link } from '@mui/material'

const Footer = () => {

  return (
    <Paper elevation={12} sx={{ p: 2, m: 2 }}>
      <Typography align="center" variant="h5" color="inherit">
        {'Still in Development. For Source Code: '}
        
      <Link href={'https://github.com/meemasc/share-hyperlink'} underline="hover">
        github.com/meemasc/share-hyperlink
      </Link>
      </Typography>

      
    </Paper>
  )
}
export default Footer