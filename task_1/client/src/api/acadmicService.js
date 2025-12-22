import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
// 1. List Streams from server
export const getStreams = async () => {
    const res = await axios.get(`${SERVER_URL}/getStreams`)
    return res.data;
}
export const addStream = async (data) => {
  const res =  await axios.post(`${SERVER_URL}/insertStream`, data)
    return res.data;
}

export const addClass = async (data) => {
    const res = await axios.post(`${SERVER_URL}/insertClass`, data)
    return res.data;
}
export const getClasses = async () => {
    const res = await axios.get(`${SERVER_URL}/getClasses`)
    return res.data;
}
export const addSubject = async (data) => {
    const res = await axios.post(`${SERVER_URL}/insertSubject`, data)
    return res.data;
}
export const getSubjects = async () => {
    const res = await axios.get(`${SERVER_URL}/getSubjects`)
    return res.data;
}   
