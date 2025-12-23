import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// 1. List data from server
export const getStudents = async (params) => {
    // console.log("input.......",params);
    const query = params ? new URLSearchParams(params).toString() : ''
    const res = await axios.get(`${SERVER_URL}/list?${query}`)
    console.log("response.......",res);
    // console.log(res.data.data);
    return res.data;
}

// 2. Add data to server
export const addStudent = async (data) =>{
    const res = await axios.post(`${SERVER_URL}/insert`,data)
    return res.data
}

// 3. Update data on server
export const updateStudent = async (id, data) => {
    const res = await axios.put(`${SERVER_URL}/update/${id}`,data)
    return res.data
}

// 4. Delete data on server (soft delete)
export const deleteStudent = async (id) =>{
    const res = await axios.put(`${SERVER_URL}/delete/${id}`)
    return res.data
}

// 5. Change Status
export const studentSetStatus = async (id, status) => {
    const res = await axios.put(`${SERVER_URL}/setStatus/${id}`,status)
    return res.data
}

// 6. List oneStudent
export const getStudentOne = async (id) => {
    const res = await axios.get(`${SERVER_URL}/listOne/${id}`)
    console.log(res.data.data);
    return res.data;
}

