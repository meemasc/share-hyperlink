import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const removeButtonStyle = {
    backgroundColor: '#00FFFF',
    display: blog.user.username === user.username ? '' : 'none',
  }

  const handleLikeButton = () => {
    dispatch(likeBlog(blog.id))
  }

  const handleRemoveButton = () => {
    const alert = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (alert) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const hiddenBlog = () => (
    <div className="hiddenBlog">
      {`${blog.title} ${blog.author}`}
      <button onClick={toggleVisibility}>view</button>
    </div>
  )

  const shownBlog = () => (
    <div className="shownBlog">
      <div>
        {`${blog.title} ${blog.author}`}
        <button onClick={toggleVisibility}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        {`likes ${blog.likes} `}
        <button onClick={handleLikeButton}>like</button>
      </div>
      <div>{blog.user.name}</div>
      <div>
        <button style={removeButtonStyle} onClick={handleRemoveButton}>
          remove
        </button>
      </div>
    </div>
  )

  return <div style={blogStyle}>{visible ? shownBlog() : hiddenBlog()}</div>
}

export default Blog
