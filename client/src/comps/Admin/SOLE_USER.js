import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../../css/Users.css'
import { TiArrowLeftThick } from 'react-icons/ti'
import { AiOutlineDownload } from 'react-icons/ai'
import { BounceLoader } from "react-spinners";

const AOP_USER = () => {


    const { id } = useParams()
    const [ user, setUser ] = useState()


    useEffect(() => {

        const ftechUser = async() => {
            try {
                const res = await axios.get(`/api/sole-user/sole/${id}`);
                setUser(res.data.user)
            } catch (error) {
                console.log(error)
            }
        }

       setTimeout(() => {
        ftechUser()
       }, 5000)
    }, [  id, setUser ])



    

    

  return (
   <section className='aop-user'>
    <Link to="/tax-ease-admin/aop" className='back-arrow'><TiArrowLeftThick/></Link>
    {
        user === undefined ?
        <div className="loader-aop">
          <BounceLoader size={30} color="#ecf0f1" />
        </div> :
        <div className='user-content-wrapper'>
            <h2>{user.business}</h2>
            <h4>{user.email}</h4>
            <h5>{user.phone}</h5>
            <h1>User Documents</h1>
            <div className='user-files'>
            {
                user.filesData.map((file, index) => (
                    <div className='file-wrapper' key={index} >
                        <img src={`/uploads/SOLE/${file}`} alt={file} />
                        <div className='action-section'>
                            <a href={`/uploads/SOLE/${file}`} download ><AiOutlineDownload/></a>
                        </div>
                    </div>
                ))
               }
            </div>
        </div>
    }
   </section>
  )
}

export default AOP_USER