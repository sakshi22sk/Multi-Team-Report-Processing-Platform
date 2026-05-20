import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [file, setFile] = useState(null);
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {

    try {

      const res = await axios.get(
        'http://localhost:3000/reports'
      );

      setReports(res.data);

    } catch (err) {

      console.log(err);

      alert('Error fetching reports');

    }

  };

  useEffect(() => {

    fetchReports();

  }, []);

  const handleUpload = async () => {

    if (!file) {

      alert('Please select a file');

      return;

    }

    try {

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

    } catch (err) {

      console.log(err);

      alert('Upload Failed');

    }

  };

  return (

    <div style={styles.page}>

      <div style={styles.overlay}>

        <div style={styles.card}>

          <h1 style={styles.title}>
            Team Report System
          </h1>

          <p style={styles.subtitle}>
            Upload and manage team reports securely
          </p>

          <div style={styles.uploadSection}>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={styles.input}
            />

            <button
              onClick={handleUpload}
              style={styles.button}
            >
              Upload Report
            </button>

          </div>

          <div style={styles.reportsSection}>

            <h2 style={styles.reportTitle}>
              Uploaded Reports
            </h2>

            {

              reports.length === 0 ? (

                <p style={styles.emptyText}>
                  No reports uploaded yet.
                </p>

              ) : (

                reports.map((report) => (

                  <div
                    key={report.id}
                    style={styles.reportCard}
                  >

                    <div>

                      <h3 style={styles.fileName}>
                        {report.file_name}
                      </h3>

                      <p style={styles.meta}>
                        Status: {report.status}
                      </p>

                      <p style={styles.meta}>
                        Uploaded: {
                          new Date(report.uploaded_at)
                          .toLocaleString()
                        }
                      </p>

                    </div>

                    <div style={styles.statusBadge}>
                      ACTIVE
                    </div>

                  </div>

                ))

              )

            }

          </div>

        </div>

      </div>

    </div>

  );

}

const styles = {

  page: {
    minHeight: '100vh',
    background:
      'linear-gradient(135deg, #0f172a, #1e293b, #111827)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    fontFamily: 'Arial'
  },

  overlay: {
    width: '100%',
    maxWidth: '1000px'
  },

  card: {
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(12px)',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    border: '1px solid rgba(255,255,255,0.1)'
  },

  title: {
    color: 'white',
    fontSize: '42px',
    marginBottom: '10px',
    fontWeight: 'bold'
  },

  subtitle: {
    color: '#cbd5e1',
    marginBottom: '40px',
    fontSize: '18px'
  },

  uploadSection: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    marginBottom: '40px',
    flexWrap: 'wrap'
  },

  input: {
    color: 'white',
    background: '#1e293b',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #334155'
  },

  button: {
    background:
      'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: 'white',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: '0.3s'
  },

  reportsSection: {
    marginTop: '20px'
  },

  reportTitle: {
    color: 'white',
    marginBottom: '20px',
    fontSize: '28px'
  },

  reportCard: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '18px',
    padding: '20px',
    marginBottom: '18px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
  },

  fileName: {
    color: 'white',
    marginBottom: '8px'
  },

  meta: {
    color: '#cbd5e1',
    margin: '4px 0'
  },

  statusBadge: {
    background: '#22c55e',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 'bold'
  },

  emptyText: {
    color: '#94a3b8'
  }

};

export default App;
