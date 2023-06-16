import React from 'react'
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  TextField,
  Button,
  Stack,
} from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'
import { useField, useEventHandler } from '../../../utils/hooks'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Comments = ({ comments }) => {
  const comment = useField('comment')
  const user = useSelector(state => state.user)
  const eventHandler = useEventHandler()
  const id = useParams().id

  return (
    <Paper variant="outlined" sx={{ padding: 2, maxWidth: 'sm' }}>
      <Typography align="center" variant="h4">
        Yorumlar
      </Typography>
      <List>
        {comments.map((comment, index) => (
          <div key={index}>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <CommentIcon />
              </ListItemIcon>
              <ListItemText primary={comment} />
            </ListItem>
          </div>
        ))}
        <Divider />
      </List>
      {user.username ?
        <form onSubmit={eventHandler.commentHandler(comment, id)}>
          <Stack direction="row" justifyContent="center" spacing={1}>
            <TextField size="small" {...comment.input} />
            <Button variant="contained" id="comment-button" type="submit">
              Add Comment
            </Button>
          </Stack>
        </form>
        : null
      }
    </Paper>
  )
}

export default Comments
