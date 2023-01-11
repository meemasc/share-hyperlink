import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserView = () => {
  const id = useParams().id
  const allUsers = useSelector(state => state.allUsers)
  if (!allUsers) {
    return null
  }
  const user = allUsers.find(user => user.id === id)

  return (
    <div>
      <h1>{user.name}</h1>
      <p><strong>Added Blogs</strong></p>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default UserView