import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Stack, TextField, Button } from '@mui/material'
import { addNewBlog } from '../../../reducers/blogsReducer'

const CreateNewBlog = ({ blogFormRef }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogDescription, setBlogDescription] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const dispatch = useDispatch()

  const handleBlogCreation = async (event) => {
    event.preventDefault()

    const blog = {
      title: blogTitle,
      description: blogDescription,
      url: blogUrl,
    }

    blogFormRef.current.toggleVisibility()

    dispatch(addNewBlog(blog))

    setBlogTitle('')
    setBlogDescription('')
    setBlogUrl('')

  }

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleBlogCreation}>
        <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        >
          <TextField
            type="text"
            value={blogTitle}
            name="Title"
            label="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
          <TextField
            type="text"
            value={blogDescription}
            name="Description"
            label="Description"
            onChange={({ target }) => setBlogDescription(target.value)}
          />
          <TextField
            type="text"
            value={blogUrl}
            name="Url"
            label="Url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        <Button type="submit" size="large" variant="contained">Create</Button>
        </Stack>
      </form>
    </div>
    
  )
}

export default CreateNewBlog
