import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { FaUserSecret, FaServicestack } from 'react-icons/fa'
import { SiTheregister, SiApachesolr } from 'react-icons/si'
import { GiConcentrationOrb } from 'react-icons/gi'


const AdminSidebar = ({ sideBarRef, showSidebar }) => {
  return (
    <div className='admin-sidebar' ref={sideBarRef}>
    
        <nav>
            <Link to="/tax-ease-admin/main/" onClick={() => showSidebar()}><AiFillHome/> <span>Home</span></Link>
            <Link to="/tax-ease-admin/users/" onClick={() => showSidebar()}><FaUserSecret/> <span>All Users</span></Link>
            <Link to="/tax-ease-admin/ntn/" onClick={() => showSidebar()}><FaServicestack/> <span>NTN  requests</span></Link>
            <Link to="/tax-ease-admin/aop/" onClick={() => showSidebar()}><SiTheregister/> <span>AOP requests</span></Link>
            <Link to="/tax-ease-admin/sole/" onClick={() => showSidebar()}><SiApachesolr/> <span>Proprieter Requests</span></Link>
            <Link to="/tax-ease-admin/tax-return/" onClick={() => showSidebar()}><GiConcentrationOrb/> <span>Tax Return</span></Link>
        </nav>
    </div>
  )
}

export default AdminSidebar