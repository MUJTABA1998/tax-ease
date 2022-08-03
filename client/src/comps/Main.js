import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Main = () => {

  
  
  return (
    <section className='main-wrapper'>
        <Navbar/>
        <Outlet />
    </section>
  )
}

export default Main