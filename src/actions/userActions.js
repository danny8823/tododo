import axios from 'axios'
import { BASE_URL } from '../utils/url'
import { getUserFromStorage } from '../utils/getUserFromStorage'

const user = getUserFromStorage()

export const loginAPI = async({email,password}) => {
    const response = await axios.post(`${BASE_URL}/api/users/login`,{
        email,
        password
    })

    return response.data
}

export const registerAPI = async({email,password,username}) => {
    const response = await axios.post(`${BASE_URL}/api/users/register`, {
        email,
        password,
        username
    })

    return response.data
}

export const changePasswordAPI = async({newPassword}) => {
    const response = await axios.put(`${BASE_URL}/users/change-password`, {
        newPassword
    },{
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    })

    return response.data
}

export const updateProfileAPI = async({email,username}) => {
    console.log('update profile api fired')
    const response = await axios.put(`${BASE_URL}/users/update-profile`, {
        email, username
    },
    {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    })

    return response.data
} 