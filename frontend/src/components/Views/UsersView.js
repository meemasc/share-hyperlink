import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Typography,
} from '@mui/material'

const UsersView = () => {
  const allUsers = useSelector((state) => state.allUsers)
  if (!allUsers) {
    return null
  }

  return (
    <div>
      <Typography sx={{ p: 1, bgcolor: 'secondary.main' }} align="center" variant="h3" color="inherit">
        Users
      </Typography>
      <TableContainer sx={{ maxWidth: 'sm', m: 2 }} elevation={6} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Number of Blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Button
                    style={{ textTransform: 'none' }}
                    to={`/users/${user.id}`}
                    component={Link}
                  >
                    {user.username}
                  </Button>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UsersView
