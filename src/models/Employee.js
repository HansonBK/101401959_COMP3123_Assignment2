
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  date_of_joining: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  profile_pic: {
  type: String,
  default: null
  },

});


employeeSchema.pre('save', function () {
  this.updated_at = Date.now();
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
