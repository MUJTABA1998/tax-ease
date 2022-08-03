import React, { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import "../../css/Tax.css";
import { useNavigate, useParams } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import Select from "react-select";
import BarLoader from "react-spinners/BarLoader";
import makeAnimated from "react-select/animated";
import axios from "axios";

const animatedComponents = makeAnimated();

const incomeoptions = [
  { value: "salary", label: "salary" },
  { value: "business", label: "business" },
  { value: "property", label: "property" },
  { value: "capital gain", label: "capital gain" },
];

const Tax = ({ cart, setCart }) => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [ntn, setNtn] = useState(true);
  const { id } = useParams();
  const [tab, setTab] = useState(1);

  const [ntnCred, setNtnCred] = useState({
    number: "",
    pin: "",
    password: "",
    name: "",
  });

  const [personal, setPersonal] = useState({
    name: "",
    email: "",
    phone: "",
    cnic: "",
    occup: "",
    nat: "",
    resi: "",
  });

  const [incomeDocs, setIncomeDocs] = useState([]);

  const [incomeType, setIncomeType] = useState([]);

  const [taxes, setTaxes] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  });

  const handleCred = (e) => {
    e.preventDefault();
    setNtnCred({
      ...ntnCred,
      [e.target.name]: e.target.value,
    });
  };

  const handlePersonal = (e) => {
    e.preventDefault();
    setPersonal({
      ...personal,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setTaxes([...taxes, value]);
    } else {
      setTaxes([taxes.filter((tax) => tax !== value)]);
    }
  };

  const toggleTab = (index) => {
    setTab(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      ntnCred.name === "" ||
      ntnCred.number === "" ||
      ntnCred.pin === "" ||
      ntnCred.password === ""
    ) {
      alert("All credentials are require!");
      toggleTab(1);
    }

    if (
      personal.name === "" ||
      personal.email === "" ||
      personal.cnic === "" ||
      personal.phone === "" ||
      personal.nat === "" ||
      personal.resi === "" ||
      personal.occup === ""
    ) {
      alert("All fields are require!");
      toggleTab(2);
    }
    if (incomeType.length <= 0) {
      alert("Enter Income source!");
      toggleTab(3);
    }
    if (taxes.length <= 0) {
      alert("Tax deduction source require!");
      toggleTab(4);
    } else {
      const data = JSON.stringify({
        id,
        ntnCred,
        personal,
        incomeType,
        docs,
        taxes,
        bankState: bankSt.name,
        amount: wealth.cHand,
        jewllery: wealth.jewllery,
        vehicles: wealth.vehicle,
        property: wealth.property,
      });

      const res = await axios.post("/user/file-tax-return", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res);

      if (res.data.success === true) {
        setCart([
          ...cart,
          {
            id: Math.floor(Math.random() * 10000),
            title: "File Tax Return",
            price: 5000,
          },
        ]);
        navigate(`/user/${id}/cart`);
      }
    }
  };

  const changeIncomeSource = (value) => {
    setIncomeType(value.map((v) => v.value));
    setUpSt(false);
  };

  const handleDocs = (e) => {
    setIncomeDocs([
      ...incomeDocs,
      { name: e.target.name, file: e.target.files[0] },
    ]);
  };

  const [uploadProgress, setUploadProgress] = useState(true);
  const [upSt, setUpSt] = useState(false);
  const [bankSt, setBankSt] = useState(null);
  const [docs, setDocs] = useState([]);

  const handleUploadDocs = async (e) => {
    e.preventDefault();

    if (incomeDocs.length !== 0) {
      setUploadProgress(true);
      const fileData = new FormData();
      fileData.append("fileData", bankSt);
      incomeDocs.forEach((val) => fileData.append("fileData", val.file));
      incomeDocs.forEach((val) => setDocs([...docs, val.file.name]));

      await axios.post("/upload/tax/docs", fileData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  };

  useEffect(() => {
    if (uploadProgress === true) {
      setUpSt(true);
      setTimeout(() => {
        setUploadProgress(false);
        setUpSt(false);
      }, 2000);
    }
  }, [setUpSt, uploadProgress]);

  const [wealth, setWealth] = useState({
    cHand: "",
    jewllery: "",
    vehicle: "",
    property: "",
  });

  const handleWealth = (e) => {
    setWealth({
      ...wealth,
      [e.target.name]: e.target.value,
    });
  };

  console.log(docs);

  return (
    <>
      {loading ? (
        <div className="loader">
          <BounceLoader size={30} color="#636e72" />
        </div>
      ) : (
        <section className="file-tax-wrapper">
          {ntn ? (
            <div className="ntn">
              <img src="/asset/tax.png" alt="tax-return-file" />
              <h3>are registered in NTN?</h3>
              <div className="radio">
                <button className="yes" onClick={() => setNtn(false)}>
                  <BsCheckCircleFill /> YES
                </button>
                <button
                  className="no"
                  onClick={() => navigate(`/user/${id}/ntn-registeration`)}
                >
                  <IoCloseCircle /> NO
                </button>
              </div>
            </div>
          ) : (
            <div className="tabs-wrapper">
              <div className={tab === 1 ? `active-tab` : "tab"}>
                <h2>share NTN credientials</h2>
                <div className="cred-form">
                  <input
                    type="text"
                    placeholder="NTN Number"
                    name="number"
                    onChange={handleCred}
                  />
                  <input
                    type="text"
                    placeholder="NTN Username"
                    name="name"
                    onChange={handleCred}
                  />
                  <input
                    type="password"
                    placeholder="NTN Pin"
                    name="pin"
                    onChange={handleCred}
                  />
                  <input
                    type="password"
                    placeholder="NTN Password"
                    name="password"
                    onChange={handleCred}
                  />
                </div>
                <button className="btn" onClick={() => toggleTab(2)}>
                  next
                </button>
              </div>
              <div className={tab === 2 ? `active-tab` : "tab"}>
                <h2>Personal information</h2>
                <div className="cred-form">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={handlePersonal}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handlePersonal}
                  />
                  <input
                    type="text"
                    placeholder="Identy card number"
                    name="cnic"
                    onChange={handlePersonal}
                  />
                  <input
                    type="text"
                    placeholder="Contact Number"
                    name="phone"
                    onChange={handlePersonal}
                  />
                  <select
                    className="select"
                    name="nat"
                    onChange={handlePersonal}
                  >
                    <option>Select Nationality</option>
                    <option>Pakistan</option>
                    <option>Foreigner</option>
                  </select>
                  <select
                    className="select"
                    name="resi"
                    onChange={handlePersonal}
                  >
                    <option>Select Residence</option>
                    <option>Residence</option>
                    <option>Non-Residence</option>
                  </select>
                  <select
                    className="select"
                    name="occup"
                    onChange={handlePersonal}
                  >
                    <option>Select Occupation</option>
                    <option>Corporate Sector</option>
                    <option>Fedral Govt</option>
                    <option>Provisional Govt</option>
                    <option>other</option>
                  </select>
                </div>
                <div className="action">
                  <button className="btn btn-2" onClick={() => toggleTab(1)}>
                    Previous
                  </button>
                  <button className="btn" onClick={() => toggleTab(3)}>
                    next
                  </button>
                </div>
              </div>
              <div className={tab === 3 ? `active-tab` : "tab"}>
                <h2>Enter your income sources</h2>

                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={incomeoptions}
                  onChange={changeIncomeSource}
                  className="multi-select"
                />
                <div style={{ marginTop: "50px", marginBottom: "100px" }}>
                  {incomeType.length !== 0 ? (
                    <h2>Upload following document</h2>
                  ) : null}
                  {incomeType.map((el, index) => (
                    <label key={index}>
                      <h5>{el} Document</h5>
                      <input type="file" name={el} onChange={handleDocs} />
                    </label>
                  ))}
                  {incomeType.length !== 0 ? (
                    <label>
                      <h5>Bank statement</h5>
                      <input
                        type="file"
                        onChange={(e) => setBankSt(e.target.files[0])}
                      />
                    </label>
                  ) : null}
                  <br />
                  <div className="progress">
                    {uploadProgress ? (
                      <BarLoader
                        size={50}
                        color="#0fb9b1"
                        width={100}
                        style={{ marginLeft: "10%", width: "80%" }}
                      />
                    ) : null}
                    <br />
                    <br />
                    {upSt === true ? (
                      <p
                        style={{
                          textAlign: "center",
                          width: "100%",
                          color: "#0fb9b1",
                        }}
                      >
                        Upload successfully done!
                      </p>
                    ) : null}
                  </div>
                  {incomeType.length !== 0 ? (
                    <button
                      className="btn"
                      style={{ marginLeft: "30%" }}
                      onClick={handleUploadDocs}
                    >
                      Upload
                    </button>
                  ) : null}
                </div>
                <div className="action">
                  <button className="btn btn-2" onClick={() => toggleTab(2)}>
                    Previous
                  </button>
                  <button className="btn" onClick={() => toggleTab(4)}>
                    next
                  </button>
                </div>
              </div>
              <div className={tab === 4 ? `active-tab` : "tab"}>
                <h2>here some common withholding taxes</h2>
                <p>you might pay at the time of transaction</p>
                <div className="withholding">
                  <div className="chk">
                    <input
                      type="checkbox"
                      id="chk1"
                      name="taxes"
                      value="bank transation"
                      onChange={handleCheck}
                    />
                    <label htmlFor="chk1">Bank Transaction</label>
                  </div>
                  <div className="chk">
                    <input
                      type="checkbox"
                      id="chk2"
                      name="taxes"
                      value="vehicles"
                      onChange={handleCheck}
                    />
                    <label htmlFor="chk2">Vehicles</label>
                  </div>
                  <div className="chk">
                    <input
                      type="checkbox"
                      id="chk3"
                      name="taxes"
                      value="utilities Bills"
                      onChange={handleCheck}
                    />
                    <label htmlFor="chk3">Utilities</label>
                  </div>
                  <div className="chk">
                    <input
                      type="checkbox"
                      id="chk4"
                      name="taxes"
                      value="others"
                      onChange={handleCheck}
                    />
                    <label htmlFor="chk4">others</label>
                  </div>
                </div>
                <div className="action">
                  <button className="btn btn-2" onClick={() => toggleTab(3)}>
                    Previous
                  </button>
                  <button className="btn" onClick={() => toggleTab(5)}>
                    next
                  </button>
                </div>
              </div>
              <div className={tab === 5 ? `active-tab` : "tab"}>
                <h2>wealth statement</h2>
                <p>
                  for reconcilation enter wealth amount at the begining of year
                  2021
                </p>
                <div className="amount">
                  <input
                    type="number"
                    placeholder="Cash in hand"
                    onChange={handleWealth}
                    name="cHand"
                    required
                  />
                  <br />
                  <input
                    type="number"
                    placeholder="Estimated jewllery cost"
                    onChange={handleWealth}
                    name="jewllery"
                    required
                  />
                  <br />
                  <input
                    type="number"
                    placeholder="Estimated vheicle cost"
                    onChange={handleWealth}
                    name="vheicle"
                    required
                  />
                  <br />
                  <input
                    type="number"
                    placeholder="Estimated property cot"
                    onChange={handleWealth}
                    name="property"
                    required
                  />
                  <br />
                </div>
                <div className="action-btn">
                  <button className="btn btn-2" onClick={() => toggleTab(4)}>
                    Previous
                  </button>
                </div>
                <button className="btn-submit" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Tax;

// <p>you can Add more than one your income source</p>
//                 <div className="income-source">
//                   <input
//                     type="text"
//                     placeholder="Your Income Source"
//                     value={income}
//                     onChange={handleIncome}
//                   />
//                   <button
//                     className="btn"
//                     onClick={() => {
//                       setSources([...sources, income]);
//                       setIncome("");
//                     }}
//                   >
//                     ADD
//                   </button>
//                 </div>
//                 <ul className="source-list">
//                   {sources.map((source, index) => (
//                     <li key={index}>
//                       <BsCheckCircleFill className="check" /> {source}{" "}
//                       <IoCloseCircle
//                         className="del"
//                         onClick={() => handleRemove(source)}
//                       />
//                     </li>
//                   ))}
//                 </ul>
