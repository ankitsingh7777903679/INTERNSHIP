import Image from 'next/image'
import React from 'react'
import mingImage from "../../../public/brain.png"
import illa from "../../../public/illa.png"
function About() {
  return (
    <div>
      <h1 >about</h1>
      <div style={{ position: "relative", width: "400px", height: "400px" }}>
        <Image
          src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png"
          fill
          alt="brain"
        />
      </div>
    </div>
  )
}

export default About
