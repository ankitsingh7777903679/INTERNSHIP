import React from 'react'
import Link from 'next/link'

export default async function page({ params }) {
  const { id } = await params
  
  return (
    <div className="p-8">
      <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Blog List
      </Link>
      <h1 className="text-3xl font-bold mb-4">Blog Post {id}</h1>
      <p className="text-gray-700">This is the content for blog post {id}.</p>
    </div>
  )
}
