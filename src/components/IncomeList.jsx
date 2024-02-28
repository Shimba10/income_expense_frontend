import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllIncomes, createIncome, updateIncome, deleteIncome } from '../services/api';
import '../assets/styles.css'; // Import external CSS file for styling

const IncomeList = () => {
  const [incomes, setIncomes] = useState([]);
  const [formData, setFormData] = useState({ amount: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = () => {
    getAllIncomes()
      .then(response => {
        setIncomes(response.data);
      })
      .catch(error => {
        console.error('Error fetching incomes:', error);
      });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateIncome(editingId, formData)
        .then(() => {
          setIsEditing(false);
          setEditingId(null);
          setFormData({ amount: '', description: '' });
          fetchIncomes();
        })
        .catch(error => {
          console.error('Error updating income:', error);
        });
    } else {
      createIncome(formData)
        .then(() => {
          setFormData({ amount: '', description: '' });
          fetchIncomes();
        })
        .catch(error => {
          console.error('Error creating income:', error);
        });
    }
  };

  const handleEdit = (income) => {
    setIsEditing(true);
    setEditingId(income.id);
    setFormData({ amount: income.amount, description: income.description });
  };

  const handleDelete = (incomeId) => {
    deleteIncome(incomeId)
      .then(() => {
        fetchIncomes();
      })
      .catch(error => {
        console.error('Error deleting income:', error);
      });
  };

  return (
    <div className="income-list-container">
      <h2 className="income-list-title">Income List</h2>
      <nav className="income-list-nav">
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/expenses">Expense List</Link></li>
        </ul>
      </nav>
      <form onSubmit={handleSubmit} className="income-list-form">
        <label>
          Amount:
          <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
        </label>
        <button type="submit">{isEditing ? 'Update Income' : 'Add Income'}</button>
      </form>
      <ul className="income-list">
        {incomes.map(income => (
          <li key={income.id}>
            Amount: {income.amount}, Description: {income.description}, Date: {income.date}
            <button onClick={() => handleEdit(income)}>Edit</button>
            <button onClick={() => handleDelete(income.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IncomeList;
