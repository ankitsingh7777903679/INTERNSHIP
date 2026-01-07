import LoginForm from '@/app/_components/LoginForm'
import Link from 'next/link'
import React from 'react'
function LoginPage() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      <LoginForm />
            <p className='mt-4 text-center '>Dont have an account? <Link className='text-blue-600 hover:underline ' href="/register">Register</Link></p>
    </div>
  )
}

export default LoginPage
