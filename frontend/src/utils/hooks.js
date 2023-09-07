import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, likeBlog, deleteBlog, commentBlog } from '../reducers/blogsReducer'
import { initializeUser, logoutUser } from '../reducers/userReducer'
import { initializeAllUsers } from '../reducers/allUsersReducer'

export const useInitialize = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUser())
        dispatch(initializeAllUsers())
      }, [])
}

export const useEventHandler = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const likeHandler = (blog) => (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog.id))
  }

  const removeHandler = (blog) => (event) => {
    event.preventDefault()
    const alert = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (alert) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const logoutHandler = () => (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  const commentHandler = (field, blogID) => (event) => {
    event.preventDefault()
    dispatch(commentBlog(field.input.value, blogID, user.id))
    field.reset()
  }

  return {
    likeHandler,
    removeHandler,
    logoutHandler,
    commentHandler
  }
}

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    input: {
      name,
      value,
      onChange,
    },
    reset
  }
}
