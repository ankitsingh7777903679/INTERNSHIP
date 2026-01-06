import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      <ul>
        <li>
           <Link href={`/course/course-details/course_1`}> p1</Link> 
        </li>

        <li>
           <Link href={`/course/course-details/course_2`}>p2</Link> 
        </li>

        <li>
           <Link href={`/course/course-details/course_3`}>p3</Link> 
        </li>

        <li>
           <Link href={`/course/course-details/course_4`}>p4</Link> 
        </li>
        
      </ul>
    </div>
  )
}

export default page
