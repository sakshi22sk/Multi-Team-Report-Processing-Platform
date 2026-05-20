import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [file, setFile] = useState(null);
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {

    const res = await axios.get(
      'http://localhost:3000/reports'
    );

    setReports(res.data);

  };

  useEffect(() => {

    fetchReports();

  }, []);

  const handleUpload = async () => {

    const formData = new FormData();

    formData.append('file', file);
    formData.append('team_id', 1);
    formData.append('uploaded_by', 1);

    await axios.post(
      'http://localhost:3000/upload-report',
      formData
    );

    alert('Uploaded Successfully');

    fetchReports();

  };

  return (

    <div style={{ padding: '40px' }}>

      <h1>Team Report System</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload
      </button>

      <hr />

      <h2>Reports</h2>

      {

        reports.map((report) => (

          <div key={report.id}>

            <p>{report.file_name}</p>

          </div>

        ))

      }

    </div>

  );

}

export default App;
