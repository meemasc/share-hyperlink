import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs, likeBlog, deleteBlog } from '../reducers/blogsReducer'
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

  const likeHandler = (blog) => () => {
    dispatch(likeBlog(blog.id))
  }

  const removeHandler = (blog) => () => {
    const alert = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (alert) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const logoutHandler = () => () => {
    dispatch(logoutUser())
  }

  return {
    likeHandler,
    removeHandler,
    logoutHandler
  }
}