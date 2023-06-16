import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewBlog } from '../../../reducers/blogsReducer'

const CreateNewBlog = ({ blogFormRef }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const dispatch = useDispatch()

  const handleBlogCreation = async (event) => {
    event.preventDefault()

    const blog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }

    blogFormRef.current.toggleVisibility()

    dispatch(addNewBlog(blog))

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')

  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={blogUrl}
            name="Url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default CreateNewBlog
