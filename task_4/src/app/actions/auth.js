"use server"

import axios from "axios"
import { redirect } from "next/navigation"
import { setSession, deleteSession } from "../_lib/session"

const API_URL = "http://localhost:3001"

export const loginAction = async (formdata) => {
    const email = formdata.get('email')
    const password = formdata.get('password')
    
    console.log('Form Data:', { email, password });
    
    const response = await axios.get(`${API_URL}/users?email=${email}&password=${password}`)
    const user = response.data[0]
    
    if (!user) {
        throw new Error('Invalid credentials')
    }

    await setSession({name: user.name, email: user.email, id: user.id})
    
    // User found, redirect to contact page
    redirect('/contact')
} 

export const logoutAction = async () => {
    await deleteSession()
    redirect('/login')
}