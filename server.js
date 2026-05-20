const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.YOUR_ACCESS_KEY,
  secretAccessKey: process.env.YOUR_SECRET_KEY,
  region: 'ap-south-1'
});

const app = express();

app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'team-report-storage1',
    acl: 'private',
    key: function (req, file, cb) {

      cb(null, `team-1/pending/${Date.now()}-${file.originalname}`);
    }
  })
});

app.get('/', (req, res) => {
  res.send('API Running');
});

app.post('/employees', async (req, res) => {

  try {

    const { name, email } = req.body;

    await pool.query(
      'INSERT INTO employees(name,email) VALUES($1,$2)',
      [name, email]
    );

    res.send('Employee Added');

  } catch (error) {

    console.log(error);
    res.status(500).send('Error adding employee');
  }
});

app.get('/employees', async (req, res) => {

  try {

    const result = await pool.query(
      'SELECT * FROM employees'
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);
    res.status(500).send('Error fetching employees');
  }
});

app.post('/teams', async (req, res) => {

  try {

    const { team_name } = req.body;

    await pool.query(
      'INSERT INTO teams(team_name) VALUES($1)',
      [team_name]
    );

    res.send('Team Added');

  } catch (error) {

    console.log(error);
    res.status(500).send('Error adding team');
  }
});

app.get('/teams', async (req, res) => {

  try {

    const result = await pool.query(
      'SELECT * FROM teams'
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);
    res.status(500).send('Error fetching teams');
  }
});

app.post('/teams/:teamId/employees/:employeeId', async (req, res) => {

  try {

    const { teamId, employeeId } = req.params;

    await pool.query(
      'INSERT INTO employee_teams(employee_id, team_id) VALUES($1,$2)',
      [employeeId, teamId]
    );

    res.send('Employee mapped to team');

  } catch (error) {

    console.log(error);
    res.status(500).send('Error mapping employee');
  }
});

app.get('/teams/:teamId/employees', async (req, res) => {

  try {

    const { teamId } = req.params;

    const result = await pool.query(
      `SELECT e.name, t.team_name
       FROM employees e
       JOIN employee_teams et
       ON e.id = et.employee_id
       JOIN teams t
       ON t.id = et.team_id
       WHERE t.id = $1`,
      [teamId]
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);
    res.status(500).send('Error fetching team employees');
  }
});

app.get('/employees/:employeeId/teams', async (req, res) => {

  try {

    const { employeeId } = req.params;

    const result = await pool.query(
      `SELECT t.team_name
       FROM teams t
       JOIN employee_teams et
       ON t.id = et.team_id
       WHERE et.employee_id = $1`,
      [employeeId]
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);
    res.status(500).send('Error fetching employee teams');
  }
});

app.post('/upload-report', upload.single('file'), async (req, res) => {

  try {

    const { team_id, uploaded_by } = req.body;

    const file = req.file;

    await pool.query(
      `INSERT INTO reports
      (team_id, uploaded_by, file_name, s3_key, status, uploaded_at)
      VALUES($1,$2,$3,$4,$5,NOW())`,
      [
        team_id,
        uploaded_by,
        file.originalname,
        file.key,
        'pending'
      ]
    );

    res.json({
      message: 'File uploaded successfully',
      file
    });

  } catch (error) {

    console.log(error);
    res.status(500).send('Error uploading report');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});