import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createUser = async (user) => {
  const response = await axios.post(baseUrl, user)
  return response.data
}

const object = { getAllUsers, createUser }
export default object