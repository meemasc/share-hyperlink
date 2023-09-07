import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(blogsReducer.actions.initialState(blogs))
  }
}

export const addNewBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(blogsReducer.actions.addAction(newBlog))
    dispatch(
      setNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        'green',
        5
      )
    )
  }
}

export const deleteBlog = (blogID) => {
  return async (dispatch) => {
    await blogService.clean(blogID)
    dispatch(blogsReducer.actions.removeAction(blogID))
  }
}

export const likeBlog = (blogID) => {
  return async (dispatch) => {
    const newBlog = await blogService.like(blogID)
    if (newBlog.error) {
      dispatch(setNotification(newBlog.error, 'red', 5))
    } else {
      dispatch(blogsReducer.actions.changeAction(newBlog))
    }
  }
}

export const commentBlog = (comment, blogID) => {
  return async (dispatch) => {
    const newBlog = await blogService.comment(blogID, comment)
    dispatch(blogsReducer.actions.changeAction(newBlog))
  }
}

const blogsReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    initialState(state, action) {
      return action.payload
    },
    addAction(state, action) {
      return state.concat(action.payload)
    },
    removeAction(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    changeAction(state, action) {
      return state.map((blog) => {
        if (blog.id === action.payload.id) {
          return action.payload
        }
        return blog
      })
    },
  },
})

export default blogsReducer.reducer
