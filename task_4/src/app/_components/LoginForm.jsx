"use client"
import React from 'react'
import { loginAction } from '../actions/auth'

function LoginForm() {
    return (
        <form action={loginAction} className='space-x-4'>
            <div>
                <label className="block text-sm font-medium text-gray-700" >Email</label>
                <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" type="email" name='email' placeholder='Enter your email' required />
            </div>
            <div className='mt-3'>
                <label htmlFor="password">Password</label>
                <input className=" mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2" type="password" name='password' placeholder='Enter your password' required />
            </div>
            <div>
                <button type="submit" className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Login</button>
            </div>
        </form>


    )
}

export default LoginForm
