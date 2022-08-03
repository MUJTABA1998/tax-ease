import React from 'react'
import '../css/Loader.css'
import { SpinnerDotted } from 'spinners-react'

const Loader = () => {
  return (
    <section className='loader'>
        <h1>Tax ease</h1>
        <p>your digital tax advisor</p>
        <SpinnerDotted size={50} thickness={200} speed={100} color="#0fb9b1" />
    </section>
  )
}

export default Loader