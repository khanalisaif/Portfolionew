import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackend } from '../../hooks/useBackend';
import { LogIn, Mail, ShieldCheck, AlertCircle } from 'lucide-react';
import '../../admin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useBackend();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const result = await login(email);
    setIsLoading(false);
    if (result.success) {
      navigate('/page/admin/otp');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="admin-root admin-auth-bg">
      <div className="admin-auth-blob admin-auth-blob-1" />
      <div className="admin-auth-blob admin-auth-blob-2" />
      <div className="admin-auth-blob admin-auth-blob-3" />

      <div className="admin-auth-card a-fade-up">
        <div className="admin-auth-icon indigo">
          <LogIn size={26} strokeWidth={2.25} />
        </div>

        <h1 className="admin-auth-title">Welcome Back</h1>
        <p className="admin-auth-subtitle">Enter your admin email to receive an OTP</p>

        {error && (
          <div className="admin-auth-error">
            <AlertCircle size={15} style={{ flexShrink: 0 }} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label className="a-label" style={{ marginBottom: 8, display: 'block' }}>Email Address</label>
            <div className="admin-input-group">
              <span className="admin-input-icon">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-auth-input"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <button type="submit" className="admin-auth-btn" disabled={isLoading}>
            {isLoading ? 'Sending OTP...' : 'Continue →'}
          </button>
        </form>

        <div className="admin-auth-footer">
          <ShieldCheck size={13} style={{ color: '#cbd5e1' }} />
          Secure admin access · verified by one-time code
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
