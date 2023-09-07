import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Typography, Stack } from '@mui/material'
import Blog from '../Blog'
import CreateNewBlog from './CreateNewBlog'
import Togglable from './Togglable'

const MainView = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  return (
    <div>
      <Typography sx={{ p: 1, bgcolor: 'secondary.main' }} align="center" variant="h3" color="inherit">
        Blogs
      </Typography>
      <br />
      {user.username ?
      <Togglable buttonLabel="Create a New Blog" ref={blogFormRef}>
        <CreateNewBlog blogFormRef={blogFormRef} />
      </Togglable> :
      <div></div>
      }
      <Stack>
        {blogs
          .slice()
          .sort((blog1, blog2) => blog2.likes - blog1.likes)
          .map((blog) => (
            <Blog className="blog" key={blog.id} blog={blog} />
          ))}
      </Stack>
    </div>
  )
}

export default MainView
