import React, { useEffect, useState } from "react";
import "../css/Aop.css";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiFilePlus } from "react-icons/fi";
import Loader from "./Loader";
import { BsArrowLeft } from 'react-icons/bs'

const AOP = ({ cart, setCart }) => {


  const [user, setUser] = useState({});
  const { id } = useParams();
  const [next, setNext] = useState(false);
  const [input, setInput] = useState({
    business: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()



  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (input.business !== "") {
      setNext(true);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      await axios.get(`/api/user/${id}`).then((res) => setUser(res.data.user));
    };
    fetchUser();
    setInterval(() => {
      setLoading(false);
    }, 5000);
  }, [setUser, id]);

  const [docs, setDocs] = useState({
    cnic: null,
    bill: null,
    lHead: null,
    rent: null,
  });

  const handleDocs = (e) => {
    e.preventDefault();
    setDocs({
      ...docs,
      [e.target.name]: e.target.files[0],
    });
  };

  const userData = {
    id: user._id,
    business: input.business,
    email: `${input.email !== "" ? input.email : user.email}`,
    phone: input.phone !== "" ? input.phone : user.phone,
};


  const handleSubmit = async (e) => {

    e.preventDefault();
    if (
      docs.cnic !== null &&
      docs.bill !== null &&
      docs.lHead !== null &&
      docs.rent !== null
    ) {
        try {
            const formData = new FormData();
            
            Object.values(docs).forEach(val => formData.append("fileData", val))
            formData.append("email", userData.email);
            formData.append("id", userData.id)
            formData.append("business", userData.business)
            formData.append("phone", userData.phone)

            const res = await axios.post('/upload/sole', formData, {
                headers: { 'Content-Type': 'multipart/form-data'}
            })

            console.log(res)
            if(res.data.success === true){
                setCart([
                    ...cart, {id: Math.floor(Math.random() *10000), title: 'sole proprietor registration', price: 1000}
                ])
                navigate(`/user/${id}/cart`)
            }

        } catch (error) {
            console.log(error)
        }
    }
    else{
        alert("All documents are required")
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="aop">
        <Link to={`/user/${id}/services`} className="back"><BsArrowLeft /></Link>
          <h1>Sole proprietor NTN resgisteration</h1>
          <div className="aop-form">
            <input
              type="text"
              placeholder="Business Name"
              name="business"
              value={input.business}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Business Name"
              value={input.email !== "" ? input.email : user.email}
              name="email"
              onChange={handleChange}
            />
            <input
              type="tel"
              placeholder="Business Name"
              value={input.phone !== "" ? input.phone : user.phone}
              name="phone"
              onChange={handleChange}
            />
          </div>
          {next ? (
            <div className="files-section">
              <h3>upload following documents</h3>
              
             
              <label className="file-input">
                <input type="file" name="cnic" onChange={handleDocs} />
                <h5>colored copy of CNIC</h5>
                {docs.cnic !== null ? (
                  <div className="file-name">{docs.cnic.name}</div>
                ) : (
                  <FiFilePlus className="file-icon" />
                )}
              </label>
              <label className="file-input">
                <input type="file" name="rent" onChange={handleDocs} />
                <h5>rent agreement ownership documents</h5>
                {docs.rent !== null ? (
                  <div className="file-name">{docs.rent.name}</div>
                ) : (
                  <FiFilePlus className="file-icon" />
                )}
              </label>
              <label className="file-input">
                <input type="file" name="lHead" onChange={handleDocs} />
                <h5>letterhead of the company</h5>
                {docs.lHead !== null ? (
                  <div className="file-name">{docs.lHead.name}</div>
                ) : (
                  <FiFilePlus className="file-icon" />
                )}
              </label>
              <label className="file-input">
                <input type="file" name="bill" onChange={handleDocs} />
                <h5>late paid utility bill</h5>
                {docs.bill !== null ? (
                  <div className="file-name">{docs.bill.name}</div>
                ) : (
                  <FiFilePlus className="file-icon" />
                )}
              </label>
              <button className="aop-sub" onClick={handleSubmit}>Submit</button>
            </div>
          ) : (
            <button className="next" onClick={handleNext}>
              Continue
            </button>
          )}
        </section>
      )}
    </>
  );
};

export default AOP;
