import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEventHandler } from '../utils/hooks'

const BlogView = () => {
  const id = useParams().id
  const user = useSelector((state) => state.user)
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )
  const eventHandler = useEventHandler()

  if (!blog) {
    return null
  }

  const removeButtonStyle = {
    backgroundColor: '#00FFFF',
    display: blog.user.username === user.username ? '' : 'none',
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.url}</p>
      <p>{blog.likes} likes <button onClick={eventHandler.likeHandler(blog)}>like</button></p>
      <p>Added by {blog.user.name}</p>
      <button style={removeButtonStyle} onClick={eventHandler.removeHandler(blog)}>
        remove
      </button>
    </div>
  )
}

export default BlogView
