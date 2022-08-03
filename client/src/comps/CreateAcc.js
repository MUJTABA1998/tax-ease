import React, { useState } from 'react'
import '../css/Account.css'
import { Link, useNavigate } from 'react-router-dom'

const CreateAcc = () => {


  const [ input, setInput ] = useState({
    email: "", phone: "", password: ""
  })

  const [ message, setMessage] = useState('')
  const navigate = useNavigate()


  const handleChange = e => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
   
   const {email, phone, password } = input;
    
   await fetch('/api/user/', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, phone, password
      })
   })
    .then(res => res.json())
    .then(data => {
      setMessage(data.message)
      if(data.success === true){
        setInput({
          email: '', phone: '', password: ''
        })
        setMessage(data.message)
        setTimeout(() => {
          navigate('/')
        },2000)
      }
    })

    
    
  }

  


  return (
    <section className='create-account account'>
        <h2>tax ease</h2>
        <p>your digital tax advisor</p>
        { message !== '' ? <h5 className='message-acc'>{message+ `...`} <Link to="/">Login here</Link></h5> : ''}
        <div className='new-acc-form'>
            <input type="email" name="email" placeholder='Email Address' value={input.email} onChange={handleChange} required />
            <input type='tel' name="phone" placeholder='03XXXXXXXXX' onChange={handleChange} value={input.phone} required />
            <input type='password' name="password" placeholder='Password' onChange={handleChange} value={input.password} required />
            <button onClick={handleSubmit}>Create an account</button>
        </div>
        <Link to="/" className='acc-exist'>already have an account ?</Link>
        <div className="circle2"></div>
    </section>
  )
}

export default CreateAcc