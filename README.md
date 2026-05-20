# AWS Multi-Team Report System

## Overview

AWS Multi-Team Report System is a backend project built using Node.js, Express.js, PostgreSQL (AWS RDS), and AWS S3.

The system allows:

- Employee management
- Team management
- Employee-team mapping
- Report uploads to AWS S3
- Report metadata storage in PostgreSQL

---

# Tech Stack

- Node.js
- Express.js
- PostgreSQL
- AWS RDS
- AWS S3
- Multer
- Multer-S3

---

# Features

## Employee APIs

- Add employees
- View employees

## Team APIs

- Add teams
- View teams

## Mapping APIs

- Map employees to teams
- View employees in a team
- View teams of an employee

## Report APIs

- Upload reports/files to AWS S3
- Store report details in PostgreSQL

---

# Project Structure

```bash
team-report-system/
│
├── node_modules/
├── .env
├── package.json
├── server.js
└── README.md
Installation
Clone Project
git clone <repository-url>

OR

mkdir team-report-system
cd team-report-system
Initialize Node Project
npm init -y
Install Dependencies
npm install express pg cors dotenv multer multer-s3 aws-sdk
Environment Variables

Create a .env file in the root folder.

DB_HOST=your-rds-endpoint
DB_USER=postgres
DB_PASSWORD=your-password
DB_NAME=postgres
DB_PORT=5432

PORT=3000

YOUR_ACCESS_KEY=your-access-key
YOUR_SECRET_KEY=your-secret-key
AWS Setup
Create S3 Bucket

Go to AWS Console → S3

Create bucket:

team-report-storage1
Create IAM User

Go to:

IAM → Users

Create a user with:

AmazonS3FullAccess

Generate access key and secret key.

Store them in .env.

Create PostgreSQL RDS Database

Go to:

RDS → Create Database

Choose:

PostgreSQL
Free Tier

Set:

DB Identifier: teamreportdb
Master Username: postgres
Password: your-password
Enable Public Access

Go to:

RDS → teamreportdb → Modify

Enable:

Publicly Accessible = Yes

Apply changes immediately.

Configure Security Group

Go to:

EC2 → Security Groups

Edit inbound rules.

Add:

Type	Port	Source
PostgreSQL	5432	0.0.0.0/0

Save rules.

PostgreSQL Tables
Employees Table
CREATE TABLE employees(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);
Teams Table
CREATE TABLE teams(
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(100)
);
Employee-Team Mapping Table
CREATE TABLE employee_teams(
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(id),
    team_id INT REFERENCES teams(id)
);
Reports Table
CREATE TABLE reports(
    id SERIAL PRIMARY KEY,
    team_id INT,
    uploaded_by INT,
    file_name TEXT,
    s3_key TEXT,
    status VARCHAR(50),
    uploaded_at TIMESTAMP
);
Run Project
node server.js

Expected output:

Server running on port 3000
API Endpoints
Add Employee
POST
http://localhost:3000/employees
Body
{
  "name":"Sachin",
  "email":"sachin@gmail.com"
}
Get Employees
GET
http://localhost:3000/employees
Add Team
POST
http://localhost:3000/teams
Body
{
  "team_name":"AI Team"
}
Upload Report
POST
http://localhost:3000/upload-report
Body → form-data
Key	Type	Value
file	File	Upload File
team_id	Text	1
uploaded_by	Text	1
Common Errors
ETIMEDOUT
Cause

RDS database is not publicly accessible.

Solution
Enable Public Access in RDS
Open port 5432 in Security Group
MODULE_NOT_FOUND
Solution
npm install
MulterError: Field name missing
Cause

Empty row in Postman form-data.

Solution

Remove empty form-data row.

Future Enhancements
JWT Authentication
Admin Dashboard
Approval Workflow
React Frontend
Docker Deployment
EC2 Deployment


Author
Sakshi Kumari
