import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
// 1. List Streams from server
const getStreams = async () => {
    const res = await axios.get(`${SERVER_URL}/getStreams`)
    return res.data;
}
const addStream = async (data) => {
  const res =  await axios.post(`${SERVER_URL}/insertStream`, data)
    return res.data;
}

const addClass = async (data) => {
    const res = await axios.post(`${SERVER_URL}/insertClass`, data)
    return res.data;
}
const getClasses = async () => {
    const res = await axios.get(`${SERVER_URL}/getClasses`)
    return res.data;
}
const addSubject = async (data) => {
    const res = await axios.post(`${SERVER_URL}/insertSubject`, data)
    return res.data;
}
const getSubjects = async () => {
    const res = await axios.get(`${SERVER_URL}/getSubjects`)
    return res.data;
}   
export { addStream, getStreams, addClass, getClasses, addSubject, getSubjects };