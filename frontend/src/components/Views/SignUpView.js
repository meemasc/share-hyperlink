import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Stack, TextField, Button } from '@mui/material'
import { signUpUser } from '../../reducers/userReducer'

const SignUpView = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(signUpUser(username, name, password))

    navigate('/')
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <h1>Kayit Ol</h1>
        <form onSubmit={handleLogin}>
          <Stack
          direction="column"
          alignItems="center"
          spacing={2}
          >
            <TextField
              type="text"
              value={username}
              name="Username"
              label="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <TextField
              type="text"
              value={name}
              name="Name"
              label="Name"
              onChange={({ target }) => setName(target.value)}
            />
            <TextField
              type="password"
              value={password}
              name="Password"
              label="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button type="submit" size="large" variant="contained">login</Button>
          </Stack>
        </form>
    </div>
  )
}

export default SignUpView