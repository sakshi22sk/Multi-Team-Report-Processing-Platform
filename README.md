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
