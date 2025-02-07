// // src/components/auth/ResetPassword.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ResetPassword = () => {
//   const { token } = useParams();
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // You could add a token validation check if needed
//   }, [token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');
    
//     if (newPassword !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
    
//     try {
//       const response = await axios.post('http://localhost:8080/api/auth/reset-password', {
//         token,
//         newPassword,
//       });
//       setMessage(response.data.message);
//     } catch (err) {
//       setError('An error occurred while resetting the password');
//     }
//   };

//   return (
//     <div className="reset-password-container">
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>New Password:</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Confirm Password:</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Reset Password</button>
//       </form>
//       {message && <div className="message">{message}</div>}
//       {error && <div className="error">{error}</div>}
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const email = location.state?.email || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Invalid request. Email is missing.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/reset-password', {
        email,
        newPassword,
      });
      setMessage(response.data.message || 'Password reset successfully.');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after success
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset successfully');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <div className="message">{message}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ResetPassword;
