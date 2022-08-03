const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;
const connectDB = require("./db/db");
const User = require("./db/models/user");
const fileUpload = require("express-fileupload");
const NTN = require("./db/models/ntn");
const AOP = require("./db/models/aop");
const Sole = require("./db/models/sole");
const dotenv = require("dotenv");
const Tax = require("./db/models/tax");
const Lawyers = require("./db/models/lawyer");

const app = express();
connectDB();
dotenv.config({ path: "./keys.env" });

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload());

app.use("/api/user", require("./routes/index"));

app.post("/upload/ntn-data", async (req, res) => {
  const files = req.files.files;
  const [id, email] = req.body.data;
  console.log(req.body.data);

  const fileData = [];

  try {
    files.forEach((file) => {
      fileData.push(file.name);
      file.mv(`${__dirname}/client/build/Uploads/NTN/${file.name}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
    const data = new NTN({
      id,
      email,
      fileData,
    });
    await data.save();
    return res.json({
      message: "Uploaded successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: "internal server error",
    });
  }
});

app.post("/upload/tax/docs", async (req, res) => {
  const files = req.files.fileData;
  files.forEach((file) => {
    file.mv(`${__dirname}/client/build/Uploads/TAX/${file.name}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
});

app.post("/upload/aop", async (req, res) => {
  const files = req.files.fileData;
  const id = req.body.id;
  const email = req.body.email;
  const business = req.body.business;
  const phone = req.body.phone;
  const filesData = [];

  files.forEach((file) => {
    filesData.push(file.name);
    file.mv(`${__dirname}/client/build/Uploads/AOP/${file.name}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });

  try {
    const aopUser = new AOP({
      id,
      business,
      email,
      phone,
      filesData,
    });
    await aopUser.save();

    return res.json({
      message: "Succesfully uploaded",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: "internal Server Error",
      success: false,
    });
  }
});

app.post("/upload/sole", async (req, res) => {
  const files = req.files.fileData;
  const id = req.body.id;
  const email = req.body.email;
  const business = req.body.business;
  const phone = req.body.phone;
  const filesData = [];

  files.forEach((file) => {
    filesData.push(file.name);
    file.mv(`${__dirname}/client/build/Uploads/SOLE/${file.name}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });

  try {
    const soleUser = new Sole({
      id,
      business,
      email,
      phone,
      filesData,
    });
    await soleUser.save();

    return res.json({
      message: "Succesfully uploaded",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: "internal Server Error",
      success: false,
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      return res.json({
        user,
        message: "login successful",
      });
    } else {
      return res.json({
        message: "Invalid credentials!",
      });
    }
  } catch (error) {
    return res.json({
      message: "internal server error",
    });
  }
});

app.post("/user/file-tax-return", async (req, res) => {
  const {
    id,
    ntnCred,
    personal,
    incomeType,
    taxes,
    amount,
    bankState,
    jewllery,
    property,
    vehicles,
    docs,
  } = req.body;
  console.log(req.body);
  try {
    const newInstant = new Tax({
      id,
      name: personal.name,
      email: personal.email,
      phone: personal.phone,
      cnic: personal.cnic,
      nationality: personal.nat,
      residence: personal.resi,
      occupation: personal.occup,
      ntnNumber: ntnCred.number,
      ntnUsername: ntnCred.name,
      ntnPin: ntnCred.pin,
      ntnPassword: ntnCred.password,
      docs,
      incomeType,
      taxesData: taxes,
      bankState,
      amount,
      jewllery,
      vehicles,
      property,
    });

    await newInstant.save();

    return res.json({
      message: "Successfully Submitted",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

app.get("/api/aop/requests/", async (req, res) => {
  try {
    const users = await AOP.find();
    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error",
      success: false,
    });
  }
});
app.get("/api/sole/requests/", async (req, res) => {
  try {
    const users = await Sole.find();
    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error",
      success: false,
    });
  }
});
app.get("/api/ntn/requests/", async (req, res) => {
  try {
    const users = await NTN.find();
    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error",
      success: false,
    });
  }
});
app.get("/api/tax/requests/", async (req, res) => {
  try {
    const users = await Tax.find();
    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

app.get("/api/aop-user/aop/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await AOP.findOne({ _id: id });
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      error,
    });
  }
});

app.get("/api/ntn-user/ntn/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await NTN.findOne({ _id: id });
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      error,
    });
  }
});
app.get("/api/sole-user/sole/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Sole.findOne({ _id: id });
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      error,
    });
  }
});
app.get("/api/tax-user/tax/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Tax.findOne({ _id: id });
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      error,
    });
  }
});

app.get("/api/lawyers", async (req, res) => {
  try {
    const data = await Lawyers.find();
    return res.json({
      data,
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error",
    });
  }
});

app.post("/api/add-lawyer", async (req, res) => {
  try {
    await Lawyers.create(req.body);
    return res.json({
      message: "Successfully Created",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.use(
    "/uploads",
    express.static(path.resolve(__dirname, "client", "build", "Uploads"))
  );
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
