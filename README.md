# 101401959 – COMP3123 Assignment 1 & 2 Backend

Student Name: **Hussein Bani Khaled**  
Student ID: **101401959**  

Backend for COMP3123 Assignment 1 & 2 using **Node.js**, **Express**, and **MongoDB**.  
Provides REST APIs for **user auth (signup/login)** and **employee management (CRUD + search + profile picture upload)**.

---

## 🔧 Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT (for login token)
- Multer (file upload for employee profile pictures)
- dotenv (environment variables)
- CORS

---


## ⚙️ Setup & Run

npm install

## create .env file

## backend runs at 
http://localhost:4000
Base path: /api/v1


## User EndPoints
Base path: /api/v1/user

POST /signup – Create new user

Body: { "username", "email", "password" }

Response: 201 Created

POST /login – Login with email or username + password

Body: { "email" OR "username", "password" }

Response: 200 OK with { token }

Token is used in frontend and stored in localStorage.


## Employee Endpoints 
Base path: /api/v1/emp

All responses follow the assignment format (e.g. employee_id, first_name, etc.)

GET /employees

List all employees (200)

POST /employees

Create employee (201)

Accepts multipart/form-data with fields:

first_name, last_name, email, position, salary, date_of_joining, department

Optional file: profile_pic (image)

GET /employees/:eid

Get one employee by ID (200)

Returns:

employee_id, first_name, last_name, email, position, salary, date_of_joining, department

profile_pic_url (if picture uploaded)

PUT /employees/:eid

Update employee (200)

Accepts multipart/form-data (same fields as POST + optional profile_pic)

DELETE /employees?eid=xxx

Delete employee (204 No Content)


