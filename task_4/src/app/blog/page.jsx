import React, { Suspense } from 'react'
import Post from './components/post'

export default async function page() {
  const promise = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json())
  const slicedPromise = promise.slice(0, 10);
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Post promise={slicedPromise} />
      </Suspense>
    </div>
  )
}
