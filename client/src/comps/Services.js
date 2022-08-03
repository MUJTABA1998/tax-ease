import React from "react";
import "../css/Services.css";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";

const Services = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);

  return (
    <section className="services-wrapper">
      <img src="/asset/serv2.png" alt="svg" />
      <h1>
        <span>Our</span> Services
      </h1>
      <div className="services-section">
        <div className="ntn-services-section service">
          <img src="/asset/aop.png" alt="ntn" />
          <h2>NTN Services</h2>
          {show && (
            <div className="ntn-serv">
              {" "}
              <Link
                to={`/user/${id}/ntn-registeration`}
                className="service-sec"
                onClick={() => navigate(`/user/${id}/ntn-registeration`)}
              >
                <img src="/asset/ntn.png" alt="ntn" />
                <h2>NTN Regsitration</h2>
              </Link>
              <Link
                to={`/user/${id}/aop-registeration`}
                className="service-sec"
              >
                <img src="/asset/aop.png" alt="ntn" />
                <h2>AOP / Pertnership Regsitration</h2>
              </Link>
              <Link
                to={`/user/${id}/sole-registeration`}
                className="service-sec"
              >
                <img src="/asset/sole.png" alt="ntn" />
                <h2>Sole proprietor</h2>
              </Link>
            </div>
          )}
          <h4 onClick={() => setShow(!show)}>
            {show ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
          </h4>
        </div>
        <Link to={`/user/${id}/tax-return`} className="service">
          <img src="/asset/tax.png" alt="ntn" />
          <h2>file Tax Return</h2>
          <Link to={`/user/${id}/tax-return`} className="read-link">
            <FaAngleDoubleDown
              style={{ color: "#2bcbba", marginTop: "20px" }}
            />
          </Link>
        </Link>
        <Link to={`/user/${id}/tax-return`} className="service">
          <img src="/asset/sole.png" alt="ntn" />
          <h2>Compliance Audit Notice</h2>
          <Link to={`/user/${id}/tax-return`} className="read-link">
            <FaAngleDoubleDown
              style={{ color: "#2bcbba", marginTop: "20px" }}
            />
          </Link>
        </Link>
      </div>
    </section>
  );
};

export default Services;
