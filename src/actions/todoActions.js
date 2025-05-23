import axios from 'axios'
import { BASE_URL } from '../utils/url'

export const createTodoAPI = async({task,description,user}) => {
    const response = await axios.post(`${BASE_URL}/api/todos/create`, {
        task,
        description,
        user
    })

    return response.data
}

export const fetchTodoAPI = async(id) => {
    
    const response = await axios.get(`${BASE_URL}/api/todos/fetch?userId=${id}`)

    return response.data
}

export const deleteTodoAPI = async(id) => {
    const response = await axios.delete(`${BASE_URL}/api/todos/delete?id=${id}`, {
        id
    })

    return response.data
}

