import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/Account.css'
import { RiCloseFill } from 'react-icons/ri'

const SignIn = () => {

  const navigate = useNavigate()
  const [ msg , setMsg ] = useState('')

  const [ input, setInput ] = useState({
    email: "", password: ""
  })

  const handleChange = e => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
  }

  const handleLogin = async () => {
    const { email, password } = input;
   if(email === 'taxeaseadmin@services.com' && password === 'tax-ease-admin'){
      navigate('/tax-ease-admin/main')
   }
   else{
    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    const data = await res.json()
    if(data.user !== null || data.user !== undefined){
      
      setMsg(data.message)
      navigate(`/user/${data.user._id}/services`, {replace: false})
    }
    else{
      setMsg(data.message)
      setInput({
        email: '', password: ''
      })
    }
   }
  }



  return (
    <section className="account">
    <div className="circle"></div>
    {msg && <h5 className="msg-signIn">{msg} <span><RiCloseFill onClick={() => setMsg('')}/></span></h5>}
      <div className="signin-form">
        <h3>Login your account</h3>
        <input type="email" name="email" placeholder="Email Address" value={input.email} onChange={handleChange} required className="s-input"/>   
        <input type="password" name="password" placeholder="Password" value={input.password} onChange={handleChange} required className="s-input"/>  
        <button onClick={handleLogin}>Get start</button> 
      </div>
      <div className="create-acc">
        <h3>have not an account?</h3>
        <Link to="/create-account">Create an account</Link>
      </div>
      <div className="circle2"></div>
    </section>
  );
};

export default SignIn;
