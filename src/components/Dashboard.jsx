import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/styles.css'; // Import external CSS file for styling

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    axios.get('http://localhost:8000/dashboard/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setDashboardData(response.data);
    })
    .catch(error => {
      console.error('Error fetching dashboard data:', error);
    });
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-links">
        <p>
          <Link to="/expenses">Expenses</Link>
          {' | '}
          <Link to="/incomes">Incomes</Link>
        </p>
      </div>
      {dashboardData && (
        <div className="dashboard-data">
          <p>Total Income: {dashboardData.total_income}</p>
          <p>Total Expenses: {dashboardData.total_expenses}</p>
          <p>Income - Expenses: {dashboardData.income_minus_expenses}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
