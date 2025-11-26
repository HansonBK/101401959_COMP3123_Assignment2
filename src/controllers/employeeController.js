
const Employee = require('../models/Employee');


const formatEmployee = (emp) => ({
  employee_id: emp._id,
  first_name: emp.first_name,
  last_name: emp.last_name,
  email: emp.email,
  position: emp.position,
  salary: emp.salary,
  date_of_joining: emp.date_of_joining,
  department: emp.department,
  profile_pic: emp.profile_pic || null,
  profile_pic_url: emp.profile_pic
    ? `http://localhost:4000/uploads/${emp.profile_pic}`
    : null,
});


exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json(employees.map(formatEmployee));
  } catch (err) {
    console.error('Get employees error:', err);
    return res.status(500).json({ message: 'Error fetching employees' });
  }
};


exports.createEmployee = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !position ||
      !salary ||
      !date_of_joining ||
      !department
    ) {
      return res.status(400).json({
        status: false,
        message: 'All employee fields are required',
      });
    }

    const data = {
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department,
    };

   
    if (req.file) {
      data.profile_pic = req.file.filename;
    }

    const employee = await Employee.create(data);

    return res.status(201).json({
      message: 'Employee created successfully.',
      employee_id: employee._id,
    });
  } catch (err) {
    console.error('Create employee error:', err);
    return res.status(500).json({
      message: 'Error creating employee',
      error: err.message,
    });
  }
};


exports.getEmployeeById = async (req, res) => {
  try {
    const { eid } = req.params;
    const employee = await Employee.findById(eid);

    if (!employee) {
      return res.status(404).json({
        status: false,
        message: 'Employee not found',
      });
    }

    return res.status(200).json(formatEmployee(employee));
  } catch (err) {
    console.error('Get employee by id error:', err);
    return res.status(500).json({
      message: 'Error fetching employee',
      error: err.message,
    });
  }
};

exports.updateEmployeeById = async (req, res) => {
  try {
    const { eid } = req.params;

    const updateData = {
      ...req.body,
      updated_at: Date.now(),
    };

   
    if (req.file) {
      updateData.profile_pic = req.file.filename;
    }

    const employee = await Employee.findByIdAndUpdate(eid, updateData, {
      new: true,
    });

    if (!employee) {
      return res.status(404).json({
        status: false,
        message: 'Employee not found',
      });
    }

    return res.status(200).json({
      message: 'Employee details updated successfully.',
    });
  } catch (err) {
    console.error('Update employee error:', err);
    return res.status(500).json({
      message: 'Error updating employee',
      error: err.message,
    });
  }
};


exports.deleteEmployeeById = async (req, res) => {
  try {
    const { eid } = req.query;

    if (!eid) {
      return res.status(400).json({
        status: false,
        message: 'eid query parameter is required',
      });
    }

    const employee = await Employee.findByIdAndDelete(eid);

    if (!employee) {
      return res.status(404).json({
        status: false,
        message: 'Employee not found',
      });
    }

    return res.status(204).send();
  } catch (err) {
    console.error('Delete employee error:', err);
    return res.status(500).json({
      message: 'Error deleting employee',
      error: err.message,
    });
  }
};
