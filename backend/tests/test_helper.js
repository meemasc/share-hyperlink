const Blog = require('../models/blog')
const User = require('../models/user')



const initialBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }  
]

const initialUsers = [
  {
    username: 'test_username1',
    name: 'test_name1',
    password: 'test_password1'
  },
  {
    username: 'test_username2',
    name: 'test_name2',
    password: 'test_password2'
  },
  {
    username: 'test_username3',
    name: 'test_name3',
    password: 'test_password3'
  }
]

const nonExistingId = async () => {
  const randomBlog = {
    title: 'test1',
    author: 'test2',
    url: 'test3',
    likes: 4,
  }
  const blog = new Blog(randomBlog)
  await blog.save()
  await blog.remove()
  
  return blog._id.toString()
}

const nonExistingUserId = async () => {
  const randomUser = {
    username: 'test1',
    name: 'test2',
    passwordHash: 'test3',
    blogs: []
  }
  const user = new User(randomUser)
  await user.save()
  await user.remove()
  
  return user._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
  
  
module.exports = {
  initialBlogs, nonExistingId, usersInDb, initialUsers,
  nonExistingUserId
}