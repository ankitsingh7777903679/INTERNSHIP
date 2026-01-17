import axiosInstance from './axiosInstance';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const insertStoneGroup = async (dimondData) => {
    const res = await axiosInstance.post(`/insert`, dimondData)
    console.log("Insert Dimond Response:", res);
    return res.data
}

export const findDimond = async () => {
    const res = await axiosInstance.get(`/find`)
    return res.data
}

export const findDimondPrice = async (dimondData) => {
    const res = await axiosInstance.post(`/findPrice`, dimondData)
    return res.data
}

export const findOneDimond = async (id) => {
    const res = await axiosInstance.get(`/findOne/${id}`)
    return res.data
}

export const updateDimond = async (id, dimondData) => {
    const res = await axiosInstance.put(`/update/${id}`, dimondData)
    return res.data
}

export const addDiamond = async (dimondData) => {
    const res = await axiosInstance.post(`/addDimond`, dimondData)
    return res.data
}

export const listDimond = async (params) => {
    const query = params ? new URLSearchParams(params).toString() : ''
    const res = await axiosInstance.get(`/listDimond?${query}`)
    return res.data
}

export const changeDimondStatus = async (id, statusData) => {
    const res = await axiosInstance.put(`/changeStatus/${id}`, statusData)
    return res.data
}

export const deleteDiamond = async (id) => {
    const res = await axiosInstance.put(`/deleteDiamond/${id}`)
    return res.data
}

export const listOneDimond = async (id) => {
    const res = await axiosInstance.get(`/listOneDimond/${id}`)
    return res.data
}

export const updateoneDiamond = async (id, diamondData) => {
    const res = await axiosInstance.put(`/updateOneDiamond/${id}`, diamondData)
    console.log("res", res);
    return res.data
}

export const weightRange = async () => {
    const res = await axiosInstance.get(`/minWeight`)
    return res.data
}
