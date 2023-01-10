import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import CreateNewBlog from './CreateNewBlog'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const LoggedUser = ({ user, setUser }) => {
  const blogs = useSelector((state) => state.blogs)
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {`${user.name} logged in `}
        <button onClick={handleLogout}>logout</button>
      </div>
      <br />
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <CreateNewBlog blogFormRef={blogFormRef} />
      </Togglable>
      <div>
        {blogs
          .slice()
          .sort((blog1, blog2) => blog2.likes - blog1.likes)
          .map((blog) => (
            <Blog className="blog" key={blog.id} blog={blog} user={user} />
          ))}
      </div>
    </div>
  )
}

export default LoggedUser
