import Link from 'next/link'
import React from 'react'
import LogoutButton from './LogoutButton';
import { getSession } from '../_lib/session';

async function Navbar() {
    const session = await getSession();
    return (
        <nav className='bg-white shadow-md'>
            <div className="container mx-auto p-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-blue-600">
                    Contact Manager
                </Link>
                <div className='flex items-center space-x-4'>
                    {session ? (<>
                        <Link href="/contact" className="text-xl font-bold hover:text-blue-600 mr-8">
                            Contacts
                        </Link>
                        <LogoutButton />
                    </>) : (<>
                        <Link href="/login" className="text-xl font-bold hover:text-blue-600 mr-5">
                            Login
                        </Link>
                        <Link href="/register" className="text-xl font-bold hover:text-blue-600">
                            Register
                        </Link>

                    </>)}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
