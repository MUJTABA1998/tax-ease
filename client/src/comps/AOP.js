import React, { useEffect, useState } from "react";
import "../css/Aop.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FiFilePlus } from "react-icons/fi";
import Loader from "./Loader";



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
    deed: null,
    cert: null,
    cnic: null,
    bill: null,
    lHead: null,
    rent: null,
    auth: null,
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
      docs.deed !== null &&
      docs.cert !== null &&
      docs.cnic !== null &&
      docs.auth !== null &&
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

            const res = await axios.post('/upload/aop', formData, {
                headers: { 'Content-Type': 'multipart/form-data'}
            })

            if(res.data.success === true){
                setCart([
                    ...cart, {id: Math.floor(Math.random() *10000), title: 'Aop / partnership ntn registration', price: 4000}
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
          <img src="/asset/aop.png" alt="aop" />
          <h1>aop / partnership NTN resgisteration</h1>
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
                <input type="file" name="deed" onChange={handleDocs} />
                <h5>partnership deed duly signed from registrar of firms</h5>
                {docs.deed !== null ? (
                  <div className="file-name">{docs.deed.name}</div>
                ) : (
                  <FiFilePlus className="file-icon" />
                )}
              </label>
              <label className="file-input">
                <input type="file" name="cert" onChange={handleDocs} />
                <h5>
                  partnership resgisteration cerificate issued by registrar
                </h5>
                {docs.cert !== null ? (
                  <div className="file-name">{docs.cert.name}</div>
                ) : (
                  <FiFilePlus className="file-icon" />
                )}
              </label>
              <label className="file-input">
                <input type="file" name="cnic" onChange={handleDocs} />
                <h5>colored copy of CNIcC of all partners</h5>
                {docs.cnic !== null ? (
                  <div className="file-name">{docs.cnic.name}</div>
                ) : (
                  <FiFilePlus className="file-icon" />
                )}
              </label>
              <label className="file-input">
                <input type="file" name="auth" onChange={handleDocs} />
                <h5>
                  authority leeter in favour of a partner to represent
                  connection
                </h5>
                {docs.auth !== null ? (
                  <div className="file-name">{docs.auth.name}</div>
                ) : (
                  <FiFilePlus className="file-icon" />
                )}
              </label>
              <label className="file-input">
                <input type="file" name="rent" onChange={handleDocs} />
                <h5>rent agreement ownership documents of partnership</h5>
                {docs.rent !== null ? (
                  <div className="file-name">{docs.rent.name}</div>
                ) : (
                  <FiFilePlus className="file-icon" />
                )}
              </label>
              <label className="file-input">
                <input type="file" name="lHead" onChange={handleDocs} />
                <h5>letterhead of the firm</h5>
                {docs.lHead !== null ? (
                  <div className="file-name">{docs.lHead.name}</div>
                ) : (
                  <FiFilePlus className="file-icon" />
                )}
              </label>
              <label className="file-input">
                <input type="file" name="bill" onChange={handleDocs} />
                <h5>late paid electercity bill of registered office</h5>
                {docs.bill !== null ? (
                  <div className="file-name">{docs.bill.name}</div>
                ) : (
                  <FiFilePlus className="file-icon" />
                )}
              </label>
              <button className="aop-sub" onClick={handleSubmit}>Submit</button>
            </div>
          ) : (
            <div className="actions">
            <button className="next" onClick={handleNext}>
              Next
            </button>
            <button className="next" onClick={() => navigate(`/user/${id}/services`)}>
              Back
            </button>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default AOP;
