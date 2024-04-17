import React, { useState, useEffect } from 'react';
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
        className="bg-indigo-950 text-white py-2 px-4 rounded-md hover:m-2 w-full"
      >
        Submit
      </button>
    </div>
  );
};

const Verify: React.FC<{
  phoneNumber: string;
  otp: string[];
  onVerify: () => void;
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}> = ({ phoneNumber, otp, onVerify, setOtp, setPhoneNumber }) => {
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(120); // 2 minutes

  const handleVerifySubmit = async () => {
    try {
      // Send a request to the server to verify the OTP
      const verifyResponse = await axios.post(
        'https://sheba-app.onrender.com/api/users/login-verify',
        {
          phone: phoneNumber,
          code: otp.join(''),
        }
      );

      if (verifyResponse.status === 200) {
        // Assuming successful verification, trigger the onVerify callback
        onVerify();
        setVerificationSuccess(true); // Set verification success state to true
      } else {
        // Handle verification error
        console.error('Verification failed:', verifyResponse);
      }
    } catch (error) {
      // Handle verification error
      console.error('Error during verification:', error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Redirect to /permission if verification is successful or timeout
    const redirectTimeout = setTimeout(() => {
      if (!verificationSuccess) {
        window.location.href = '/timeout'; // Redirect to a timeout page or handle as needed
      }
    }, secondsRemaining * 1000);

    // Cleanup timers on component unmount
    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimeout);
    };
  }, [verificationSuccess, secondsRemaining]);

  useEffect(() => {
    // Reset the timer when the user starts filling in the OTP
    if (otp.some((digit) => digit !== '')) {
      setSecondsRemaining(120); // Reset the timer to 2 minutes
    }
  }, [otp]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
      <p className="mb-4">An OTP has been sent to your phone. Time remaining: {Math.floor(secondsRemaining / 60)}:{(secondsRemaining % 60).toString().padStart(2, '0')}</p>
      
      <div className="flex mb-4">
        {/* Six small input fields for OTP entry */}
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={otp[index] || ''}
            onChange={(e) => {
              const newOtp = [...otp];
              newOtp[index] = e.target.value;
              setOtp(newOtp);
            }}
            className="p-2 mr-2 w-10 text-center border rounded"
          />
        ))}
      </div>
      
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="p-2 mb-4 w-full border rounded"
      />
      
      <button
        onClick={handleVerifySubmit}
        className="bg-indigo-950 text-white py-2 px-4 rounded-md hover:m-2 w-full"
      >
        Verify
      </button>
    </div>
  );
};

const LoginPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('+251');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);

  const handleLogin = () => {
    // Set some state or perform actions upon successful login
    setIsVerified(true);
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
          <Verify
            phoneNumber={phoneNumber}
            otp={otp}
            onVerify={() => {}}
            setOtp={setOtp}
            setPhoneNumber={setPhoneNumber}
          />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
