const express = require("express");
const employee = require("./model");
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path'); 
require('dotenv').config();
require('./db');

const app = express();
const port = 9999;

app.use(bodyParser.json());
app.use(cors());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); 
    cb(null, Date.now() + ext); 
  }
});
const upload = multer({ storage: storage });

app.post("/list", async (req, res) => {
  try {
    const employees = await employee.find();
    if (employees.length > 0) {
      return res.status(200).json({ success: true, message: "Employees retrieved successfully", employees });
    } else {
      return res.status(404).json({ success: false, message: "No employees found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
app.post("/insert", upload.single('image'), (req, res) => {
  console.log("Tried to insert------------------------");
  const imagePath = req.file ? req.file.filename : null; 
  const { name, role, thoughts,image } = req.body;
  
  const newEmployee = new employee({
    image,
    name,
    role,
    thoughts,
  });

  newEmployee.save()
    .then(result => {
      console.log("Done inserting");
      return res.status(201).json({ success: true, message: "Employee entered successfully" });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    });
});
app.post("/search", async (req, res) => {
  try {
    const { name } = req.body;
    const existingEmployee = await employee.findOne({ name: { $regex: new RegExp(name, "i") } });

    if (existingEmployee) {
      return res.status(200).json({ success: true, message: "Employee found", employee: existingEmployee });
    } else {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log("Server running on " + port);
});
