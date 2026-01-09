'use client'

import Link from 'next/link';
import React from 'react'

export default function Post({promise}) {
  return (
    <div>
      {
        promise.map((post) => {
          return (
            <div key={post.id} className='border border-blue-400 p-3 m-2 rounded-md'>
              <Link href={`/blog/${post.id}`}>
                <h2 className='text-blue-500 text-2xl'>{post.title}</h2>
              </Link>
              <p> {post.body} </p>
            </div>
          );
        })
      }
    </div>
  )
}
