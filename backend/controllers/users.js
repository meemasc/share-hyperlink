const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')


usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs',  { url: 1, title: 1, author: 1, id: 1})
  if (users) {
    response.json(users)
  } else {
    response.status(404).end()
  }
})


usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs', { url: 1, title: 1, author: 1, id: 1})
  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.username.length < 3 || body.password.length < 3) {
    response.status(400).send({error: 'username and password must be at least 3 characters long'})
  } else {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  }  
})

module.exports = usersRouter