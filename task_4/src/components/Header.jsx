import Link from 'next/link'
import React from 'react'

function Header() {
    return (
        <>

            <header className='bg-red-400' style={{ padding: '20px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <ul style={{ display: 'flex', gap: '50px', listStyleType: 'none' }}>
                        {/* <li><Link href="/home">Home</Link></li> */}
                        <li><Link href="/about">About</Link></li>
                        {/* <li><Link href="/contact">Contact</Link></li> */}
                        <li><Link href="/login">login</Link></li>
                        <li><Link href="/course">course</Link></li>
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Header
