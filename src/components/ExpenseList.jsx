import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllExpenses, createExpense, updateExpense, deleteExpense } from '../services/api';
import '../assets/styles.css'; // Import external CSS file for styling

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({ amount: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    getAllExpenses()
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
      });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateExpense(editingId, formData)
        .then(() => {
          setIsEditing(false);
          setEditingId(null);
          setFormData({ amount: '', description: '' });
          fetchExpenses();
        })
        .catch(error => {
          console.error('Error updating expense:', error);
        });
    } else {
      createExpense(formData)
        .then(() => {
          setFormData({ amount: '', description: '' });
          fetchExpenses();
        })
        .catch(error => {
          console.error('Error creating expense:', error);
        });
    }
  };

  const handleEdit = (expense) => {
    setIsEditing(true);
    setEditingId(expense.id);
    setFormData({ amount: expense.amount, description: expense.description });
  };

  const handleDelete = (expenseId) => {
    deleteExpense(expenseId)
      .then(() => {
        fetchExpenses();
      })
      .catch(error => {
        console.error('Error deleting expense:', error);
      });
  };

  return (
    <div className="expense-list-container">
      <h2 className="expense-list-title">Expense List</h2>
      <nav className="expense-list-links">
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/incomes">Income List</Link></li>
        </ul>
      </nav>
      <form onSubmit={handleSubmit} className="expense-list-form">
        <label>
          Amount:
          <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
        </label>
        <button type="submit" className="expense-list-button">{isEditing ? 'Update Expense' : 'Add Expense'}</button>
      </form>
      <ul className="expense-list-data">
        {expenses.map(expense => (
          <li key={expense.id}>
            Amount: {expense.amount}, Description: {expense.description}, Date: {expense.date}
            <button onClick={() => handleEdit(expense)}>Edit</button>
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
