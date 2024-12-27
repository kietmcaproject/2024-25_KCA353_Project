import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Select, Button, Card, Divider, Alert } from 'antd';
import { useParams } from 'react-router-dom';
import './HodReportPage.css';

const { Option } = Select;
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HodReportPage = () => {
  const { id: hodId } = useParams();
  const [summary, setSummary] = useState({
    totalPending: 0,
    totalAccepted: 0,
    totalRejected: 0,
  });
  const [mostAbsentStudent, setMostAbsentStudent] = useState(null); // State for most absent student
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSummary();
    fetchMostAbsentStudent();
  }, [selectedMonth, selectedYear]);

  const fetchSummary = async () => {
    setError('');
    try {
      const response = await axios.get(`http://localhost:5000/api/reports/summary/${hodId}`, {
        params: { month: selectedMonth, year: selectedYear },
      });
      setSummary({
        totalPending: response.data.pending || 0,
        totalAccepted: response.data.approved || 0,
        totalRejected: response.data.rejected || 0,
      });
    } catch (error) {
      console.error('Error fetching summary report:', error);
      setError('Failed to fetch summary report. Please try again later.');
    }
  };

  const fetchMostAbsentStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reports/most-absent/${hodId}`, {
        params: { month: selectedMonth, year: selectedYear },
      });
      setMostAbsentStudent(response.data);
    } catch (error) {
      console.error('Error fetching most absent student report:', error);
      setMostAbsentStudent(null);
    }
  };

  const handleGenerateReport = () => {
    fetchSummary();
    fetchMostAbsentStudent();
  };

  const getYearsList = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => currentYear + 1 - i);
  };

  return (
    <div className="hod-report-page">
      <header className="welcome-header">
        <h1>Welcome!</h1>
        <h2 className="page-title">Leave Report Dashboard</h2>
      </header>

      <div className="filters">
        <Select
          defaultValue={selectedMonth}
          onChange={(value) => setSelectedMonth(value)}
          style={{ width: 120, marginRight: '10px' }}
        >
          {[...Array(12)].map((_, i) => (
            <Option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </Option>
          ))}
        </Select>

        <Select
          defaultValue={selectedYear}
          onChange={(value) => setSelectedYear(value)}
          style={{ width: 120 }}
        >
          {getYearsList().map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>

        {/* <Button type="primary" onClick={handleGenerateReport}>
          Generate Report
        </Button> */}
      </div>

      <Divider />
      <Card title="Monthly Summary" style={{ marginBottom: '20px' }}>
        <p className = "para">Total Pending: {summary.totalPending}</p>
        <p className = "para">Total Accepted: {summary.totalAccepted}</p>
        <p className = "para">Total Rejected: {summary.totalRejected}</p>
      </Card>
      <Divider />

      {error && <Alert type="error" message={error} showIcon style={{ marginBottom: '20px' }} />}

      <div className="card-container">
        {/* Summary Graph */}
        <Card title="Monthly Leave Applications Summary" className="chart-card">
          <div className="chart-container">
          <Bar
  data={{
    labels: ['Pending', 'Accepted', 'Rejected'], // X-axis labels
    datasets: [
      {
        label: 'Pending',
        data: [summary.totalPending, 0, 0], // Only Pending data
        backgroundColor: 'rgba(255, 206, 86, 0.6)', // Yellow
      },
      {
        label: 'Accepted',
        data: [0, summary.totalAccepted, 0], // Only Accepted data
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Teal
      },
      {
        label: 'Rejected',
        data: [0, 0, summary.totalRejected], // Only Rejected data
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red
      },
    ],
  }}
  options={{
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top', // Legend on top
      },
      title: {
        display: true,
        text: 'Monthly Leave Applications Summary',
      },
    },
  }}
/>

          </div>
        </Card>
<Divider/>
        {/* Most Absent Student Graph */}
        <Card title="Most Absent Student in Selected Month" className="chart-card right">
          {mostAbsentStudent ? (
            <div className="chart-container">
              <Bar
                data={{
                  labels: [mostAbsentStudent.studentName],
                  datasets: [
                    {
                      label: 'Days Absent',
                      data: [mostAbsentStudent.totalAbsentDays],
                      backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Most Absent Student This Month',
                    },
                  },
                }}
              />
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#9656a2' }}>No data available for the selected period.</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default HodReportPage;
