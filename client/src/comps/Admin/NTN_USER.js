import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/Users.css";
import { TiArrowLeftThick } from "react-icons/ti";
import { AiOutlineDownload } from "react-icons/ai";
import { BounceLoader } from "react-spinners";

const NTN_USER = () => {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    const ftechUser = async () => {
      try {
        const res = await axios.get(`/api/ntn-user/ntn/${id}`);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    setTimeout(() => {
      ftechUser();
    }, 5000);
  }, [id, setUser]);

  return (
    <section className="aop-user">
      <Link to="/tax-ease-admin/ntn" className="back-arrow">
        <TiArrowLeftThick />
      </Link>
      {user === undefined ? (
        <div className="loader-aop">
          <BounceLoader size={30} color="#ecf0f1" />
        </div>
      ) : (
        <div className="user-content-wrapper">
          <h1>User Documents</h1>
          <div className="user-files">
            <h3
              style={{ color: "#fff", fontSize: "13px", marginBottom: "20px" }}
            >
              {user.email}
            </h3>
            {user.fileData.map((file, index) => (
              <div className="file-wrapper" key={index}>
                <img src={`/uploads/NTN/${file}`} alt={file} />
                <div className="action-section">
                  <a href={`/uploads/NTN/${file}`} download>
                    <AiOutlineDownload />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default NTN_USER;
