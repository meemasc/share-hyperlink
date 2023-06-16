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
      <MaterialUiLink underline="hover" component={Link} to={`/users/${blog.user.id}`}> 
        <Typography variant="h6" color="inherit">
          {`by ${blog.user.username}`}
        </Typography>
      </MaterialUiLink>
      <MaterialUiLink href={blog.url} underline="hover">
        <Typography sx={{ p: 1 }} variant="h6" color="inherit">
          Blog Linki
        </Typography>
      </MaterialUiLink>
      <Typography sx={{ p: 1 }} variant="h6" color="inherit">
        {blog.likes} likes
      </Typography>
      <Comments comments={blog.comments}/>
    </Paper>
  )
}

export default BlogView
