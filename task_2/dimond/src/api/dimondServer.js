import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const insertStoneGroup = async (dimondData) => {
    const res = await axios.post(`${SERVER_URL}/insert`, dimondData)
    console.log("Insert Dimond Response:", res);
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

export const findOneDimond = async (id) => {
    const res = await axios.get(`${SERVER_URL}/findOne/${id}`)
    return res.data
}

export const updateDimond = async (id, dimondData) => {
    const res = await axios.put(`${SERVER_URL}/update/${id}`, dimondData)
    return res.data
}

export const addDiamond = async (dimondData) => {
    const res = await axios.post(`${SERVER_URL}/addDimond`, dimondData)
    return res.data
}

export const listDimond = async (params) => {
    const query = params ? new URLSearchParams(params).toString() : ''
    const res = await axios.get(`${SERVER_URL}/listDimond?${query}`)
    return res.data
}

export const changeDimondStatus = async (id, statusData) => {
    const res = await axios.put(`${SERVER_URL}/changeStatus/${id}`, statusData)
    return res.data
}

export const deleteDiamond = async (id) => {
    const res = await axios.put(`${SERVER_URL}/deleteDiamond/${id}`)
    return res.data
}

export const listOneDimond = async (id) => {
    const res = await axios.get(`${SERVER_URL}/listOneDimond/${id}`)
    return res.data
}

export const updateoneDiamond = async (id, diamondData) => {
    const res = await axios.put(`${SERVER_URL}/updateOneDiamond/${id}`, diamondData)
    console.log("res", res);
    return res.data
}

export const weightRange = async () => {
    const res = await axios.get(`${SERVER_URL}/minWeight`)
    return res.data
}
