import Link from 'next/link'
import React from 'react'

async function page({params}) {
  const resolvedParams = await params;
  return (
    <div>
        <p>
          hi 
            {resolvedParams.course_slug}
        </p>
    </div>
  )
}

export default page
