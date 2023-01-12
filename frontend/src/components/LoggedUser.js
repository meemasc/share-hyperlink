import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import CreateNewBlog from './CreateNewBlog'
import Togglable from './Togglable'

const LoggedUser = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <br />
      {user.name ?
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <CreateNewBlog blogFormRef={blogFormRef} />
      </Togglable> :
      <div></div>
      }
      <div>
        {blogs
          .slice()
          .sort((blog1, blog2) => blog2.likes - blog1.likes)
          .map((blog) => (
            <Blog className="blog" key={blog.id} blog={blog} />
          ))}
      </div>
    </div>
  )
}

export default LoggedUser
