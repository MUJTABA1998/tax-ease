import React, { useState, useEffect } from "react";
import "../css/NtnReg.css";
import Uploader from "./Uploader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import { BsBoxArrowInLeft } from 'react-icons/bs'

const NtnReg = ({ cart, setCart }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const formData = new FormData();

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      if (user !== null) {
        formData.append("data", id);
        formData.append("data", user.email);
      }
      files.forEach((file) => {
        formData.append("files", file);
      });
      const res = await axios.post("/upload/ntn-data", formData, {
        headers: {
          "Content-Type": "multipart/from-data",
        },
      });
      if (res.data.success === true) {
        setCart([
          ...cart,
          {
            id: Math.floor(Math.random() * 1000),
            userId: id,
            title: "Ntn registration charges",
            price: 2000,
          },
        ]);
        navigate(`/user/${id}/cart`, { replace: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user/${id}`);
      console.log(res.data);
      setUser(res.data.user);
    };

    fetchUser();
  }, [id]);

  console.log(user);

  return (
    <section className="ntn-reg">
      <img src="/asset/ntn.png" alt="ntn" />
      <h4>to get resgiter in NTN upload your CNIC front and back picture</h4>
      <Uploader files={files} setFiles={setFiles} />
      <div className="ntn-actions">
        {files.length >= 2 ? (
          <button onClick={handleUpload}>upload</button>
        ) : null}
        <button onClick={() => navigate(`/user/${id}/services`)}>Back</button>
      </div>
    </section>
  );
};

export default NtnReg;
