// // src/components/auth/ForgotPassword.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');
    
//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/forgot-password', { email });
//       setMessage(response.data.message);
//     } catch (err) {
//       setError('An error occurred while sending the reset email');
//     }
//   };

//   return (
//     <div className="forgot-password-container">
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Send Reset Link</button>
//       </form>
//       {message && <div className="message">{message}</div>}
//       {error && <div className="error">{error}</div>}
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email.');
      return;
    }

    // Navigate to the Reset Password page and pass the email as state
    navigate('/reset-password', { state: { email } });
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ForgotPassword;


