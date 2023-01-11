import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogsReducer'
import { initializeUser } from '../reducers/userReducer'
import { initializeAllUsers } from '../reducers/allUsersReducer'

export const useInitialize = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUser())
        dispatch(initializeAllUsers())
      }, [])
}