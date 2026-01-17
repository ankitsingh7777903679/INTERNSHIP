import axios from 'axios';
import axiosInstance from './axiosInstance';
const SERVER_URL = import.meta.env.VITE_AUTH_URL;

export const userLogin = async (loginData) => {
    const res = await axios.post(`${SERVER_URL}/login`, loginData)
    console.log("res from api",res);
    return res.data

}

export const userSignup = async (signupData) => {
    const res = await axios.post(`${SERVER_URL}/signup`, signupData)
    return res.data

}

export const getAllUser = async () => {
    const res = await axiosInstance.get(`${SERVER_URL}/getAllUser`)
    return res.data
}

export const updateUserPermission = async (userId, PermissionsData) => {
    const res = await axiosInstance.post(`${SERVER_URL}/updateUserPermissions/${userId}`, PermissionsData)
    return res.data
}

export const changeUserStatus = async (userId, statusData) => {
    const res = await axiosInstance.post(`${SERVER_URL}/changeUserStatus/${userId}`, statusData)
    return res.data
}

// Verify token version against server; returns user if still valid.
export const checkSession = async () => {
    const res = await axiosInstance.get(`${SERVER_URL}/me`)
    return res.data
}