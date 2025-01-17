import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpenseManager from './components/ExpenseManager';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{
          zIndex: 9999,
        }}
        toastStyle={{
          backgroundColor: '#333', // Dark background
          color: '#fff', // White text
          borderRadius: '8px', // Rounded corners
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // Subtle shadow
        }}
        progressStyle={{
          background: 'linear-gradient(to right, #4cd964, #5ac8fa)', // Gradient progress bar
        }}
      />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/add-expenses' element={<ExpenseManager />} />
      </Routes>
    </div>
  );
};

export default App;