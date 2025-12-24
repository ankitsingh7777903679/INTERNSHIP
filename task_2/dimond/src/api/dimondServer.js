import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const insertDimond = async (dimondData) => {
    const res = await axios.post(`${SERVER_URL}/insert`, dimondData)
    return res.data
}

export const findDimond = async () => {
    const res = await axios.get(`${SERVER_URL}/find`)
    return res.data
}

export const findDimondPrice = async (dimondData) => {
    const res = await axios.post(`${SERVER_URL}/findPrice`, dimondData)
    return res.data
}