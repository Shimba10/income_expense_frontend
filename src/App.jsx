import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import IncomeList from './components/IncomeList';
import ExpenseList from './components/ExpenseList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/incomes" element={<IncomeList />} />
        <Route path="/expenses" element={<ExpenseList />} />
      </Routes>
    </Router>
  );
}

export default App;
