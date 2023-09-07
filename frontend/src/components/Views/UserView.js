import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Stack, Typography } from '@mui/material'
import Blog from './Blog'

const UserView = () => {
  const id = useParams().id
  const user = useSelector(state => state.allUsers.find(user => user.id === id))
  const allBlogs = useSelector(state => state.blogs)

  if (!user) {
    return null
  }
  
  const userOwnedBlogs = allBlogs.filter(blog => blog.user.id === user.id)

  return (
    <div>
      <Typography sx={{ p: 1, bgcolor: 'text.secondary' }} align="center" variant="h3" color="inherit">
        {user.username}
      </Typography>
      <Stack>
        {userOwnedBlogs
          .slice()
          .sort((blog1, blog2) => blog2.likes - blog1.likes)
          .map((blog) => (
            <Blog className="blog" key={blog.id} blog={blog} />
          ))}
      </Stack>
    </div>
  )
}

export default UserView