
const express = require('express');
const router = express.Router();

const {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
} = require('../controllers/employeeController');

const upload = require('../middleware/upload');


router.get('/employees', getAllEmployees);

router.post('/employees', upload.single('profile_pic'), createEmployee);


router.get('/employees/:eid', getEmployeeById);


router.put('/employees/:eid', upload.single('profile_pic'), updateEmployeeById);


router.delete('/employees', deleteEmployeeById);

module.exports = router;
