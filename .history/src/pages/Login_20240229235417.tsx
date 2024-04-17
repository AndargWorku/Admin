import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const Verify: React.FC<{
  phoneNumber: string;
  otp: string;
  onVerify: () => void;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
}> = ({ phoneNumber, otp, onVerify, setPhoneNumber, setOtp }) => {
  const history = useHistory();

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
        history.push('/success');
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
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="p-2 mb-4 w-full border rounded"
      />
      
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6} // Set maximum length to 6 digits
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

export default Verify;
