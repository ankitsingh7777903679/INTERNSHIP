"use client"
import React from 'react'
import { logoutAction } from '../actions/auth'

function LogoutButton() {
  const handelLogout = async() => {
    await logoutAction()
  }
  return <button onClick={() => handelLogout()} className=' px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>LogOut</button>
  
}

export default LogoutButton
