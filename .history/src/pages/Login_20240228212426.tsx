



import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC<{
  phoneNumber: string;
  password: string;
  onLogin: () => void;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}> = ({ phoneNumber, password, onLogin, setPhoneNumber, setPassword }) => {
  const handleLoginSubmit = async () => {
    try {
      // Send a request to the server to check phone number and password
      const loginResponse = await axios.post(
        'https://sheba-app.onrender.com/api/users/login',
        {
          phone: phoneNumber,
          password,
        }
      );

      if (loginResponse.status === 200) {
        // Server accepts login, trigger the onLogin callback
        onLogin();
      } else {
        // Handle login error
        console.error('Error during login:', loginResponse);
      }
    } catch (error) {
      // Handle login error
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div className="mb-4 block">
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="p-2 w-full border rounded-l"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 w-full border rounded-r"
        />
      </div>
      <button
        onClick={handleLoginSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
};

const Verify: React.FC<{
  phoneNumber: string;
  otp: string;
  onVerify: () => void;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
}> = ({ phoneNumber, otp, onVerify, setOtp }) => {
  const handleVerifySubmit = async () => {
    try {
      // Send a request to the server to verify the OTP
      const verifyResponse = await axios.post(
        'https://sheba-app.onrender.com/api/users/login-verify',
        {
          phone: phoneNumber,
          code: otp,
        }
      );

      if (verifyResponse.status === 200) {
        // Assuming successful verification, trigger the onVerify callback
        onVerify();
      } else {
        // Handle verification error
        console.error('Verification failed:', verifyResponse);
      }
    } catch (error) {
      // Handle verification error
      console.error('Error during verification:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
      <p className="mb-4">An OTP has been sent to your phone.</p>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="p-2 mb-4 w-full border rounded"
      />
      <button
        onClick={handleVerifySubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Verify
      </button>
    </div>
  );
};

const LoginPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('+251');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleLogin = () => {
    // Set some state or perform actions upon successful login
    setIsVerified(true);
  };

  const handleVerify = () => {
    // Set some state or perform actions upon successful verification
    // For example, redirect to another page
    console.log('Redirecting after successful verification');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        {!isVerified ? (
          <Login
            phoneNumber={phoneNumber}
            password={password}
            onLogin={handleLogin}
            setPhoneNumber={setPhoneNumber}
            setPassword={setPassword}
          />
        ) : (
          <Verify phoneNumber={phoneNumber} otp={otp} onVerify={handleVerify} setOtp={setOtp} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;












