import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/like/${id}`, {}, config)
  return response.data
}

const clean = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const comment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.post(`${baseUrl}/${id}/comment`, { comment }, config)
}

const object = { getAll, create, setToken, like, clean, comment }
export default object
