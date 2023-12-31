import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import { useEventHandler } from '../../utils/hooks'

const Blog = ({ blog }) => {
  const user = useSelector(state => state.user)
  const isCreatedByUser = user.username && user.id === blog.user.id
  const eventHandler = useEventHandler()


  return (
    <Card elevation={4} sx={{ m: 1 }}>
      <CardActionArea component={Link} to={`/blogs/${blog.id}`}>
        <CardHeader  title={blog.title} subheader={`By ${blog.user.username}`}/>
        <CardContent>
          <Typography>
            Number of Likes: {blog.likes.length}
          </Typography>
          <Typography>
            Number of Comments: {blog.comments.length}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {isCreatedByUser ? <Button onClick={eventHandler.removeHandler(blog)}>Sil</Button> : null}
        {user.username ? <Button onClick={eventHandler.likeHandler(blog)}>Like</Button> : null}
      </CardActions>
    </Card>
  )
}

export default Blog
