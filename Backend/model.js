const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true, 
  },
  thoughts: {
    type: String,
    required : true,
  }
});

const Employee = mongoose.model('Employeeee', userSchema);
module.exports = Employee;
