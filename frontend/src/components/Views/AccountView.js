import React from 'react'
import { useSelector } from 'react-redux'
import { Stack } from '@mui/material'
import Blog from './Blog'

const AccountView = () => {
  const user = useSelector(state => state.user)
  const userOwnedBlogs = useSelector(state => state.blogs).filter(blog => blog.user.id === user.id)

  return (
    <div>
      Hesabim
      <Stack>
        {userOwnedBlogs
          .slice()
          .sort((blog1, blog2) => blog2.likes - blog1.likes)
          .map((blog) => (
            <Blog className="blog" key={blog.id} blog={blog} />
          ))}
      </Stack>
    </div>
  )
}

export default AccountView