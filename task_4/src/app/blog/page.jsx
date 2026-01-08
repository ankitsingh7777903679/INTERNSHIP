import React from 'react'
import Link from 'next/link'
import Post from './components/post'

export default async function page() {
  // const data = await fetch('https://jsonplaceholder.typicode.com/posts')
  // const post = await data.json()
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div>
        <Post  />
      </div>
    </div>
  )
}
