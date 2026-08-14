import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackend as useAdmin } from '../../hooks/useBackend';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import '../../admin.css';

const AdminOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const { verifyOtp } = useAdmin();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    setIsLoading(true);
    const success = await verifyOtp(otpString);
    setIsLoading(false);
    if (success) {
      navigate('/page/admin');
    } else {
      setError('Invalid OTP or OTP expired.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <div className="admin-root admin-auth-bg">
      <div className="admin-auth-blob admin-auth-blob-1" />
      <div className="admin-auth-blob admin-auth-blob-2" />

      <div className="admin-auth-card a-fade-up">
        <div className="admin-auth-icon green">
          <ShieldCheck size={26} strokeWidth={2.25} />
        </div>

        <h1 className="admin-auth-title">Verify Identity</h1>
        <p className="admin-auth-subtitle">
          Enter the 6-digit code sent to your email.
        </p>

        {error && (
          <div className="admin-auth-error">
            <AlertCircle size={15} style={{ flexShrink: 0 }} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="admin-otp-grid">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                pattern="[0-9]"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`admin-otp-box${digit ? ' filled' : ''}`}
              />
            ))}
          </div>

          <button type="submit" className="admin-auth-btn" disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify & Login'}
          </button>
        </form>

        <div className="admin-auth-footer">
          <ShieldCheck size={13} style={{ color: '#cbd5e1' }} />
          Your session is protected with two-step verification
        </div>
      </div>
    </div>
  );
};

export default AdminOtp;
