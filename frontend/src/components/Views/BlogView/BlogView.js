import React from 'react'
import { Paper, Typography, Link as MaterialUiLink } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import Comments from './Comments'

const BlogView = () => {
  const id = useParams().id
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )

  if (!blog) {
    return null
  }
  return (
    <Paper elevation={6} sx={{ margin: 2, padding: 2 }}>
      <Typography sx={{ p: 1 }} align="center" variant="h4" color="inherit">
        {blog.title}
      </Typography>
      <Typography variant="h6" color="inherit">
          Created By:  
          <MaterialUiLink underline="hover" component={Link} to={`/users/${blog.user.id}`}> 
           {blog.user.username}
          </MaterialUiLink>
      </Typography>
      <Typography sx={{ p: 1 }} variant="h6" color="inherit" align="center">
        {blog.description}
      </Typography>
      <MaterialUiLink href={blog.url} underline="hover">
        <Typography sx={{ p: 1 }} variant="h6" color="inherit">
          Blog Link
        </Typography>
      </MaterialUiLink>
      <Typography sx={{ p: 1 }} variant="h6" color="inherit">
        Number of Likes: {blog.likes.length}
      </Typography>
      <Comments comments={blog.comments}/>
    </Paper>
  )
}

export default BlogView
