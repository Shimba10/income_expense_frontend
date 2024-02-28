// services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
  });
api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  export const login = async (formData) => {
    try {
        const response = await axios.post('http://localhost:8000/api/', formData);
        const { access } = response.data; // Assuming the token key is named 'access'
        localStorage.setItem('token', access); // Store the token in localStorage
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (formData) => {
    try {
        const response = await axios.post('http://localhost:8000/api/register/', formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getAllIncomes = () => {
    return axios.get('http://localhost:8000/api/incomes/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Include JWT token in the request
        }
      })
      
    
};

export const createIncome = (incomeData) => {
  return api.post(`incomes/`, incomeData);
};

export const updateIncome = (incomeId, incomeData) => {
  return api.put(`incomes/${incomeId}/`, incomeData);
};

export const deleteIncome = (incomeId) => {
  return api.delete(`incomes/${incomeId}/`);
};

export const getAllExpenses = () => {
   return axios.get('http://localhost:8000/api/expenses/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Include JWT token in the request
        }
      })
      
};

export const createExpense = (expenseData) => {
  return api.post(`expenses/`, expenseData);
};

export const updateExpense = (expenseId, expenseData) => {
  return api.put(`expenses/${expenseId}/`, expenseData);
};

export const deleteExpense = (expenseId) => {
  return api.delete(`expenses/${expenseId}/`);
};
